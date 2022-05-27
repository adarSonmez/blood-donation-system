import axios from 'axios';

const url = 'http://localhost:8000/users';

const login = (user) => axios.post(url + '/login', user);
const register = (user) => axios.post(url + '/register', user);
const decode = (token) => axios.post(url + '/decode', token);
const getRandomManager = () => axios.get(url + '/random-manager');
const getUserByEmail = (email) => axios.get(url + `?e_mail=${email}`);
const updateUser = (data) => axios.put(url, data);
const deleteUserById = (id) => axios.delete(url + `?user_id=${id}`);

export {
  login,
  register,
  decode,
  getRandomManager,
  getUserByEmail,
  updateUser,
  deleteUserById,
};
