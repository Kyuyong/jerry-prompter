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
    <div className="fixed bottom-20 left-4 right-4 z-50 bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-2xl">
      <p className="text-white text-sm mb-3">새 버전이 있습니다. 업데이트할까요?</p>
      <div className="flex gap-2">
        <button
          onClick={() => updateServiceWorker(true)}
          className="flex-1 py-2 bg-green-500 text-black text-sm font-bold rounded-lg active:bg-green-400"
        >
          지금 업데이트
        </button>
        <button
          onClick={() => setNeedRefresh(false)}
          className="flex-1 py-2 bg-gray-700 text-white/70 text-sm rounded-lg active:bg-gray-600"
        >
          나중에
        </button>
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
