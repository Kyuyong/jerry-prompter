import { useNavigate } from 'react-router-dom'
import useStore from '../store/useStore'
import ScriptList from '../components/ScriptList.jsx'

export default function EditorPage() {
  const navigate = useNavigate()
  const scripts = useStore((state) => state.scripts)
  const activeScriptId = useStore((state) => state.activeScriptId)
  const updateScript = useStore((state) => state.updateScript)
  const setPlaying = useStore((state) => state.setPlaying)
  const addScript = useStore((state) => state.addScript)

  const active = scripts.find((s) => s.id === activeScriptId)

  const startPrompter = () => {
    setPlaying(true)
    navigate('/prompter')
  }

  return (
    <div className="fixed inset-0 bg-gray-950 flex flex-col">
      {/* Header */}
      <div className="px-4 pb-3 border-b border-gray-800" style={{ paddingTop: 'max(16px, env(safe-area-inset-top))' }}>
        <h1 className="text-white font-bold text-lg mb-3">Jerry Prompter</h1>
        <ScriptList />
      </div>

      {/* Editor area */}
      {active ? (
        <div className="flex-1 flex flex-col overflow-hidden px-4 py-3 gap-2">
          <input
            type="text"
            value={active.title}
            onChange={(e) => updateScript(active.id, { title: e.target.value })}
            placeholder="스크립트 제목"
            className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-green-400"
          />
          <textarea
            value={active.content}
            onChange={(e) => updateScript(active.id, { content: e.target.value })}
            placeholder="스크립트 내용을 입력하거나 붙여넣으세요..."
            className="flex-1 w-full bg-gray-800 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-green-400 resize-none leading-relaxed"
          />
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-white/40">
          <p className="text-sm">스크립트가 없습니다.</p>
          <button
            onClick={addScript}
            className="px-4 py-2 bg-gray-800 rounded-lg text-white/70 text-sm active:bg-gray-700"
          >
            + 첫 스크립트 만들기
          </button>
        </div>
      )}

      {/* Bottom bar */}
      <div className="px-4 pt-3 flex gap-3 border-t border-gray-800" style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}>
        <button
          onClick={startPrompter}
          disabled={!active?.content}
          className="flex-1 py-3 bg-green-500 text-black font-bold rounded-xl text-base active:bg-green-400 disabled:opacity-40 disabled:pointer-events-none"
        >
          ▶ 프롬프터 시작
        </button>
      </div>
    </div>
  )
}
