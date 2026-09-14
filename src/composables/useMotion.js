import { onMounted, onUnmounted } from 'vue'
import { gsap, scheduleRefresh, whenReady } from '../animations/motion'

export function useMotion(setup, scopeRef) {
  let ctx = null
  let disposed = false

  onMounted(async () => {
    await whenReady()
    if (disposed) return
    ctx = gsap.context(setup, scopeRef?.value || undefined)
    scheduleRefresh()
  })

  onUnmounted(() => {
    disposed = true
    ctx?.revert()
  })
}
