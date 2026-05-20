import type { Achievement, ProgressState } from '../types'

export function countUnlockedAchievements(achievements: Achievement[], state: ProgressState) {
  return achievements.filter((achievement) => achievement.condition(state)).length
}
