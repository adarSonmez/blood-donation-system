import axios from 'axios'

const url = 'http://localhost:8000/donations'

const postDonation = (data: object) => axios.post(url, data)
const checkDonor = (data: object) => axios.post(url + '/check-donor', data)

export { postDonation, checkDonor }
