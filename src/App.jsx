import { Routes, Route } from 'react-router-dom'
import { useRegisterSW } from 'virtual:pwa-register/react'
import EditorPage from './pages/EditorPage.jsx'
import PrompterPage from './pages/PrompterPage.jsx'

function UpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW()

  if (!needRefresh) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-2xl p-6 mx-6 w-full max-w-sm shadow-2xl border border-gray-700">
        <h3 className="text-white font-bold text-base mb-2">업데이트 알림</h3>
        <p className="text-white/60 text-sm mb-6">
          새 버전이 있습니다.{'\n'}지금 업데이트하시겠어요?
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => updateServiceWorker(true)}
            className="flex-1 py-3 bg-green-500 text-black text-sm font-bold rounded-xl active:bg-green-400"
          >
            지금 업데이트
          </button>
          <button
            onClick={() => setNeedRefresh(false)}
            className="flex-1 py-3 bg-gray-800 text-white/60 text-sm rounded-xl active:bg-gray-700"
          >
            나중에
          </button>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<EditorPage />} />
        <Route path="/prompter" element={<PrompterPage />} />
      </Routes>
      <UpdatePrompt />
    </>
  )
}
