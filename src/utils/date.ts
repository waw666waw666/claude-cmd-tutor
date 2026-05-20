export function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getDaysBetweenLocalDateKeys(from: string, to: string) {
  const fromDate = parseLocalDateKey(from)
  const toDate = parseLocalDateKey(to)
  if (!fromDate || !toDate) return 0

  return Math.floor((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24))
}

function parseLocalDateKey(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) return null

  const [, year, month, day] = match
  return new Date(Number(year), Number(month) - 1, Number(day))
}
