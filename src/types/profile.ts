export interface StudentProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  street: string
  zip: string
  city: string
  matriculationNumber: string
  program: string
  degree: string
  semester: number
  enrollmentDate: string
}

export type ProfileErrors = Partial<Record<keyof StudentProfile, string>>

export type FieldType = 'text' | 'email' | 'tel' | 'number' | 'date' | 'select'

export interface FieldConfig {
  key: keyof StudentProfile
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  options?: string[]
  /** Spans the full width of the grid */
  wide?: boolean
}

export interface SectionConfig {
  id: string
  title: string
  description: string
  icon: string
  fields: FieldConfig[]
}
