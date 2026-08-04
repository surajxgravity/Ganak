import { findUnit } from './catalog'

export type ConversionResult = { ok: true; value: number } | { ok: false; error: string }

export function convert(value: number, fromUnitId: string, toUnitId: string): ConversionResult {
  if (!Number.isFinite(value)) {
    return { ok: false, error: 'Enter a valid number.' }
  }

  const fromUnit = findUnit(fromUnitId)
  const toUnit = findUnit(toUnitId)

  if (!fromUnit || !toUnit) {
    return { ok: false, error: 'Select valid units.' }
  }

  if (fromUnit.category !== toUnit.category) {
    return { ok: false, error: 'Units must belong to the same category.' }
  }

  return { ok: true, value: toUnit.fromBase(fromUnit.toBase(value)) }
}

export function formatConversionValue(value: number): string {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 10,
    useGrouping: true,
  }).format(value)
}
