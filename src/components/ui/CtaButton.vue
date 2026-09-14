<template>
  <component
    :is="tag"
    :href="href"
    :to="to"
    :type="tag === 'button' ? type : undefined"
    :target="href && external ? '_blank' : undefined"
    :rel="href && external ? 'noopener noreferrer' : undefined"
    class="btn"
    :class="[`btn--${variant}`, { 'btn--block': block }]"
  >
    <span class="btn__label"><slot /></span>
    <svg
      v-if="arrow"
      class="btn__arrow"
      viewBox="0 0 16 16"
      width="13"
      height="13"
      aria-hidden="true"
    >
      <path
        d="M2 8h11M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  variant: { type: String, default: 'primary' },
  href: { type: String, default: null },
  to: { type: [String, Object], default: null },
  type: { type: String, default: 'button' },
  block: { type: Boolean, default: false },
  arrow: { type: Boolean, default: false },
})

const external = computed(
  () => !!props.href && !props.href.startsWith('#') && !props.href.startsWith('/'),
)

const tag = computed(() => {
  if (props.to) return RouterLink
  if (props.href) return 'a'
  return 'button'
})
</script>

<style scoped>
.btn__label {
  position: relative;
}

.btn__arrow {
  transition: transform 0.4s var(--ease);
}

.btn:hover .btn__arrow {
  transform: translateX(4px);
}
</style>
