export type ToolCategory = 'converter' | 'finance' | 'health' | 'math' | 'science' | 'developer'

export type ToolDefinition = {
  id: string
  name: string
  description: string
  category: ToolCategory
  path: string
  keywords: readonly string[]
  status: 'available' | 'planned'
}
