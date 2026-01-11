// ~/composables/useCookiePreferencesDialog.ts

const showDialog = ref(false)

export function useCookiePreferencesDialog() {
  const open = () => {
    showDialog.value = true
  }

  const close = () => {
    showDialog.value = false
  }

  return {
    showDialog,
    open,
    close,
  }
}
