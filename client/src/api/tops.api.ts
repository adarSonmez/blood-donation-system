import axios from 'axios'

const url = 'http://localhost:8000/tops'

export type TopReceptionistResponse = {
  user_id: string
  full_name: string
  num_of_registration: number
}

export type TopHospitalResponse = {
  user_id: string
  full_name: string
  num_of_orders: number
  amount_of_blood: number
}

export type TopDonorResponse = {
  donor_id: string
  name: string
  num_of_blood: number
}

export const getTopTenReceptionists = () =>
  axios.get<TopReceptionistResponse[]>(url + '/top-ten-receptionists')

export const getTopTenHospitals = () =>
  axios.get<TopHospitalResponse[]>(url + '/top-ten-hospitals')

export const getTopTenDonors = () =>
  axios.get<TopDonorResponse[]>(url + '/top-ten-donors')
