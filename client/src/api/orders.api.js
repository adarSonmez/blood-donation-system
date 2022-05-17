import axios from 'axios';

const url = 'http://localhost:8000/orders';

const orderBlood = (data) => axios.post(url + '/order-blood', data);
const deleteOrder = (data) => axios.post(url + '/delete', data);
const getOrdersByHospitalId = (data) =>
  axios.post(url + '/orders-by-hospital-id', data);

export { orderBlood, getOrdersByHospitalId, deleteOrder };
