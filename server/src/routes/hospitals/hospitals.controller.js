const hospitals = require('../../models/hospitals.model');

function getAllHospitals(req, res) {
  return res.status(200).json(hospitals);
}

module.exports = {
  getAllHospitals,
};
