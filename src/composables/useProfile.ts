import { computed, reactive, ref } from 'vue'
import type { ProfileErrors, StudentProfile } from '../types/profile'
import { sampleProfile } from '../data/sampleProfile'
import { validateProfile } from '../utils/validation'

const STORAGE_KEY = 'student-portal:profile'

function load(): StudentProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...sampleProfile, ...JSON.parse(raw) }
  } catch {
    /* corrupt or unavailable storage: fall back to sample data */
  }
  return { ...sampleProfile }
}

function persist(profile: StudentProfile): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    return true
  } catch {
    return false
  }
}

export function useProfile() {
  const saved = ref<StudentProfile>(load())
  const draft = reactive<StudentProfile>({ ...saved.value })
  const errors = ref<ProfileErrors>({})
  const editing = ref(false)

  const isDirty = computed(() => JSON.stringify(draft) !== JSON.stringify(saved.value))
  const fullName = computed(() => `${saved.value.firstName} ${saved.value.lastName}`.trim())
  const initials = computed(
    () => `${saved.value.firstName.charAt(0)}${saved.value.lastName.charAt(0)}`.toUpperCase(),
  )

  function startEdit() {
    Object.assign(draft, saved.value)
    errors.value = {}
    editing.value = true
  }

  function cancel() {
    Object.assign(draft, saved.value)
    errors.value = {}
    editing.value = false
  }

  /** Returns true when the profile was valid and stored. */
  function save(): boolean {
    errors.value = validateProfile(draft)
    if (Object.keys(errors.value).length) return false
    const next = { ...draft, semester: Number(draft.semester) }
    if (!persist(next)) return false
    saved.value = next
    editing.value = false
    return true
  }

  function reset() {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
    saved.value = { ...sampleProfile }
    cancel()
  }

  return { saved, draft, errors, editing, isDirty, fullName, initials, startEdit, cancel, save, reset }
}
