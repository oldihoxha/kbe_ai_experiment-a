<script setup lang="ts">
withDefaults(
  defineProps<{ variant?: 'primary' | 'secondary' | 'ghost'; type?: 'button' | 'submit'; disabled?: boolean }>(),
  { variant: 'primary', type: 'button', disabled: false },
)
</script>

<template>
  <button :type="type" :disabled="disabled" class="btn" :class="`btn--${variant}`">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  font: inherit;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 0.15s, box-shadow 0.15s, transform 0.05s;
}
.btn:active:not(:disabled) { transform: translateY(1px); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn:focus-visible { outline: 3px solid var(--color-focus); outline-offset: 2px; }
.btn--primary { background: var(--color-primary); color: #fff; }
.btn--primary:hover:not(:disabled) { background: var(--color-primary-dark); }
.btn--secondary { background: var(--color-surface); color: var(--color-text); border-color: var(--color-border); }
.btn--secondary:hover:not(:disabled) { background: var(--color-bg); }
.btn--ghost { background: transparent; color: var(--color-muted); }
.btn--ghost:hover:not(:disabled) { color: var(--color-danger); }
</style>
