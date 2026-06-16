import { useEffect, useRef, useCallback } from 'react'
import useStore from '../store/useStore'

export function useScroll(containerRef) {
  const isPlaying = useStore((state) => state.isPlaying)
  const scrollSpeed = useStore((state) => state.settings.scrollSpeed)
  const setPlaying = useStore((state) => state.setPlaying)

  const rafRef = useRef(null)
  const lastTimeRef = useRef(null)
  const speedRef = useRef(scrollSpeed)
  const wasPlayingRef = useRef(false)

  useEffect(() => {
    speedRef.current = scrollSpeed
  }, [scrollSpeed])

  const tick = useCallback(
    (timestamp) => {
      if (!containerRef.current) return
      if (!lastTimeRef.current) lastTimeRef.current = timestamp

      const delta = timestamp - lastTimeRef.current
      lastTimeRef.current = timestamp

      const pixelsPerSecond = speedRef.current * 8
      containerRef.current.scrollTop += (pixelsPerSecond * delta) / 1000

      rafRef.current = requestAnimationFrame(tick)
    },
    [containerRef],
  )

  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = null
      rafRef.current = requestAnimationFrame(tick)
    } else {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isPlaying, tick])

  const handleTouchStart = useCallback(() => {
    wasPlayingRef.current = isPlaying
    if (isPlaying) setPlaying(false)
  }, [isPlaying, setPlaying])

  const handleTouchEnd = useCallback(() => {
    if (wasPlayingRef.current) setPlaying(true)
  }, [setPlaying])

  return { handleTouchStart, handleTouchEnd }
}
