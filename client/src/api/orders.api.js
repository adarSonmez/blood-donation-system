import axios from 'axios';

const url = 'http://localhost:8000/orders';

const orderBlood = (data) => axios.post(url + '/order-blood', data);
const deleteOrder = (id) => axios.delete(url + `?order_id=${id}`);
const updateOrderState = (id, data) => axios.put(url + `?order_id=${id}`, data);
const getOrdersByHospitalId = (id) => axios.get(url + `?hospital_id=${id}`);
const getOrdersForAManager = (id) => axios.get(url + `?man_id=${id}`);

export {
  orderBlood,
  getOrdersByHospitalId,
  getOrdersForAManager,
  deleteOrder,
  updateOrderState,
};
