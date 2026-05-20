import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

const Home = lazy(() => import('./pages/Home'))
const Commands = lazy(() => import('./pages/Commands'))
const CommandDetail = lazy(() => import('./pages/CommandDetail'))
const Practice = lazy(() => import('./pages/Practice'))
const Scenarios = lazy(() => import('./pages/Scenarios'))
const Reference = lazy(() => import('./pages/Reference'))
const Progress = lazy(() => import('./pages/Progress'))
const NotFound = lazy(() => import('./pages/NotFound'))

function RouteFallback() {
  return (
    <div className="flex min-h-40 items-center justify-center">
      <div className="h-5 w-5 rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-accent)] animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Suspense fallback={<RouteFallback />}><Home /></Suspense>} />
          <Route path="commands" element={<Suspense fallback={<RouteFallback />}><Commands /></Suspense>} />
          <Route path="commands/:id" element={<Suspense fallback={<RouteFallback />}><CommandDetail /></Suspense>} />
          <Route path="practice" element={<Suspense fallback={<RouteFallback />}><Practice /></Suspense>} />
          <Route path="scenarios" element={<Suspense fallback={<RouteFallback />}><Scenarios /></Suspense>} />
          <Route path="reference" element={<Suspense fallback={<RouteFallback />}><Reference /></Suspense>} />
          <Route path="progress" element={<Suspense fallback={<RouteFallback />}><Progress /></Suspense>} />
          <Route path="*" element={<Suspense fallback={<RouteFallback />}><NotFound /></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
