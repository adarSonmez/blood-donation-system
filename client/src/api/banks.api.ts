import axios from 'axios'
import { BloodType } from '../components/blood-types-table/BloodTypesTable'

const url = 'http://localhost:8000/banks'

export type Bank = {
  bank_id: number
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

export const getLeastAvailableBloodType = () =>
  axios.get<AmountOfBloodTypeResponse>(url + '/least-available-blood-type')

export const getMostAvailableBloodType = () =>
  axios.get<AmountOfBloodTypeResponse>(url + '/most-available-blood-type')

export const getAllAvailableBloodTypes = () =>
  axios.get<AmountOfBloodTypeResponse[]>(url + '/all-available-blood-types')
