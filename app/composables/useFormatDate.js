export function useFormatDate() {
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }

  const formatDateLong = (date) => {
    if (!date) return ''
    const event = new Date(date)
    return event.toLocaleDateString('it-IT', dateOptions)
  }

  return {
    formatDateLong
  }
}
