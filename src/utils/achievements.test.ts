import { describe, expect, it } from 'vitest'
import type { Achievement, ProgressState } from '../types'
import { countUnlockedAchievements } from './achievements'

const state: ProgressState = {
  commandProgress: {
    help: { completed: true, practiceCount: 1 },
  },
  scenarioProgress: {
    setup: { completed: true, completedSteps: ['one'] },
  },
  achievements: ['saved'],
  totalPracticeCount: 3,
  streakDays: 2,
  lastActiveDate: '2026-01-02',
}

describe('achievement utils', () => {
  it('passes the full progress state into achievement conditions', () => {
    const achievements: Achievement[] = [
      {
        id: 'scenario',
        title: 'Scenario',
        description: '',
        icon: '',
        condition: (progress) => Object.values(progress.scenarioProgress).some((item) => item.completed),
      },
      {
        id: 'saved',
        title: 'Saved',
        description: '',
        icon: '',
        condition: (progress) => progress.achievements.includes('saved'),
      },
    ]

    expect(countUnlockedAchievements(achievements, state)).toBe(2)
  })
})
