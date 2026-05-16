import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Commands from './pages/Commands'
import CommandDetail from './pages/CommandDetail'
import Practice from './pages/Practice'
import Scenarios from './pages/Scenarios'
import Reference from './pages/Reference'
import Progress from './pages/Progress'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="commands" element={<Commands />} />
          <Route path="commands/:id" element={<CommandDetail />} />
          <Route path="practice" element={<Practice />} />
          <Route path="scenarios" element={<Scenarios />} />
          <Route path="reference" element={<Reference />} />
          <Route path="progress" element={<Progress />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
