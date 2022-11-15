const db = require('../config/db.config')
const Donation = require('../models/donations.model')

function checkDonorId(req, res) {
  const { donor_id } = req.query
  const sql = Donation.selectDonor

  db.query(sql, [donor_id], (err, data) => {
    if (err) return res.json({ error: true, success: false, message: err.message })
    if (!data[0]) return res.json({ registered: false, donor: null })

    res.json({ registered: true, donor: data[0] })
  })
}

function donation(req, res) {
  const { donor_id, name, blood_type, recep_id, bank_id } = req.body

  const searchDonor = Donation.selectDonor
  const insDonor = Donation.insertDonor
  const insBlood = Donation.insertBlood

  db.query(searchDonor, [donor_id], (err, data) => {
    if (err) return res.json({ error: true, success: false, message: err.message })
    if (!data[0])
      db.query(
        insDonor,
        [donor_id, name, blood_type, recep_id],
        (err, data) => {
          if (err) return res.json({ error: true, success: false, message: err.message })

          db.query(insBlood, [donor_id, bank_id], (err, data) => {
            if (err) return res.json({ error: true, success: false, message: err.message })

            res.json({ success: true, message: 'Successfully donated!' })
          })
        }
      )
    else
      db.query(insBlood, [donor_id, bank_id], (err, data) => {
        if (err) return res.json({ error: true, success: false, message: err.message })

        res.json({ success: true, message: 'Successfully donated!' })
      })
  })
}

module.exports = {
  donation,
  checkDonorId,
}
