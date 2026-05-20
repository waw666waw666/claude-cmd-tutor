import type { Command } from '../types'

export function findMatchingCommand(input: string, commands: Command[]) {
  const normalized = input.trim().toLowerCase()
  return commands.find((command) =>
    normalized === command.name.toLowerCase() ||
    command.aliases?.some((alias) => normalized === alias.toLowerCase())
  )
}

export function normalizeScenarioCommand(input: string) {
  return input.toLowerCase().replace(/--\w+/g, '').trim()
}

export function isScenarioCommandCorrect(input: string, expectedCommand: string) {
  return normalizeScenarioCommand(input) === normalizeScenarioCommand(expectedCommand)
}
