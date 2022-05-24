import axios from 'axios';

const url = 'http://localhost:8000/users';

const login = (user) => axios.post(url + '/login', user);
const register = (user) => axios.post(url + '/register', user);
const decode = (token) => axios.post(url + '/decode', token);
const getRandomManagerId = () => axios.get(url + '/random-manager-id');
const getUserByEmail = (email) => axios.get(url + `?e_mail=${email}`);
const updateUser = (data) => axios.put(url, data);

export {
  login,
  register,
  decode,
  getRandomManagerId,
  getUserByEmail,
  updateUser,
};
