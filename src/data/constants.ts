export const CATEGORY_ORDER = ['basic', 'diagnostics', 'editing', 'search', 'cli', 'opencode'] as const

const DIFFICULTY_KEYS = { 1: 'beginner', 2: 'intermediate', 3: 'advanced' } as const

const DIFFICULTY_COLORS: Record<number, string> = {
  1: 'text-[var(--color-difficulty-easy)]',
  2: 'text-[var(--color-difficulty-medium)]',
  3: 'text-[var(--color-difficulty-hard)]',
}

export function getDifficultyLabel(level: number, labels?: Record<string, string>): string {
  if (labels) {
    const key = DIFFICULTY_KEYS[level as keyof typeof DIFFICULTY_KEYS]
    return key ? labels[key] : ''
  }
  const map: Record<number, string> = { 1: '入门', 2: '进阶', 3: '高级' }
  return map[level] ?? ''
}

export function getDifficultyColor(level: number): string {
  return DIFFICULTY_COLORS[level] ?? ''
}

export function countCompletedCommands(commandProgress: Record<string, { completed: boolean }>): number {
  return Object.values(commandProgress).filter(c => c.completed).length
}

export function calcCompletionPercent(commandProgress: Record<string, { completed: boolean }>, total: number): number {
  if (total === 0) return 0
  return Math.round((countCompletedCommands(commandProgress) / total) * 100)
}

export function buildSearchKeywords(cmd: {
  name: string
  summary: string
  description: string
  usage?: string
  aliases?: string[]
  tips?: string[]
}): string {
  return [
    cmd.name,
    cmd.summary,
    cmd.description,
    cmd.usage ?? '',
    ...(cmd.aliases ?? []),
    ...(cmd.tips ?? []),
  ].join(' ').toLowerCase()
}
