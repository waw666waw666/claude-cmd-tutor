export type CommandCategory = 'basic' | 'diagnostics' | 'editing' | 'search' | 'cli' | 'opencode'

export interface Command {
  id: string
  name: string
  aliases?: string[]
  category: CommandCategory
  summary: string
  description: string
  usage: string
  example: string
  exampleOutput: string
  tips: string[]
  difficulty: 1 | 2 | 3
}

type ScenarioDifficulty = 'easy' | 'medium' | 'hard'

export interface Scenario {
  id: string
  title: string
  description: string
  difficulty: ScenarioDifficulty
  context: string
  steps: ScenarioStep[]
  hints: string[]
}

interface ScenarioStep {
  id: string
  question: string
  expectedCommand: string
  feedback: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  condition: (state: ProgressState) => boolean
}

export interface CommandProgress {
  completed: boolean
  practiceCount: number
  lastPracticed?: number
}

export interface ScenarioProgress {
  completed: boolean
  completedSteps: string[]
}

export interface ProgressState {
  commandProgress: Record<string, CommandProgress>
  scenarioProgress: Record<string, ScenarioProgress>
  achievements: string[]
  totalPracticeCount: number
  streakDays: number
  lastActiveDate: string
}

export interface TerminalLine {
  id: string
  type: 'input' | 'output' | 'system' | 'error' | 'success'
  content: string
  timestamp: number
}

type ViewMode = 'normal' | 'practice' | 'scenario'

export interface PracticeState {
  mode: ViewMode
  currentCommandId: string | null
  currentScenarioId: string | null
  currentStepIndex: number
  recallMode: boolean
}
