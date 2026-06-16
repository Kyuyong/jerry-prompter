import { useNavigate } from 'react-router-dom'
import useStore from '../store/useStore'

export default function ControlBar({ onSettingsToggle }) {
  const navigate = useNavigate()
  const isPlaying = useStore((state) => state.isPlaying)
  const togglePlaying = useStore((state) => state.togglePlaying)
  const scrollSpeed = useStore((state) => state.settings.scrollSpeed)
  const updateSettings = useStore((state) => state.updateSettings)

  const changeSpeed = (delta) => {
    const next = Math.round((scrollSpeed + delta) * 10) / 10
    updateSettings({ scrollSpeed: Math.min(10, Math.max(0.5, next)) })
  }

  const displaySpeed = Number.isInteger(scrollSpeed) ? scrollSpeed : scrollSpeed.toFixed(1)

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-between px-4 pt-3 bg-black/80 backdrop-blur-sm"
      style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
    >
      <button
        onClick={() => navigate('/')}
        className="text-white/70 text-sm px-3 py-1.5 rounded-lg border border-white/20 active:bg-white/10"
      >
        ← 편집
      </button>

      <div className="flex items-center gap-3">
        <button
          onClick={() => changeSpeed(-0.5)}
          className="w-8 h-8 flex items-center justify-center text-white/70 text-xl rounded-full border border-white/20 active:bg-white/10"
        >
          −
        </button>
        <span className="text-white text-sm w-8 text-center">{displaySpeed}</span>
        <button
          onClick={() => changeSpeed(0.5)}
          className="w-8 h-8 flex items-center justify-center text-white/70 text-xl rounded-full border border-white/20 active:bg-white/10"
        >
          +
        </button>

        <button
          onClick={togglePlaying}
          className="w-12 h-12 flex items-center justify-center bg-white text-black text-xl rounded-full shadow-lg active:scale-95 transition-transform ml-2"
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
      </div>

      <button
        onClick={onSettingsToggle}
        className="text-white/70 text-xl px-3 py-1.5 rounded-lg border border-white/20 active:bg-white/10"
        aria-label="설정 열기"
      >
        ⚙
      </button>
    </div>
  )
}
