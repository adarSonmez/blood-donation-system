const Top = {
  selectTopTenReceptionists: `
    SELECT sys_user.user_id, sys_user.full_name, 
    COUNT(donor.recep_id) AS num_of_registration
    FROM sys_user RIGHT JOIN donor 
    ON sys_user.user_id = donor.recep_id 
    GROUP BY full_name
    ORDER BY num_of_registration DESC
    LIMIT 10
  `,

  selectTopTenHospitals: `
    SELECT sys_user.user_id, sys_user.full_name, 
    COUNT(orders.order_id) AS num_of_orders, 
    SUM(orders.amount) AS amount_of_blood
    FROM sys_user RIGHT JOIN orders 
    ON sys_user.user_id = orders.hospital_id 
    WHERE orders.state = "approved"
    GROUP BY full_name
    ORDER BY amount_of_blood DESC
    LIMIT 10
  `,

  selectTopTenDonors: `
    SELECT donor.donor_id, donor.name, COUNT(blood.blood_id) AS num_of_blood
    FROM donor LEFT JOIN blood 
    ON donor.donor_id = blood.donor_id 
    GROUP BY donor_id
    ORDER BY num_of_blood DESC
    LIMIT 10
  `,
}

module.exports = Top
