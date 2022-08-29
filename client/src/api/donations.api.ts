import axios from 'axios'
import { BloodType, ResponseMessage } from '../utils/common.types'

const url = 'http://localhost:8000/donations'

export type Donor = {
  donor_id: string
  name: string
  blood_type: BloodType
}

export interface DonationRequest extends Donor {
  recep_id: string
  bank_id: string
}

export type CheckDonorResponse = {
  registered: boolean
  donor: Donor | null
}

export const postDonation = (data: DonationRequest) =>
  axios.post<ResponseMessage>(url, data)

export const checkDonor = (id: string) =>
  axios.get<CheckDonorResponse>(url + `/check/?donor_id=${id}`)
