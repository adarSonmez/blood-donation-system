import axios from 'axios';

const url = 'http://localhost:8000/tops';

const getTopTenReceptionists = () => axios.get(url + '/top-ten-receptionists');
const getTopTenHospitals = () => axios.get(url + '/top-ten-hospitals');
const getTopTenDonors = () => axios.get(url + '/top-ten-donors');

export { getTopTenDonors, getTopTenHospitals, getTopTenReceptionists };
