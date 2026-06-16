import useStore from '../store/useStore'

export default function ScriptList() {
  const scripts = useStore((state) => state.scripts)
  const activeScriptId = useStore((state) => state.activeScriptId)
  const addScript = useStore((state) => state.addScript)
  const deleteScript = useStore((state) => state.deleteScript)
  const selectScript = useStore((state) => state.selectScript)

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
      {scripts.map((s) => (
        <div
          key={s.id}
          className={`flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-full text-sm cursor-pointer transition-colors ${
            s.id === activeScriptId
              ? 'bg-white text-black'
              : 'bg-gray-800 text-white/70 active:bg-gray-700'
          }`}
          onClick={() => selectScript(s.id)}
        >
          <span className="max-w-[120px] truncate">{s.title}</span>
          {s.id === activeScriptId && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (window.confirm(`"${s.title}" 스크립트를 삭제할까요?`)) {
                  deleteScript(s.id)
                }
              }}
              className="text-gray-500 hover:text-red-500 text-xs ml-0.5 leading-none"
            >
              ×
            </button>
          )}
        </div>
      ))}
      <button
        onClick={addScript}
        className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-white/60 text-lg active:bg-gray-700"
      >
        +
      </button>
    </div>
  )
}
