const Bank = {
  selectBanks: `
    SELECT blood_bank.bank_id, sys_user.full_name AS manager,
    blood_bank.address, blood_bank.capacity, COUNT(blood_id) AS size
    FROM blood_bank LEFT JOIN sys_user 
    ON blood_bank.man_id = sys_user.user_id
    RIGHT JOIN blood ON blood.bank_id = blood_bank.bank_id
    GROUP BY bank_id
  `,

  selectTotalDonatedBlood: `
    SELECT COUNT(*) as total_donated_blood FROM blood
  `,

  selectNumAvailableBlood: `
    SELECT COUNT(*) as total_available FROM blood
    WHERE donated_date > (SELECT DATE_SUB(CURRENT_DATE(), INTERVAL 4500 DAY))
    AND used = 0
  `,

  selectAvailableBloodTypes: `
    SELECT donor.blood_type, COUNT(blood.blood_id) AS num_of_blood
    FROM donor LEFT JOIN blood 
    ON donor.donor_id = blood.donor_id 
    WHERE donated_date > (SELECT DATE_SUB(CURRENT_DATE(), INTERVAL 4500 DAY))
    AND used = 0
    GROUP BY blood_type
    ORDER BY num_of_blood DESC
  `,
}

module.exports = Bank
