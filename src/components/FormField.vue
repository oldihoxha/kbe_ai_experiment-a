<script setup lang="ts">
import { computed, useId } from 'vue'
import type { FieldConfig } from '../types/profile'

const props = defineProps<{ field: FieldConfig; modelValue: string | number; error?: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string | number] }>()

const id = useId()
const errorId = computed(() => `${id}-error`)

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', props.field.type === 'number' ? target.valueAsNumber || 0 : target.value)
}
</script>

<template>
  <div class="field" :class="{ 'field--error': error }">
    <label :for="id">
      {{ field.label }}<span v-if="field.required" class="req" aria-hidden="true"> *</span>
    </label>
    <select v-if="field.type === 'select'" :id="id" :value="modelValue" :aria-invalid="!!error" @change="onInput">
      <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
    </select>
    <input
      v-else
      :id="id"
      :type="field.type"
      :value="modelValue"
      :placeholder="field.placeholder"
      :min="field.type === 'number' ? 1 : undefined"
      :aria-invalid="!!error"
      :aria-describedby="error ? errorId : undefined"
      @input="onInput"
    />
    <p v-if="error" :id="errorId" class="error" role="alert">{{ error }}</p>
  </div>
</template>

<style scoped>
.field { display: flex; flex-direction: column; gap: 0.35rem; }
label { font-size: 0.85rem; font-weight: 600; color: var(--color-muted); }
.req { color: var(--color-danger); }
input, select {
  font: inherit;
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text);
  transition: border-color 0.15s, box-shadow 0.15s;
}
input:focus, select:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-focus); }
.field--error input, .field--error select { border-color: var(--color-danger); }
.error { margin: 0; font-size: 0.8rem; color: var(--color-danger); }
</style>
