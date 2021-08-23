export async function copyToClipboard(textToCopy: string) {
  // navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(textToCopy)
  } else {
    const activeElement = document.activeElement as HTMLElement
    // text area method
    const textArea = document.createElement('textarea')
    textArea.value = textToCopy
    textArea.classList.add('ld-sr-only')
    document.body.appendChild(textArea)
    textArea.focus({ preventScroll: true })
    textArea.select()
    await document.execCommand('copy')
    textArea.remove()
    activeElement.focus({ preventScroll: true })
  }
}
