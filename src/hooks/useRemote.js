import { useEffect, useRef } from 'react'
import useStore from '../store/useStore'

export function useRemote(containerRef) {
  const togglePlaying = useStore((state) => state.togglePlaying)
  const updateSettings = useStore((state) => state.updateSettings)
  const scrollSpeed = useStore((state) => state.settings.scrollSpeed)

  const speedRef = useRef(scrollSpeed)
  useEffect(() => {
    speedRef.current = scrollSpeed
  }, [scrollSpeed])

  useEffect(() => {
    const onKeyDown = (e) => {
      const el = containerRef.current
      switch (e.key) {
        case ' ':
        case 'Enter':
          e.preventDefault()
          togglePlaying()
          break
        case 'ArrowUp':
          e.preventDefault()
          updateSettings({ scrollSpeed: Math.min(10, speedRef.current + 1) })
          break
        case 'ArrowDown':
          e.preventDefault()
          updateSettings({ scrollSpeed: Math.max(1, speedRef.current - 1) })
          break
        case 'ArrowLeft':
          e.preventDefault()
          if (el) el.scrollTop -= 100
          break
        case 'ArrowRight':
          e.preventDefault()
          if (el) el.scrollTop += 100
          break
        case 'Home':
          e.preventDefault()
          if (el) el.scrollTop = 0
          break
        case 'End':
          e.preventDefault()
          if (el) el.scrollTop = el.scrollHeight
          break
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [togglePlaying, updateSettings, containerRef])
}
