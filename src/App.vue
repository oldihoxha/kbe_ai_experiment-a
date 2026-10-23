<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import BaseButton from './components/BaseButton.vue'
import ProfileHeader from './components/ProfileHeader.vue'
import ProfileSection from './components/ProfileSection.vue'
import ToastMessage from './components/ToastMessage.vue'
import { useProfile } from './composables/useProfile'
import { profileSections } from './data/profileSections'

const { saved, draft, errors, editing, isDirty, fullName, initials, startEdit, cancel, save, reset } = useProfile()

const toast = ref({ message: '', type: 'success' as 'success' | 'error' })
let toastTimer: ReturnType<typeof setTimeout> | undefined

function notify(message: string, type: 'success' | 'error' = 'success') {
  toast.value = { message, type }
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toast.value.message = ''), 3000)
}
onBeforeUnmount(() => clearTimeout(toastTimer))

function onSave() {
  if (save()) notify('Profil gespeichert')
  else notify('Bitte korrigieren Sie die markierten Felder', 'error')
}

function onReset() {
  if (confirm('Profil auf die Beispieldaten zurücksetzen?')) {
    reset()
    notify('Beispieldaten wiederhergestellt')
  }
}

const shown = computed(() => (editing.value ? draft : saved.value))
const subtitle = computed(() => `${saved.value.program} · ${saved.value.degree} · ${saved.value.semester}. Semester`)

function onUpdate(key: keyof typeof draft, value: string | number) {
  ;(draft as Record<string, string | number>)[key] = value
}
</script>

<template>
  <div class="page">
    <nav class="topbar">
      <strong>🏛️ Hochschulportal Musterstadt</strong>
      <span>Studierendenbereich</span>
    </nav>

    <main>
      <ProfileHeader
        :initials="initials"
        :name="fullName"
        :subtitle="subtitle"
        :matriculation-number="saved.matriculationNumber"
      >
        <BaseButton v-if="!editing" @click="startEdit">Profil bearbeiten</BaseButton>
      </ProfileHeader>

      <form class="sections" novalidate @submit.prevent="onSave">
        <ProfileSection
          v-for="section in profileSections"
          :key="section.id"
          :section="section"
          :profile="shown"
          :editing="editing"
          :errors="errors"
          @update="onUpdate"
        />

        <div v-if="editing" class="bar">
          <span v-if="isDirty" class="hint">Ungespeicherte Änderungen</span>
          <BaseButton variant="secondary" @click="cancel">Abbrechen</BaseButton>
          <BaseButton type="submit">Speichern</BaseButton>
        </div>
      </form>

      <footer>
        <BaseButton variant="ghost" :disabled="editing" @click="onReset">Auf Beispieldaten zurücksetzen</BaseButton>
      </footer>
    </main>

    <ToastMessage :message="toast.message" :type="toast.type" />
  </div>
</template>

<style scoped>
.topbar {
  display: flex; justify-content: space-between; align-items: center; gap: 1rem;
  padding: 0.9rem clamp(1rem, 4vw, 2.5rem);
  background: var(--color-surface); border-bottom: 1px solid var(--color-border);
}
.topbar span { color: var(--color-muted); font-size: 0.9rem; }
main { max-width: 52rem; margin: 0 auto; padding: 1.5rem 1rem 3rem; display: flex; flex-direction: column; gap: 1.5rem; }
.sections { display: flex; flex-direction: column; gap: 1.5rem; }
.bar {
  position: sticky; bottom: 1rem; display: flex; justify-content: flex-end; align-items: center; gap: 0.75rem;
  padding: 0.85rem 1.1rem; background: var(--color-surface); border: 1px solid var(--color-border);
  border-radius: var(--radius); box-shadow: var(--shadow-lg);
}
.hint { margin-right: auto; color: var(--color-muted); font-size: 0.9rem; }
footer { text-align: center; }
</style>
