<script setup lang="ts">
defineProps<{ message: string; type?: 'success' | 'error' }>()
</script>

<template>
  <Transition name="toast">
    <div v-if="message" class="toast" :class="`toast--${type ?? 'success'}`" role="status">{{ message }}</div>
  </Transition>
</template>

<style scoped>
.toast {
  position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%);
  padding: 0.75rem 1.25rem; border-radius: var(--radius-sm); color: #fff; font-weight: 600;
  box-shadow: var(--shadow-lg); z-index: 10;
}
.toast--success { background: var(--color-success); }
.toast--error { background: var(--color-danger); }
.toast-enter-active, .toast-leave-active { transition: opacity 0.25s, transform 0.25s; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translate(-50%, 12px); }
</style>
