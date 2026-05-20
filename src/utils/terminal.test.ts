import { describe, expect, it } from 'vitest'
import type { Command } from '../types'
import { findMatchingCommand, isScenarioCommandCorrect, normalizeScenarioCommand } from './terminal'

const commands: Command[] = [
  {
    id: 'help',
    name: '/help',
    aliases: ['help'],
    category: 'basic',
    summary: '',
    description: '',
    usage: '',
    example: '',
    exampleOutput: '',
    tips: [],
    difficulty: 1,
  },
]

describe('terminal utils', () => {
  it('matches commands by name or alias case-insensitively', () => {
    expect(findMatchingCommand('/HELP', commands)?.id).toBe('help')
    expect(findMatchingCommand('help', commands)?.id).toBe('help')
  })

  it('normalizes scenario commands by ignoring long flags', () => {
    expect(normalizeScenarioCommand('/review --fast')).toBe('/review')
    expect(isScenarioCommandCorrect('/review --fast', '/review')).toBe(true)
  })
})
