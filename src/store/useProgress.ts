import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CommandProgress, ScenarioProgress, TerminalLine } from '../types'

let lineIdCounter = 0

interface AppState {
  commandProgress: Record<string, CommandProgress>
  scenarioProgress: Record<string, ScenarioProgress>
  totalPracticeCount: number
  lastActiveDate: string
  streakDays: number
  achievements: string[]
  terminalLines: TerminalLine[]

  updateStreak: () => void
  markCommandCompleted: (commandId: string) => void
  toggleCommandCompleted: (commandId: string) => void
  markScenarioStep: (scenarioId: string, stepId: string) => void
  markScenarioCompleted: (scenarioId: string) => void
  addPracticeCount: () => void
  addTerminalLine: (prefix: string, line: Omit<TerminalLine, 'id' | 'timestamp'>) => void
  clearTerminal: () => void
}

const useProgress = create<AppState>()(
  persist(
    (set, get) => ({
      commandProgress: {},
      scenarioProgress: {},
      totalPracticeCount: 0,
      lastActiveDate: new Date().toISOString().split('T')[0],
      streakDays: 1,
      achievements: [],
      terminalLines: [],

      updateStreak: () => {
        const today = new Date().toISOString().split('T')[0]
        const { lastActiveDate, streakDays } = get()
        
        if (lastActiveDate === today) return
        
        const lastDate = new Date(lastActiveDate)
        const todayDate = new Date(today)
        const diffTime = todayDate.getTime() - lastDate.getTime()
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
        
        if (diffDays === 1) {
          set({ streakDays: streakDays + 1, lastActiveDate: today })
        } else {
          set({ streakDays: 1, lastActiveDate: today })
        }
      },

      markCommandCompleted: (commandId) =>
        set((state) => ({
          commandProgress: {
            ...state.commandProgress,
            [commandId]: {
              completed: true,
              practiceCount: (state.commandProgress[commandId]?.practiceCount ?? 0) + 1,
              lastPracticed: Date.now(),
            },
          },
        })),

      toggleCommandCompleted: (commandId) =>
        set((state) => {
          const prev = state.commandProgress[commandId]
          const wasCompleted = prev?.completed ?? false
          return {
            commandProgress: {
              ...state.commandProgress,
              [commandId]: {
                completed: !wasCompleted,
                practiceCount: prev?.practiceCount ?? 0,
                lastPracticed: wasCompleted ? undefined : Date.now(),
              },
            },
          }
        }),

      markScenarioStep: (scenarioId, stepId) =>
        set((state) => {
          const current = state.scenarioProgress[scenarioId]
          const completedSteps = current?.completedSteps ?? []
          if (completedSteps.includes(stepId)) return {} as never
          return {
            scenarioProgress: {
              ...state.scenarioProgress,
              [scenarioId]: {
                completed: false,
                completedSteps: [...completedSteps, stepId],
              },
            },
          }
        }),

      markScenarioCompleted: (scenarioId) =>
        set((state) => ({
          scenarioProgress: {
            ...state.scenarioProgress,
            [scenarioId]: {
              completed: true,
              completedSteps: state.scenarioProgress[scenarioId]?.completedSteps ?? [],
            },
          },
        })),

      addPracticeCount: () =>
        set((state) => ({ totalPracticeCount: state.totalPracticeCount + 1 })),

      addTerminalLine: (prefix, line) => {
        const now = Date.now()
        const id = `${prefix}-${++lineIdCounter}-${now}`
        set((state) => ({
          terminalLines: [...state.terminalLines.slice(-199), { ...line, id, timestamp: now }],
        }))
      },

      clearTerminal: () => set({ terminalLines: [] }),
    }),
    {
      name: 'claude-cmd-tutor-progress',
      partialize: (state) => ({
        commandProgress: state.commandProgress,
        scenarioProgress: state.scenarioProgress,
        totalPracticeCount: state.totalPracticeCount,
        lastActiveDate: state.lastActiveDate,
        streakDays: state.streakDays,
        achievements: state.achievements,
      }),
    }
  )
)

export default useProgress
