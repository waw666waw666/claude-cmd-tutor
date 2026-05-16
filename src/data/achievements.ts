import type { Achievement } from '../types'
import { commands } from './commands'
import { scenarios } from './scenarios'

export const achievements: Achievement[] = [
  {
    id: 'first-step',
    title: '第一步',
    description: '完成第一个命令的学习',
    icon: '🌱',
    condition: (state) =>
      Object.values(state.commandProgress).filter((c) => c.completed).length >= 1,
  },
  {
    id: 'learner-5',
    title: '勤学者',
    description: '掌握 5 个命令',
    icon: '📚',
    condition: (state) =>
      Object.values(state.commandProgress).filter((c) => c.completed).length >= 5,
  },
  {
    id: 'learner-10',
    title: '命令达人',
    description: '掌握 10 个命令',
    icon: '🎯',
    condition: (state) =>
      Object.values(state.commandProgress).filter((c) => c.completed).length >= 10,
  },
  {
    id: 'master-all',
    title: '命令大师',
    description: '掌握所有命令',
    icon: '🏆',
    condition: (state) => {
      const all = Object.values(state.commandProgress)
      return all.length >= commands.length && all.every((c) => c.completed)
    },
  },
  {
    id: 'first-scenario',
    title: '初次挑战',
    description: '完成第一个情景挑战',
    icon: '🌟',
    condition: (state) =>
      Object.values(state.scenarioProgress).filter((s) => s.completed).length >= 1,
  },
  {
    id: 'scenario-master',
    title: '情景大师',
    description: '完成所有情景挑战',
    icon: '💎',
    condition: (state) =>
      Object.values(state.scenarioProgress).filter((s) => s.completed).length >= scenarios.length && scenarios.length > 0,
  },
  {
    id: 'practice-50',
    title: '练习达人',
    description: '累计完成 50 次练习',
    icon: '⚡',
    condition: (state) => state.totalPracticeCount >= 50,
  },
  {
    id: 'streak-3',
    title: '坚持3天',
    description: '连续 3 天学习',
    icon: '🔥',
    condition: (state) => state.streakDays >= 3,
  },
  {
    id: 'streak-7',
    title: '坚持7天',
    description: '连续 7 天学习',
    icon: '🔥🔥',
    condition: (state) => state.streakDays >= 7,
  },
]
