<script setup lang="ts">
defineProps<{ label: string; value: string }>()
</script>

<template>
  <div class="info">
    <dt>{{ label }}</dt>
    <dd>{{ value }}</dd>
  </div>
</template>

<style scoped>
.info { display: flex; flex-direction: column; gap: 0.2rem; }
dt { font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: var(--color-muted); }
dd { margin: 0; font-size: 1.05rem; word-break: break-word; }
</style>
