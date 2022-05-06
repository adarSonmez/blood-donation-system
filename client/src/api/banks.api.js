import axios from 'axios';

const url = 'http://localhost:8000/banks';

const getBanks = () => axios.get(url);
const getNumOfTotalAvailableBlood = () => axios.get(url + '/total-available');
const getTotalDonatedBlood = () => axios.get(url + '/total-donated-blood');
const getLeastAvailableBloodType = () => axios.get(url + '/least-available-blood-type');
const getMostAvailableBloodType = () => axios.get(url + '/most-available-blood-type');

export {
  getBanks,
  getTotalDonatedBlood,
  getNumOfTotalAvailableBlood,
  getLeastAvailableBloodType,
  getMostAvailableBloodType,
}