import axios from 'axios'
import { BloodType, ResponseMessage } from '../utils/common.types'

const url = 'http://localhost:8000/orders'

export type OrderBloodRequest = {
  blood_type: BloodType
  amount: number
  hospital_id: string
  man_id: string
}

export type OrderState = 'approved' | 'rejected' | 'waiting'

export type UpdateOrderRequest = {
  order_id: string
  state: OrderState
}

export type OrderForManagerResponse = {
  order_id: string
  order_date: string
  blood_type: BloodType
  amount: number
  full_name: string
}

export interface OrderForHospitalResponse extends UpdateOrderRequest {
  order_date: string
  amount: number
  hospital_id: string
  man_id: string
}

export const orderBlood = (data: OrderBloodRequest) =>
  axios.post<ResponseMessage>(url + '/order-blood', data)

export const deleteOrder = (id: string) =>
  axios.delete<ResponseMessage>(url + `?order_id=${id}`)

export const updateOrderState = (data: UpdateOrderRequest) =>
  axios.put<ResponseMessage>(url, data)

export const getOrdersByHospitalId = (id: string) =>
  axios.get<OrderForHospitalResponse[]>(url + `?hospital_id=${id}`)

export const getOrdersForAManager = (id: string) =>
  axios.get<OrderForManagerResponse[]>(url + `?man_id=${id}`)
