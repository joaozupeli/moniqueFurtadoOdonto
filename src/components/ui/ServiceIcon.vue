<template>
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    stroke-width="1.3"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path
      v-if="name === 'tooth'"
      d="M12 3.5c-3 0-5 2-5 5 0 2.2 1 3.7 1.8 5.3.5 1 .7 2 .8 3.1l.2 2.6c.1.9 1.3 1 1.5.1l.7-3.3 .7 3.3c.2.9 1.4.8 1.5-.1l.2-2.6c.1-1.1.3-2.1.8-3.1C15.9 12.2 17 10.7 17 8.5c0-3-2-5-5-5z"
    />
    <template v-else-if="name === 'braces'">
      <path d="M3.5 9h17M3.5 15h17" />
      <path d="M7 9v6M12 9v6M17 9v6" />
    </template>
    <template v-else-if="name === 'implant'">
      <path d="M8.5 6.5c0-1.7 1.6-3 3.5-3s3.5 1.3 3.5 3v3h-7z" />
      <path d="M10 12.5h4M10.4 15.5h3.2M11 18.5h2" />
    </template>
    <template v-else-if="name === 'sparkle'">
      <path d="M11 3.5l1.5 4.4 4.4 1.6-4.4 1.6L11 15.5l-1.5-4.4L5 9.5l4.5-1.6z" />
      <path d="M17.5 14.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
    </template>
    <template v-else-if="name === 'smile'">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.6 13.5c1.2 1.7 5.6 1.7 6.8 0" />
      <path d="M9 9.5h.01M15 9.5h.01" />
    </template>
    <template v-else-if="name === 'child'">
      <circle cx="12" cy="7" r="3.2" />
      <path d="M5.5 20.5c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" />
      <path d="M10.3 6.6h.01M13.7 6.6h.01" />
    </template>
    <circle v-else cx="12" cy="12" r="8.5" />
  </svg>
</template>

<script setup>
defineProps({
  name: { type: String, default: 'tooth' },
})
</script>
