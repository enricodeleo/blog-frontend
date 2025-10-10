---
title: "Ottimizzare le prestazioni del router NanoPi R76S con OpenWrt: da 600 Mbps a oltre 2 Gbps"
date: "2025-10-05T09:00:00.000Z"
categories:
  - "networking"
  - "devops"
  - "hardware"
tags:
  - "openwrt"
  - "nanopi"
  - "router"
  - "linux"
  - "performance"
  - "tuning"
description: "Come ho ottimizzato il NanoPi R76S con OpenWrt per passare da 600 Mbps a oltre 2 Gbps reali, sistemando IRQ, RPS/XPS e CPU governor per sfruttare al massimo il SoC Rockchip RK3576."
coverImage: "https://enricodeleo.s3.eu-south-1.amazonaws.com/images/nanopi-r76s-performance.png"
sticky: false
---

Questa settimana ho sostituito il mio amatissimo **EdgeRouter X SFP** (un router a mio avviso ottimo per qualità/prezzo ma purtroppo limitato a 1gbps) 
con un **NanoPi R76S**, un piccolo router ARMv8 basato su **Rockchip RK3576**, pubblicizzato con porte **2.5GbE**.  
Sulla carta, doveva essere perfetto ma nella pratica… **non lo era affatto**.

## Perché ho scelto il FriendlyELEC NanoPi R76S

Quando ho deciso di sostituire il mio vecchio EdgeRouter X SFP, cercavo qualcosa di compatto, silenzioso e moderno, ma soprattutto **abbastanza potente da gestire la mia nuova connessione 2.5gbps FTTH** senza sudare troppo.
Dopo un po’ di ricerche mi sono imbattuto nel **FriendlyELEC NanoPi R76S** — un piccolo router con un look quasi da mini NUC, ma costruito attorno a un **SoC Rockchip RK3576** con ben otto core ARM (quattro Cortex-A76 e quattro Cortex-A55) e due porte Ethernet 2.5 GbE basate su chip Realtek RTL8125B.

Oltre alla potenza, mi ha convinto anche la forma fisica: **il case in alluminio anodizzato nero**, le **dimensioni davvero ridotte** e il fatto che si alimenti tramite USB-C.
Nel mio piccolo armadietto server domestico — dove ogni centimetro e ogni alimentatore contano — questo dettaglio ha fatto la differenza.
Finalmente niente più brick da 12 V con spinotto, ma un semplice cavo USB-C come quello di uno smartphone.

A bordo c’è **FriendlyWrt**, la versione personalizzata di **OpenWrt** mantenuta da FriendlyELEC, che di base è già un ottimo punto di partenza.

## La delusione

Dopo l’installazione pulita di **FriendlyWrt 24.10 (OpenWrt 24.10)**, entusiasta di poter finalemnte testare la nuova conenssione multi-gigabit 
ho eseguito i primi test con la CLI di Ookla (speedtest) pregustando già la soddisfazione di vedere schizzare la banda.

**I risultati sono stati deludenti:**

| Test | Download | Upload |
|------|-----------|--------|
| **Before tuning** | 606 Mbps | 771 Mbps |

Ho iniziato a fare dei test più approfonditi, `htop` alla mano, e il collo di bottiglia era evidente: la CPU si saturava su un solo core durante i test, mentre gli altri restavano praticamente inattivi.  
Nonostante il `flow_offloading` fosse attivo nel firewall, **il kernel non stava distribuendo correttamente gli interrupt (IRQ)** delle interfacce di rete sui vari core.

---

## Diagnosi: IRQ, RPS, XPS e CPU governor

Il SoC **RK3576** supporta 8 core, ma senza una corretta gestione delle code e delle interrupt mask, OpenWrt tende ad assegnare tutto a un singolo core (con esattezza lo 0).

Ho quindi individuato tre aree di intervento:

1. **Distribuire gli IRQ** delle interfacce di rete (`eth0`, `eth1`) su più core CPU  
2. **Abilitare e ottimizzare RPS/XPS** (Receive/Transmit Packet Steering)  
3. **Forzare la CPU in modalità “performance”** per evitare scaling aggressivo della frequenza  

