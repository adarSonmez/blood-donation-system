const db = require('../config/db.config');
const Donation = require('../models/donations.model');

function donation(req, res) {
  const { donor_id, name, blood_type, recep_id, bank_id } = req.body;

  const insDonor = Donation.insertDonor;
  const insBlood = Donation.insertBlood;

  // TO DO: what if donor is already registered

  db.query(insDonor, [donor_id, name, blood_type, recep_id], (err, data) => {
    if (err) throw err;
    db.query(insBlood, [donor_id, bank_id], (err, data) => {
      if (err) throw err;
      res.json({
        message: 'blood donation successful',
      });
    });
  });
}

module.exports = {
  donation,
};
