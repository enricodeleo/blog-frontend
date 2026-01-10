// ~/composables/useConsentCookie.ts

type ConsentPrefs = {
  resolved: boolean
  analytics: boolean
}

const COOKIE_NAME = 'cookie-consent'
const DEFAULT: ConsentPrefs = { resolved: false, analytics: false }

function encode(p: ConsentPrefs): string {
  return `r${p.resolved ? 1 : 0}a${p.analytics ? 1 : 0}`
}

function decode(v: string | null | undefined): ConsentPrefs {
  if (!v) return { ...DEFAULT }
  const m = /^r([01])a([01])$/.exec(v)
  if (!m) return { ...DEFAULT }
  return { resolved: m[1] === '1', analytics: m[2] === '1' }
}

export function useConsentCookie() {
  // Cookie tecnico compatto
  const raw = useCookie<string>(COOKIE_NAME, {
    default: () => encode(DEFAULT),
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 180, // 180 giorni
  })

  const prefs = computed<ConsentPrefs>(() => decode(raw.value))

  const setPrefs = (next: ConsentPrefs) => {
    raw.value = encode(next)
  }

  const acceptAll = () => setPrefs({ resolved: true, analytics: true })
  const rejectAll = () => setPrefs({ resolved: true, analytics: false })
  const save = (analytics: boolean) => setPrefs({ resolved: true, analytics })
  const revoke = () => setPrefs({ ...DEFAULT })

  return { raw, prefs, acceptAll, rejectAll, save, revoke }
}
