import { useEffect, useRef } from 'react'

export function useWakeLock() {
  const lockRef = useRef(null)

  useEffect(() => {
    const acquire = async () => {
      try {
        if ('wakeLock' in navigator) {
          lockRef.current = await navigator.wakeLock.request('screen')
        }
      } catch {
        // graceful degradation — unsupported or permission denied
      }
    }

    acquire()

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') acquire()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
      lockRef.current?.release().catch(() => {})
    }
  }, [])
}
