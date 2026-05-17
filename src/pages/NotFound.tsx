import { useNavigate } from 'react-router-dom'
import { Home } from 'lucide-react'
import { useI18n } from '../i18n/context'

export default function NotFound() {
  const { t } = useI18n()
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 p-6 text-center">
      <div className="text-6xl font-mono text-[var(--color-text-dimmer)]">404</div>
      <p className="text-[var(--color-text-dim)]">{t.notFound.message}</p>
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-accent)] text-[#faf9f5] text-sm font-medium hover:bg-[var(--color-accent-dim)] transition-colors"
      >
        <Home size={16} />
        {t.notFound.back}
      </button>
    </div>
  )
}
