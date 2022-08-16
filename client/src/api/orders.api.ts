import axios from 'axios'

const url = 'http://localhost:8000/orders'

const orderBlood = (data: object) => axios.post(url + '/order-blood', data)
const deleteOrder = (id: number) => axios.delete(url + `?order_id=${id}`)
const updateOrderState = (data: object) => axios.put(url, data)
const getOrdersByHospitalId = (id: number) => axios.get(url + `?hospital_id=${id}`)
const getOrdersForAManager = (id: number) => axios.get(url + `?man_id=${id}`)

export {
  orderBlood,
  getOrdersByHospitalId,
  getOrdersForAManager,
  deleteOrder,
  updateOrderState,
}
