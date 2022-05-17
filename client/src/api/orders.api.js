import axios from 'axios';

const url = 'http://localhost:8000/orders';

const orderBlood = (data) => axios.post(url + '/order-blood', data);

export { orderBlood };
