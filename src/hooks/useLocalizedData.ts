import { useI18n } from '../i18n/context'
import { commands as zhCommands, categoryLabels as zhLabels } from '../data/commands'
import { commands as enCommands, categoryLabels as enLabels } from '../data/commandsEn'
import { scenarios as zhScenarios } from '../data/scenarios'
import { scenarios as enScenarios } from '../data/scenariosEn'
import { achievements as zhAchievements } from '../data/achievements'
import { achievements as enAchievements } from '../data/achievementsEn'


export function useCommands() {
  const { lang } = useI18n()
  return lang === 'en' ? enCommands : zhCommands
}

export function useCategoryLabels() {
  const { lang } = useI18n()
  return lang === 'en' ? enLabels : zhLabels
}

export function useScenarios() {
  const { lang } = useI18n()
  return lang === 'en' ? enScenarios : zhScenarios
}

export function useAchievements() {
  const { lang } = useI18n()
  return lang === 'en' ? enAchievements : zhAchievements
}
