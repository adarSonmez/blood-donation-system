import axios from 'axios'
import { ResponseMessage } from '../utils/common.types'

const url = 'http://localhost:8000/users'

export type SystemUserType = 'receptionist' | 'hospital' | 'system_manager'

export type SystemUser = {
  user_id: string
  full_name: string
  e_mail: string
  phone: string
  address: string
  user_type: SystemUserType | ''
  password: string
}

export type RandomManager = {
  user_id: string
  e_mail: string
}

export type LoginRequest = {
  e_mail: string
  password: string
}

export interface LoginResponse extends ResponseMessage {
  token: string
}

export interface RegisterRequest extends LoginRequest {
  full_name: string
  phone: string
  address: string
  user_type: SystemUserType
}

export type DecodeRequest = {
  token: string | null
}

export type UpdateUserRequest = {
  password: string
  phone: string
  address: string
  e_mail: string
}

export interface DecodeTokenResponse extends ResponseMessage {
  user: {
    e_mail: string
    user_type: SystemUserType
  }
}

export const login = (user: LoginRequest) =>
  axios.post<LoginResponse>(url + '/login', user)

export const register = (user: RegisterRequest) =>
  axios.post<ResponseMessage>(url + '/register', user)

export const decode = (data: DecodeRequest) =>
  axios.post<DecodeTokenResponse>(url + '/decode', data)

export const getUserByEmail = (email: string) =>
  axios.get<SystemUser>(url + `?e_mail=${email}`)

export const updateUser = (data: UpdateUserRequest) =>
  axios.put<ResponseMessage>(url, data)

export const deleteUserById = (id: string) =>
  axios.delete<ResponseMessage>(url + `?user_id=${id}`)

export const getRandomManager = () =>
  axios.get<RandomManager>(url + '/random-manager')
