import axios from 'axios'

const url = 'http://localhost:8000/users'

const login = (user: object) => axios.post(url + '/login', user)
const register = (user: object) => axios.post(url + '/register', user)
const decode = (token: object) => axios.post(url + '/decode', token)
const getUserByEmail = (email: string) => axios.get(url + `?e_mail=${email}`)
const updateUser = (data: object) => axios.put(url, data)
const deleteUserById = (id: number) => axios.delete(url + `?user_id=${id}`)

const getRandomManager = () => axios.get(url + '/random-manager')

export {
  login,
  register,
  decode,
  getRandomManager,
  getUserByEmail,
  updateUser,
  deleteUserById,
}
