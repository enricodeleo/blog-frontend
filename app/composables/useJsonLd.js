export function useJsonLd(schema) {
  const jsonLd = computed(() => {
    const value = typeof schema === 'function' ? schema() : unref(schema)
    if (value == null) return ''
    return typeof value === 'string' ? value : JSON.stringify(value)
  })

  useHead(() => ({
    script: jsonLd.value
      ? [
          {
            type: 'application/ld+json',
            textContent: jsonLd.value
          }
        ]
      : []
  }))

  return { jsonLd }
}
