const collectText = (node: unknown): string => {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(collectText).join(' ')
  if (typeof node === 'object') {
    const record = node as Record<string, unknown>
    if (typeof record.value === 'string') return record.value
    if (typeof record.text === 'string') return record.text
    if (typeof record.content === 'string') return record.content
    if (record.children) return collectText(record.children)
    const props = record.props as Record<string, unknown> | undefined
    if (props && typeof props.value === 'string') return props.value
  }
  return ''
}

export const getReadingTimeMinutes = (content: unknown, wordsPerMinute = 200): number => {
  const text = collectText(content).trim()
  if (!text) return 0
  const words = text.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}
