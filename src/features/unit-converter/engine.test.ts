import { describe, expect, it } from 'vitest'
import { convert, formatConversionValue } from './engine'

describe('unit conversion engine', () => {
  it('converts between factor-based length units', () => {
    expect(convert(1, 'meter', 'centimeter')).toEqual({ ok: true, value: 100 })
  })

  it('converts Fahrenheit to Celsius', () => {
    const result = convert(32, 'fahrenheit', 'celsius')
    expect(result).toEqual({ ok: true, value: 0 })
  })

  it('rejects incompatible unit categories', () => {
    expect(convert(1, 'meter', 'kilogram')).toEqual({
      ok: false,
      error: 'Units must belong to the same category.',
    })
  })

  it('formats output for readable display', () => {
    expect(formatConversionValue(1234.567891234)).toBe('1,234.567891234')
  })
})
