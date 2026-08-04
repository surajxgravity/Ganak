export type UnitCategory = 'length' | 'mass' | 'temperature' | 'area' | 'volume'

export type Unit = {
  id: string
  name: string
  symbol: string
  category: UnitCategory
  toBase: (value: number) => number
  fromBase: (value: number) => number
}

const factorUnit = (
  id: string,
  name: string,
  symbol: string,
  category: UnitCategory,
  factor: number,
): Unit => ({
  id,
  name,
  symbol,
  category,
  toBase: (value) => value * factor,
  fromBase: (value) => value / factor,
})

export const unitCategories: Readonly<Record<UnitCategory, string>> = {
  length: 'Length',
  mass: 'Mass',
  temperature: 'Temperature',
  area: 'Area',
  volume: 'Volume',
}

export const units: readonly Unit[] = [
  factorUnit('millimeter', 'Millimeter', 'mm', 'length', 0.001),
  factorUnit('centimeter', 'Centimeter', 'cm', 'length', 0.01),
  factorUnit('meter', 'Meter', 'm', 'length', 1),
  factorUnit('kilometer', 'Kilometer', 'km', 'length', 1000),
  factorUnit('inch', 'Inch', 'in', 'length', 0.0254),
  factorUnit('foot', 'Foot', 'ft', 'length', 0.3048),
  factorUnit('yard', 'Yard', 'yd', 'length', 0.9144),
  factorUnit('mile', 'Mile', 'mi', 'length', 1609.344),
  factorUnit('milligram', 'Milligram', 'mg', 'mass', 0.000001),
  factorUnit('gram', 'Gram', 'g', 'mass', 0.001),
  factorUnit('kilogram', 'Kilogram', 'kg', 'mass', 1),
  factorUnit('pound', 'Pound', 'lb', 'mass', 0.45359237),
  factorUnit('ounce', 'Ounce', 'oz', 'mass', 0.028349523125),
  {
    id: 'celsius',
    name: 'Celsius',
    symbol: '°C',
    category: 'temperature',
    toBase: (value) => value + 273.15,
    fromBase: (value) => value - 273.15,
  },
  {
    id: 'fahrenheit',
    name: 'Fahrenheit',
    symbol: '°F',
    category: 'temperature',
    toBase: (value) => ((value - 32) * 5) / 9 + 273.15,
    fromBase: (value) => ((value - 273.15) * 9) / 5 + 32,
  },
  {
    id: 'kelvin',
    name: 'Kelvin',
    symbol: 'K',
    category: 'temperature',
    toBase: (value) => value,
    fromBase: (value) => value,
  },
  factorUnit('square-meter', 'Square meter', 'm²', 'area', 1),
  factorUnit('square-kilometer', 'Square kilometer', 'km²', 'area', 1_000_000),
  factorUnit('square-foot', 'Square foot', 'ft²', 'area', 0.09290304),
  factorUnit('acre', 'Acre', 'ac', 'area', 4046.8564224),
  factorUnit('milliliter', 'Milliliter', 'mL', 'volume', 0.001),
  factorUnit('liter', 'Liter', 'L', 'volume', 1),
  factorUnit('cubic-meter', 'Cubic meter', 'm³', 'volume', 1000),
  factorUnit('gallon-us', 'US gallon', 'gal', 'volume', 3.785411784),
]

export function getUnitsForCategory(category: UnitCategory): readonly Unit[] {
  return units.filter((unit) => unit.category === category)
}

export function findUnit(unitId: string): Unit | undefined {
  return units.find((unit) => unit.id === unitId)
}
