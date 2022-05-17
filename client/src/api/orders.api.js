import axios from 'axios';

const url = 'http://localhost:8000/orders';

const orderBlood = (data) => axios.post(url + '/order-blood', data);
const deleteOrder = (id) => axios.delete(url + `?order_id=${id}`);
const getOrdersByHospitalId = (id) => axios.get(url + `?hospital_id=${id}`);

export { orderBlood, getOrdersByHospitalId, deleteOrder };
