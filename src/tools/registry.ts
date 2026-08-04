import type { ToolCategory, ToolDefinition } from '../domain/tool'

export const categories: Readonly<Record<ToolCategory, string>> = {
  converter: 'Converters',
  finance: 'Financial',
  health: 'Health',
  math: 'Mathematics',
  science: 'Science',
  developer: 'Developer',
}

export const toolRegistry: readonly ToolDefinition[] = [
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert length, mass, temperature, area and volume units.',
    category: 'converter',
    path: '/unit-converter',
    keywords: ['units', 'length', 'mass', 'temperature', 'area', 'volume'],
    status: 'available',
  },
  {
    id: 'scientific-calculator',
    name: 'Scientific Calculator',
    description: 'Advanced expressions and scientific functions.',
    category: 'math',
    path: '/scientific-calculator',
    keywords: ['math', 'expression', 'trigonometry'],
    status: 'planned',
  },
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    description: 'Find percentages, changes and proportions.',
    category: 'math',
    path: '/percentage-calculator',
    keywords: ['percent', 'increase', 'decrease'],
    status: 'planned',
  },
]

export const availableTools = toolRegistry.filter((tool) => tool.status === 'available')

export function findToolByPath(pathname: string): ToolDefinition | undefined {
  return toolRegistry.find((tool) => tool.path === pathname)
}
