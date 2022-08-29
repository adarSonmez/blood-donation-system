import axios from 'axios'
import { BloodType } from '../utils/common.types'

const url = 'http://localhost:8000/banks'

export type Bank = {
  bank_id: string
  manager: string
  address: string
  capacity: number
  size: number
}

export type TotalDonatedResponse = {
  total_donated_blood: number
}

export type TotalAvailableResponse = {
  total_available: number
}

export type AmountOfBloodTypeResponse = {
  blood_type: BloodType
  num_of_blood: number
}

export const getBanks = () => axios.get<Bank[]>(url)

export const getNumOfTotalAvailableBlood = () =>
  axios.get<TotalAvailableResponse>(url + '/total-available')

export const getTotalDonatedBlood = () =>
  axios.get<TotalDonatedResponse>(url + '/total-donated-blood')

export const getAllBloodTypes = () =>
  axios.get<AmountOfBloodTypeResponse[]>(url + '/all-blood-types')
