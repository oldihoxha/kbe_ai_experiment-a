import type { SectionConfig } from '../types/profile'

export const degrees = ['Bachelor of Science', 'Bachelor of Arts', 'Master of Science', 'Master of Arts']

export const profileSections: SectionConfig[] = [
  {
    id: 'personal',
    title: 'Persönliche Angaben',
    description: 'Kontaktdaten und Anschrift',
    icon: '👤',
    fields: [
      { key: 'firstName', label: 'Vorname', type: 'text', required: true },
      { key: 'lastName', label: 'Nachname', type: 'text', required: true },
      { key: 'email', label: 'E-Mail', type: 'email', required: true, wide: true },
      { key: 'phone', label: 'Telefon', type: 'tel', placeholder: '+49 …', wide: true },
      { key: 'street', label: 'Straße und Hausnummer', type: 'text', required: true, wide: true },
      { key: 'zip', label: 'PLZ', type: 'text', required: true },
      { key: 'city', label: 'Ort', type: 'text', required: true },
    ],
  },
  {
    id: 'study',
    title: 'Studium',
    description: 'Angaben zu Ihrem Studiengang',
    icon: '🎓',
    fields: [
      { key: 'matriculationNumber', label: 'Matrikelnummer', type: 'text', required: true },
      { key: 'enrollmentDate', label: 'Immatrikuliert seit', type: 'date', required: true },
      { key: 'program', label: 'Studiengang', type: 'text', required: true, wide: true },
      { key: 'degree', label: 'Abschluss', type: 'select', options: degrees, required: true },
      { key: 'semester', label: 'Fachsemester', type: 'number', required: true },
    ],
  },
]
