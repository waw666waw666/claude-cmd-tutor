import type { CommandProgress, ScenarioProgress } from '../types'
import { getLocalDateKey } from './date'

export interface PersistedProgressState {
  commandProgress: Record<string, CommandProgress>
  scenarioProgress: Record<string, ScenarioProgress>
  totalPracticeCount: number
  lastActiveDate: string
  streakDays: number
  achievements: string[]
}

export function createDefaultPersistedProgressState(): PersistedProgressState {
  return {
    commandProgress: {},
    scenarioProgress: {},
    totalPracticeCount: 0,
    lastActiveDate: getLocalDateKey(),
    streakDays: 1,
    achievements: [],
  }
}

export function migratePersistedProgressState(persistedState: unknown): PersistedProgressState {
  const defaults = createDefaultPersistedProgressState()

  if (!persistedState || typeof persistedState !== 'object') {
    return defaults
  }

  const state = persistedState as Partial<PersistedProgressState>

  return {
    commandProgress: isRecord(state.commandProgress) ? state.commandProgress : defaults.commandProgress,
    scenarioProgress: isRecord(state.scenarioProgress) ? state.scenarioProgress : defaults.scenarioProgress,
    totalPracticeCount: typeof state.totalPracticeCount === 'number' ? state.totalPracticeCount : defaults.totalPracticeCount,
    lastActiveDate: isDateKey(state.lastActiveDate) ? state.lastActiveDate : defaults.lastActiveDate,
    streakDays: typeof state.streakDays === 'number' && state.streakDays > 0 ? Math.floor(state.streakDays) : defaults.streakDays,
    achievements: Array.isArray(state.achievements) ? state.achievements.filter((value): value is string => typeof value === 'string') : defaults.achievements,
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function isDateKey(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
}
