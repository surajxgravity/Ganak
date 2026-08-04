import { useMemo, useState } from 'react'
import { getUnitsForCategory, unitCategories, type UnitCategory } from './catalog'
import { convert, formatConversionValue } from './engine'

const defaultUnits: Record<UnitCategory, readonly [string, string]> = {
  length: ['meter', 'kilometer'],
  mass: ['kilogram', 'pound'],
  temperature: ['celsius', 'fahrenheit'],
  area: ['square-meter', 'square-foot'],
  volume: ['liter', 'gallon-us'],
}

export function UnitConverter() {
  const [category, setCategory] = useState<UnitCategory>('length')
  const [fromUnitId, setFromUnitId] = useState('meter')
  const [toUnitId, setToUnitId] = useState('kilometer')
  const [input, setInput] = useState('1')
  const categoryUnits = useMemo(() => getUnitsForCategory(category), [category])
  const result = convert(Number(input), fromUnitId, toUnitId)

  function handleCategoryChange(nextCategory: UnitCategory) {
    const [nextFromUnit, nextToUnit] = defaultUnits[nextCategory]
    setCategory(nextCategory)
    setFromUnitId(nextFromUnit)
    setToUnitId(nextToUnit)
  }

  function swapUnits() {
    setFromUnitId(toUnitId)
    setToUnitId(fromUnitId)
  }

  return (
    <section className="converter-card" aria-labelledby="converter-heading">
      <div className="section-heading">
        <p className="eyebrow">Available now</p>
        <h2 id="converter-heading">Unit Converter</h2>
        <p>Accurate everyday conversions with a transparent, extensible unit catalog.</p>
      </div>
      <div className="field-grid">
        <label>
          Category
          <select
            value={category}
            onChange={(event) => handleCategoryChange(event.target.value as UnitCategory)}
          >
            {Object.entries(unitCategories).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Value
          <input
            aria-label="Value to convert"
            inputMode="decimal"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </label>
        <label>
          From
          <select value={fromUnitId} onChange={(event) => setFromUnitId(event.target.value)}>
            {categoryUnits.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name} ({unit.symbol})
              </option>
            ))}
          </select>
        </label>
        <div className="swap-control">
          <button
            className="swap-button"
            type="button"
            onClick={swapUnits}
            aria-label="Swap from and to units"
          >
            ⇄
          </button>
        </div>
        <label>
          To
          <select value={toUnitId} onChange={(event) => setToUnitId(event.target.value)}>
            {categoryUnits.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name} ({unit.symbol})
              </option>
            ))}
          </select>
        </label>
      </div>
      <output className="conversion-result" aria-live="polite">
        {result.ok
          ? `${formatConversionValue(result.value)} ${categoryUnits.find((unit) => unit.id === toUnitId)?.symbol}`
          : result.error}
      </output>
    </section>
  )
}
