const Donation = {
  insertDonor: `
    INSERT INTO donor
    (donor_id, name, blood_type, recep_id)
    VALUES (?,?,?,?)
  `,

  insertBlood: `
    INSERT INTO blood
    (donor_id, bank_id)
    VALUES (?,?)
  `,

  selectDonor: `
    SELECT donor_id, name, blood_type from donor
    WHERE donor_id = (?) 
  `,
}

module.exports = Donation
