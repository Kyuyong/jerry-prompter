import { useRef, useState, useEffect } from 'react'
import useStore from '../store/useStore'
import { useScroll } from '../hooks/useScroll.js'
import { useWakeLock } from '../hooks/useWakeLock.js'
import { useRemote } from '../hooks/useRemote.js'
import ProgressBar from '../components/ProgressBar.jsx'
import ControlBar from '../components/ControlBar.jsx'
import SettingsPanel from '../components/SettingsPanel.jsx'

export default function PrompterPage() {
  const containerRef = useRef(null)
  const [showSettings, setShowSettings] = useState(false)

  const scripts = useStore((state) => state.scripts)
  const activeScriptId = useStore((state) => state.activeScriptId)
  const settings = useStore((state) => state.settings)
  const setPlaying = useStore((state) => state.setPlaying)

  const active = scripts.find((s) => s.id === activeScriptId)

  useEffect(() => {
    return () => setPlaying(false)
  }, [setPlaying])

  useWakeLock()
  const { handleTouchStart, handleTouchEnd } = useScroll(containerRef)
  useRemote(containerRef)

  const transform = [
    settings.flipH ? 'scaleX(-1)' : '',
    settings.flipV ? 'scaleY(-1)' : '',
  ]
    .filter(Boolean)
    .join(' ') || 'none'

  return (
    <div className="fixed inset-0" style={{ backgroundColor: settings.bgColor }}>
      <ProgressBar containerRef={containerRef} />

      <div
        ref={containerRef}
        className="absolute inset-0 overflow-y-auto overflow-x-hidden"
        style={{ paddingTop: '12px', paddingBottom: '72px' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          style={{
            transform,
            fontSize: `${settings.fontSize}px`,
            color: settings.textColor,
            paddingLeft: `${settings.margin}px`,
            paddingRight: `${settings.margin}px`,
            lineHeight: settings.lineHeight,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {active?.content || '스크립트가 없습니다.\n편집 화면으로 돌아가서 스크립트를 추가해주세요.'}
        </div>
      </div>

      <ControlBar onSettingsToggle={() => setShowSettings((v) => !v)} />

      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </div>
  )
}
