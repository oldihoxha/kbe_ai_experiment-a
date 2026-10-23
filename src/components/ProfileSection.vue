<script setup lang="ts">
import FormField from './FormField.vue'
import InfoItem from './InfoItem.vue'
import type { ProfileErrors, SectionConfig, StudentProfile } from '../types/profile'
import { formatFieldValue } from '../utils/validation'

defineProps<{
  section: SectionConfig
  profile: StudentProfile
  editing: boolean
  errors: ProfileErrors
}>()
const emit = defineEmits<{ update: [key: keyof StudentProfile, value: string | number] }>()
</script>

<template>
  <section class="card" :aria-labelledby="`${section.id}-title`">
    <header>
      <span class="icon" aria-hidden="true">{{ section.icon }}</span>
      <div>
        <h2 :id="`${section.id}-title`">{{ section.title }}</h2>
        <p>{{ section.description }}</p>
      </div>
    </header>
    <component :is="editing ? 'div' : 'dl'" class="grid">
      <template v-for="field in section.fields" :key="field.key">
        <div :class="{ wide: field.wide }">
          <FormField
            v-if="editing"
            :field="field"
            :model-value="profile[field.key]"
            :error="errors[field.key]"
            @update:model-value="emit('update', field.key, $event)"
          />
          <InfoItem v-else :label="field.label" :value="formatFieldValue(profile[field.key], field.type)" />
        </div>
      </template>
    </component>
  </section>
</template>

<style scoped>
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1.5rem;
}
header { display: flex; gap: 0.9rem; align-items: center; margin-bottom: 1.25rem; }
.icon { display: grid; place-items: center; width: 2.6rem; height: 2.6rem; border-radius: 12px; background: var(--color-primary-soft); font-size: 1.3rem; }
h2 { margin: 0; font-size: 1.15rem; }
header p { margin: 0; font-size: 0.85rem; color: var(--color-muted); }
.grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.1rem 1.5rem; margin: 0; }
.wide { grid-column: 1 / -1; }
@media (max-width: 560px) {
  .grid { grid-template-columns: 1fr; }
}
</style>
