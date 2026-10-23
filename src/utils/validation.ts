import type { ProfileErrors, StudentProfile } from '../types/profile'
import { profileSections } from '../data/profileSections'

const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  phone: /^\+?[0-9 ()/-]{6,20}$/,
  zip: /^\d{5}$/,
  matriculationNumber: /^\d{6,8}$/,
}

export function validateProfile(profile: StudentProfile): ProfileErrors {
  const errors: ProfileErrors = {}

  for (const field of profileSections.flatMap((s) => s.fields)) {
    const value = String(profile[field.key] ?? '').trim()
    if (field.required && !value) errors[field.key] = 'Pflichtfeld'
  }

  if (!errors.email && !patterns.email.test(profile.email)) errors.email = 'Ungültige E-Mail-Adresse'
  if (profile.phone && !patterns.phone.test(profile.phone)) errors.phone = 'Ungültige Telefonnummer'
  if (!errors.zip && !patterns.zip.test(profile.zip)) errors.zip = '5 Ziffern erforderlich'
  if (!errors.matriculationNumber && !patterns.matriculationNumber.test(profile.matriculationNumber))
    errors.matriculationNumber = '6–8 Ziffern erforderlich'
  if (!errors.semester && (!Number.isInteger(profile.semester) || profile.semester < 1 || profile.semester > 20))
    errors.semester = 'Zahl zwischen 1 und 20'

  return errors
}

export function formatFieldValue(value: string | number, type: string): string {
  if (value === '' || value === undefined) return '–'
  if (type === 'date') return new Date(String(value)).toLocaleDateString('de-DE')
  return String(value)
}
