import axios from 'axios';

const url = 'http://localhost:8000/users';

const login = (user) => axios.post(url + '/login', user);
const register = (user) => axios.post(url + '/register', user);
const decode = (token) => axios.post(url + '/decode', token);
const getRandomManagerId = () => axios.get(url + '/random-manager-id');

export { login, register, decode, getRandomManagerId };
