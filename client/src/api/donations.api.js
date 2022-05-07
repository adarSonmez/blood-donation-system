import axios from 'axios';

const url = 'http://localhost:8000/donations';

const postDonation = (data) => axios.post(url, data);
const checkDonor = (data) => axios.post(url + '/check-donor', data);

export { postDonation, checkDonor };