## ⚙️ Tuning v1 — RPS/XPS e Sysctl base

La prima iterazione ha incluso:

- Abilitazione di `net.core.rps_sock_flow_entries=65536`
- Configurazione di RPS e XPS su tutti i core (`0xff`)
- Applicazione permanente via `/etc/hotplug.d/net/99-optimize-network`
- Disattivazione di `irqbalance` per gestire manualmente le CPU affinity

### Risultato

| Test | Download | Upload |
|------|-----------|--------|
| **Tuning v1** | 706 Mbps | 928 Mbps |

Il miglioramento è stato tangibile (almeno lato upload), ma non risolutivo.  
La saturazione CPU era distribuita meglio, ma ancora incompleta: i pacchetti non sfruttavano tutti i core disponibili.

---

## 🔥 Tuning finale — IRQ affinity + CPU performance mode

Il tuning finale che porta ai ~2 Gbps stabili il **NanoPi R76S (RK3576)** con **FriendlyWrt/OpenWrt 24.10** richiede l'introduzione di diversi parametri finalizzati prevalentemente a distribuire il carico sui (tanti) core disponibili e distribuire i flussi di rete coerentemente.

### 🧩 1️⃣  Sysctl – Tuning del network stack

📄 **`/etc/sysctl.d/60-rps.conf`**

→ imposta le entry per i flussi RPS (Receive Packet Steering)

```bash
net.core.rps_sock_flow_entries = 65536
```

📄 **`/etc/sysctl.d/99-network-tune.conf`**

→ parametri generali di rete + TCP tuning (coerenti con BBR)

```bash
# Fair Queueing + congestion control
net.core.default_qdisc = fq
net.ipv4.tcp_congestion_control = bbr

# TCP tuning generali
net.ipv4.tcp_fastopen = 3
net.ipv4.tcp_tw_reuse = 2
net.ipv4.ip_local_port_range = 10000 65535
net.ipv4.tcp_fin_timeout = 30

# Gestione traffico burst
net.core.netdev_max_backlog = 250000
```

---

### ⚙️ 2️⃣  Script principale – Applica RPS/XPS manualmente

📄 **`/usr/local/sbin/apply-rpsxps.sh`**

→ comando indipendente che puoi eseguire a mano o al boot
(applica `MASK=ff` su `eth0` e `eth1`, e imposta i flussi globali)

```bash
#!/bin/sh
MASK_HEX=ff
FLOW_ENTRIES=65536
DEVS="eth0 eth1"
logger -t rpsxps "start apply (devs: $DEVS)"

sysctl -q -w net.core.rps_sock_flow_entries="$FLOW_ENTRIES"

for IF in $DEVS; do
  for RX in /sys/class/net/$IF/queues/rx-*; do
    [ -d "$RX" ] || continue
    echo "$MASK_HEX" > "$RX/rps_cpus"
    echo 32768 > "$RX/rps_flow_cnt" 2>/dev/null
  done
  for TX in /sys/class/net/$IF/queues/tx-*; do
    [ -d "$TX" ] || continue
    echo "$MASK_HEX" > "$TX/xps_cpus"
  done
done
logger -t rpsxps "done apply (mask=$MASK_HEX, flows=$FLOW_ENTRIES)"
```

📌  **Permessi:**

```bash
chmod +x /usr/local/sbin/apply-rpsxps.sh
```

---

### 🔁 3️⃣  Hook NET – RPS/XPS automatico su ogni interfaccia

📄 **`/etc/hotplug.d/net/99-optimize-network`**

Si attiva ogni volta che nasce una nuova interfaccia (eth*, VLAN, PPPoE).
Garantisce che anche `eth0.835` e `pppoe-wan` ricevano `rps_cpus=ff`.

