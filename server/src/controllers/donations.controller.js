const db = require('../config/db.config');
const Donation = require('../models/donations.model');

function checkDonorId(req, res) {
  const { donor_id } = req.body;
  const sql = Donation.selectDonor;

  db.query(sql, [donor_id], (err, data) => {
    if (err) throw err;

    if (!data[0]) return res.json({ message: 'Donor is not registered!' });

    res.json({ donor: data[0] });
  });
}

function donation(req, res) {
  const { donor_id, name, blood_type, recep_id, bank_id } = req.body;

  const searchDonor = Donation.selectDonor;
  const insDonor = Donation.insertDonor;
  const insBlood = Donation.insertBlood;

  db.query(searchDonor, [donor_id], (err, data) => {
    if (err) throw err;
    if (!data[0])
      db.query(
        insDonor,
        [donor_id, name, blood_type, recep_id],
        (err, data) => {
          if (err) throw err;

          db.query(insBlood, [donor_id, bank_id], (err, data) => {
            if (err) throw err;

            res.json({ success: true });
          });
        }
      );
    else
      db.query(insBlood, [donor_id, bank_id], (err, data) => {
        if (err) throw err;

        res.json({ success: true });
      });
  });
}

module.exports = {
  donation,
  checkDonorId,
};
