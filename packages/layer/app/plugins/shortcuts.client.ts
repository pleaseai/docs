/**
 * Installs the documentation layer's keyboard shortcuts on app boot.
 *
 * Client-only because the shortcut targets `window` keystrokes, which
 * have no meaning on the server.
 */
export default defineNuxtPlugin(() => {
  useDocsShortcuts()
})
