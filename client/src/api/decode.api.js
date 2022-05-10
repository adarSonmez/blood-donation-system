import axios from 'axios';

const url = 'http://localhost:8000/decode';

const decode = (token) => axios.post(url, token);

export { decode };
