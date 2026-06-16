import { Routes, Route } from 'react-router-dom'
import EditorPage from './pages/EditorPage.jsx'
import PrompterPage from './pages/PrompterPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<EditorPage />} />
      <Route path="/prompter" element={<PrompterPage />} />
    </Routes>
  )
}
