import { useState, useEffect } from 'react'

export default function ProgressBar({ containerRef }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onScroll = () => {
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0)
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [containerRef])

  return (
    <div className="fixed top-0 left-0 right-0 z-20 h-1 bg-gray-800">
      <div
        className="h-full bg-green-400"
        style={{ width: `${progress}%`, transition: 'none' }}
      />
      <span className="absolute right-2 top-1 text-xs text-white/50 leading-none">
        {Math.round(progress)}%
      </span>
    </div>
  )
}
