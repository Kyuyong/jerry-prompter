import { useEffect, useRef } from 'react'
import useStore from '../store/useStore'

export function useScroll(containerRef) {
  const isPlaying = useStore((state) => state.isPlaying)
  const scrollSpeed = useStore((state) => state.settings.scrollSpeed)
  const setPlaying = useStore((state) => state.setPlaying)

  const speedRef = useRef(scrollSpeed)
  const wasPlayingRef = useRef(false)
  const isPlayingRef = useRef(isPlaying)

  useEffect(() => {
    speedRef.current = scrollSpeed
  }, [scrollSpeed])

  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  useEffect(() => {
    if (!isPlaying) return

    const el = containerRef.current
    if (!el) return

    let rafId = null
    let lastTime = null

    // tick은 effect 내부에 정의 — self-reference 클로저 문제 없음
    const tick = (timestamp) => {
      if (lastTime === null) {
        lastTime = timestamp
        rafId = requestAnimationFrame(tick)
        return
      }
      const delta = timestamp - lastTime
      lastTime = timestamp
      el.scrollTop += (speedRef.current * 12 * delta) / 1000
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [isPlaying, containerRef])

  const handleTouchStart = () => {
    wasPlayingRef.current = isPlayingRef.current
    if (isPlayingRef.current) setPlaying(false)
  }

  const handleTouchEnd = () => {
    if (wasPlayingRef.current) setPlaying(true)
  }

  return { handleTouchStart, handleTouchEnd }
}
