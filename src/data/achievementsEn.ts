import type { Achievement } from '../types'
import { commands } from './commandsEn'
import { scenarios } from './scenariosEn'

export const achievements: Achievement[] = [
  {
    id: 'first-step',
    title: 'First Step',
    description: 'Complete your first command lesson',
    icon: '🌱',
    condition: (state) =>
      Object.values(state.commandProgress).filter((c) => c.completed).length >= 1,
  },
  {
    id: 'learner-5',
    title: 'Diligent Learner',
    description: 'Master 5 commands',
    icon: '📚',
    condition: (state) =>
      Object.values(state.commandProgress).filter((c) => c.completed).length >= 5,
  },
  {
    id: 'learner-10',
    title: 'Command Adept',
    description: 'Master 10 commands',
    icon: '🎯',
    condition: (state) =>
      Object.values(state.commandProgress).filter((c) => c.completed).length >= 10,
  },
  {
    id: 'master-all',
    title: 'Command Master',
    description: 'Master all commands',
    icon: '🏆',
    condition: (state) => {
      const all = Object.values(state.commandProgress)
      return all.length >= commands.length && all.every((c) => c.completed)
    },
  },
  {
    id: 'first-scenario',
    title: 'First Challenge',
    description: 'Complete your first scenario challenge',
    icon: '🌟',
    condition: (state) =>
      Object.values(state.scenarioProgress).filter((s) => s.completed).length >= 1,
  },
  {
    id: 'scenario-master',
    title: 'Scenario Master',
    description: 'Complete all scenario challenges',
    icon: '💎',
    condition: (state) =>
      Object.values(state.scenarioProgress).filter((s) => s.completed).length >= scenarios.length && scenarios.length > 0,
  },
  {
    id: 'practice-50',
    title: 'Practice Expert',
    description: 'Complete 50 practice sessions in total',
    icon: '⚡',
    condition: (state) => state.totalPracticeCount >= 50,
  },
  {
    id: 'streak-3',
    title: '3-Day Streak',
    description: 'Learn for 3 consecutive days',
    icon: '🔥',
    condition: (state) => state.streakDays >= 3,
  },
  {
    id: 'streak-7',
    title: '7-Day Streak',
    description: 'Learn for 7 consecutive days',
    icon: '🔥🔥',
    condition: (state) => state.streakDays >= 7,
  },
]