```bash
#!/bin/sh
[ "$ACTION" = "add" ] || exit 0
case "$DEVICENAME" in eth*|pppoe-*) : ;; *) exit 0 ;; esac

MASK_HEX=ff
FLOW_ENTRIES=65536
logger -t rpsxps "net hook: $DEVICENAME ACTION=$ACTION (mask=$MASK_HEX flows=$FLOW_ENTRIES)"
sysctl -q -w net.core.rps_sock_flow_entries="$FLOW_ENTRIES"

PARENT="$(basename "$(readlink -f /sys/class/net/$DEVICENAME/lower_* 2>/dev/null || true)")"
[ -n "$PARENT" ] || PARENT="$DEVICENAME"

apply_one() {
  IF="$1"
  for i in 1 2 3 4 5; do
    [ -e "/sys/class/net/$IF/queues/rx-0/rps_cpus" ] && break
    sleep 1
  done
  for RX in /sys/class/net/"$IF"/queues/rx-*; do
    [ -e "$RX/rps_cpus" ] || continue
    echo "$MASK_HEX" > "$RX/rps_cpus"
    echo 32768 > "$RX/rps_flow_cnt" 2>/dev/null
  done
  for TX in /sys/class/net/"$IF"/queues/tx-*; do
    [ -e "$TX/xps_cpus" ] || continue
    echo "$MASK_HEX" > "$TX/xps_cpus"
  done
}

apply_one "$PARENT"
apply_one "$DEVICENAME"
```

📌  **Permessi:**

```bash
chmod +x /etc/hotplug.d/net/99-optimize-network
```

---

### 🪝 4️⃣  Hook IFACE – Fallback su evento `ifup`

📄 **`/etc/hotplug.d/iface/99-rpsxps`**

Serve come “cintura di sicurezza” in caso di ricreazione PPPoE o WAN da script esterni (es. DDNS)

```bash
#!/bin/sh
[ "$ACTION" = "ifup" ] || exit 0

case "$INTERFACE" in
  wan|lan)
    /bin/sh -c "sleep 1; /usr/local/sbin/apply-rpsxps.sh"
    ;;
esac
```

📌  **Permessi:**

```bash
chmod +x /etc/hotplug.d/iface/99-rpsxps
```

---

### 🚀 5️⃣  Esecuzione al boot (failsafe)

📄 **`/etc/rc.local`**

Garantisce che lo script venga lanciato anche all’avvio completo del sistema (dopo init)

```bash
/usr/local/sbin/apply-rpsxps.sh || true
exit 0
```

---

### 🧠 6️⃣  (Opzionale) CPU governor

Se vuoi forzare il governor **conservative** o **performance** all’avvio:

📄 **`/etc/rc.local`** (appendi sotto la riga `apply-rpsxps.sh`)

```bash
for g in /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor; do
    echo conservative > "$g"
done
```

---

### 🧾 7️⃣  Verifica post-boot

Comandi di controllo:

```bash
logread -e rpsxps | tail -n 20
grep . /sys/class/net/eth{0,1}/queues/{rx,tx}-*/rps_cpus
sysctl net.core.rps_sock_flow_entries
```

Output atteso:

```
rpsxps: net hook: eth0.835 ACTION=add ...
rpsxps: net hook: pppoe-wan ACTION=add ...
...
/sys/class/net/eth0.835/queues/rx-0/rps_cpus: ff
/sys/class/net/eth0/queues/tx-0/xps_cpus: ff
/sys/class/net/eth1/queues/tx-0/xps_cpus: ff
net.core.rps_sock_flow_entries = 65536
```

---

## 🚀 Risultati finali

Dopo il reboot e una verifica completa dei parametri, il risultato è stato spettacolare:

| Test              | Download         | Upload           |
| ----------------- | ---------------- | ---------------- |
| **Before**        | 606 Mbps         | 771 Mbps         |
| **Tuning v1**     | 706 Mbps         | 928 Mbps         |
| **Tuning finale** | 🟢 **2162 Mbps** | 🟢 **1038 Mbps** |

## Conclusioni

Il **NanoPi R76S** è un hardware eccezionale, ma per sfruttarlo al massimo serve una configurazione mirata.
Di default, OpenWrt/FriendlyWrt non imposta:

* IRQ affinity efficiente
* RPS/XPS su tutti i core

Con pochi accorgimenti, questo piccolo router passa da **midrange** a **full 2.5 Gbps router**. In barba a cosa si possa pensare dei _soft router_.
