import { useEffect, useRef } from 'react'
import useStore from '../store/useStore'

export function useScroll(containerRef) {
  const isPlaying = useStore((state) => state.isPlaying)
  const scrollSpeed = useStore((state) => state.settings.scrollSpeed)
  const flipV = useStore((state) => state.settings.flipV)
  const setPlaying = useStore((state) => state.setPlaying)

  const speedRef = useRef(scrollSpeed)
  const flipVRef = useRef(flipV)
  const wasPlayingRef = useRef(false)
  const isPlayingRef = useRef(isPlaying)

  useEffect(() => {
    speedRef.current = scrollSpeed
  }, [scrollSpeed])

  useEffect(() => {
    flipVRef.current = flipV
  }, [flipV])

  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  // flipV 변경 시 스크롤 위치 리셋: 뒤집힌 상태에서 텍스트 처음이 보이도록
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    if (flipV) {
      el.scrollTop = el.scrollHeight - el.clientHeight
    } else {
      el.scrollTop = 0
    }
  }, [flipV, containerRef])

  useEffect(() => {
    if (!isPlaying) return

    const el = containerRef.current
    if (!el) return

    let rafId = null
    let lastTime = null
    let accumulated = 0 // 소수점 픽셀 누산 — Android scrollTop 정수 내림 문제 해결

    const tick = (timestamp) => {
      if (lastTime === null) {
        lastTime = timestamp
        rafId = requestAnimationFrame(tick)
        return
      }
      const delta = timestamp - lastTime
      lastTime = timestamp

      accumulated += (speedRef.current * 12 * delta) / 1000
      const pixels = Math.floor(accumulated)
      if (pixels > 0) {
        // flipV 시 역방향 스크롤 (시각적으로 위→아래 방향 유지)
        el.scrollTop += flipVRef.current ? -pixels : pixels
        accumulated -= pixels
      }

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
