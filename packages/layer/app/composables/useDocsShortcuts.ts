import { onKeyStroke } from '@vueuse/core'
import { computed } from 'vue'

/**
 * Returns `true` when the keystroke originated from an editable element
 * (`<input>`, `<textarea>`, or any element with `[contenteditable]`),
 * in which case the shortcut should be ignored so the user can type freely.
 *
 * Traverses up the DOM tree from the event target so that non-`HTMLElement`
 * descendants (e.g. `SVGElement`, `MathMLElement`) inside an editable
 * container are still treated as editable.
 */
function isEditableTarget(target: EventTarget | null): boolean {
  let el: Node | null = target instanceof Node ? target : null
  while (el && !(el instanceof HTMLElement)) {
    el = el.parentNode
  }

  if (!el)
    return false

  const tag = el.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT')
    return true

  if (el.isContentEditable)
    return true

  return false
}

/**
 * Registers a keyboard shortcut (default `d`) that toggles between
 * light and dark color modes. Mirrors docus' `useDocusShortcuts`
 * composable (upstream commit `61c36d03`) but is reimplemented on top of
 * `@vueuse/core`'s `onKeyStroke` instead of `@nuxt/ui`'s `defineShortcuts`.
 *
 * The handler bails out when:
 * - the color mode is forced (e.g. `colorMode.forced === true`),
 * - the keystroke originated from an editable element,
 * - any modifier key (meta / ctrl / alt / shift) is pressed,
 * - the configured shortcut is empty.
 */
export function useDocsShortcuts(): void {
  const appConfig = useAppConfig()
  const colorMode = useColorMode()

  const toggleColorModeShortcut = computed<string>(
    () => appConfig.docs?.shortcuts?.toggleColorMode ?? 'd',
  )

  onKeyStroke(
    (event: KeyboardEvent) => {
      const key = toggleColorModeShortcut.value
      if (!key)
        return false
      return event.key?.toLowerCase() === key.toLowerCase()
    },
    (event: KeyboardEvent) => {
      if (colorMode.forced)
        return

      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey)
        return

      if (isEditableTarget(event.target))
        return

      const resolved = colorMode.value === 'dark' ? 'light' : 'dark'
      colorMode.preference = resolved
    },
  )
}
