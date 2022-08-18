export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | '0+' | '0-'

export type ResponseMessage = {
  success: boolean
  message: string
  error?: boolean
}
