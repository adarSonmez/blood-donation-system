const Bank = {
  totalDonatedBlood: `
  SELECT COUNT(*) as total_donated_blood FROM blood
  `,

  leastAvailableBloodType: `
  SELECT donor.blood_type, COUNT(blood.blood_id) AS num_of_blood
  FROM donor LEFT JOIN blood 
  ON donor.donor_id = blood.donor_id 
  WHERE expires_in <> 0 
  GROUP BY blood_type
  ORDER BY num_of_blood ASC
  LIMIT 1
  `,

  mostAvailableBloodType: `
  SELECT donor.blood_type, COUNT(blood.blood_id) AS num_of_blood
  FROM donor LEFT JOIN blood 
  ON donor.donor_id = blood.donor_id 
  WHERE expires_in <> 0 
  GROUP BY blood_type
  ORDER BY num_of_blood DESC
  LIMIT 1
  `,
};

module.exports = Bank;