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
coverImage: "https://enricodeleo.s3.eu-south-1.amazonaws.com/images/nanopi-r76s-performance.jpg"
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

La seconda e definitiva ottimizzazione ha incluso:

- Mappatura manuale degli **IRQ** (`eth0`, `eth1`) su core differenti
- Attivazione del **CPU governor “performance”**:
  ```bash
  for c in /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor; do
      echo performance > $c
  done
  ```

* Pulizia e consolidamento di tutti gli script hotplug in un solo file:

  ```
  /etc/hotplug.d/net/99-optimize-network
  ```

* Applicazione permanente di:

  ```bash
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
* CPU governor “performance”

Con pochi accorgimenti, questo piccolo router passa da **midrange** a **full 2.5 Gbps router**.

### TL;DR

Per chi vuole replicare rapidamente:

```bash
# /etc/sysctl.d/60-rps.conf
net.core.rps_sock_flow_entries = 65536

# /etc/hotplug.d/net/99-optimize-network
#!/bin/sh
[ "$ACTION" = "add" ] || exit
MASK_HEX=ff
sysctl -w net.core.rps_sock_flow_entries=65536
for IF in eth0 eth1; do
  for Q in /sys/class/net/$IF/queues/rx-*; do
    echo $MASK_HEX > "$Q/rps_cpus"
    echo 32768    > "$Q/rps_flow_cnt"
  done
  for Q in /sys/class/net/$IF/queues/tx-*; do
    echo $MASK_HEX > "$Q/xps_cpus"
  done
done
logger -t rpsxps "RPS/XPS optimization applied to $IF"
```

Rendi lo script eseguibile:

```bash
chmod +x /etc/hotplug.d/net/99-optimize-network
```

E al reboot, il tuo NanoPi R76S non sarà più lo stesso!
