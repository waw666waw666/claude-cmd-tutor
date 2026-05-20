import { describe, expect, it } from 'vitest'
import { getDaysBetweenLocalDateKeys, getLocalDateKey } from './date'

describe('date utils', () => {
  it('formats local date keys without UTC shifting', () => {
    expect(getLocalDateKey(new Date(2026, 0, 2, 1, 30))).toBe('2026-01-02')
  })

  it('counts calendar-day gaps between local date keys', () => {
    expect(getDaysBetweenLocalDateKeys('2026-01-01', '2026-01-02')).toBe(1)
    expect(getDaysBetweenLocalDateKeys('2026-01-01', '2026-01-05')).toBe(4)
  })
})
