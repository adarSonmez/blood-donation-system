import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBanks } from '../../api/banks.api';
import { checkDonor, postDonation } from '../../api/donations.api';

import './Donation.css';

function Donation({ user }) {
  const navigate = useNavigate();
  const [locked, setLocked] = useState(true);
  const [form1, setFrom1] = useState({ donor_id: '' });
  const [form2, setForm2] = useState({
    name: '',
    blood_type: '0-',
    bank_id: '',
  });
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    getBanks()
      .then((r) => {
        setBanks(
          r.data.map((bank) =>
            bank.size < bank.capacity
              ? { bank_id: bank.bank_id, address: bank.address }
              : null
          )
        );
      })
      .catch((err) => console.error(err));
  }, []);

  // Handles change for any input field
  const handleChange = (event, formNo) => {
    let name = event.target.name;
    let value = event.target.value;

    if (formNo === 1)
      setFrom1({
        ...form1,
        [name]: value,
      });
    else if (formNo === 2)
      setForm2({
        ...form2,
        [name]: value,
      });
  };

  const searchSSN = (event) => {
    event.preventDefault();

    checkDonor({ donor_id: form1.donor_id }).then((r) => {
      if (!r.data.donor) {
        alert(
          `Donor with id ${form1.donor_id} is not registered. Please fill bla bla bla.`
        );
        setForm2({
          name: '',
          blood_type: '0-',
          bank_id: '',
        });
        setLocked(false);
      } else {
        setLocked(true);
        setForm2({
          name: r.data.donor.name,
          blood_type: r.data.donor.blood_type,
        });
      }
    });
  };

  const donateBlood = () => {
    postDonation({ ...form2, ...form1, recep_id: user.id })
      .then(() => alert('Successfully donated!'))
      .catch((err) => console.error(err.message));
  };

  return (
    <main className="donation-page">
      <form className="check-donor-form" onSubmit={searchSSN}>
        <input
          type="text"
          maxLength={11}
          minLength={11}
          name="donor_id"
          placeholder="Enter SSN of donor"
          value={form1.donor_id}
          onChange={(e) => handleChange(e, 1)}
          required
        />
        <button type="submit">Search</button>
      </form>

      <form className="donate-blood-form" onSubmit={donateBlood}>
        <label form="ssn">SSN: </label>
        <input
          type="text"
          maxLength={11}
          minLength={11}
          name="donor_id"
          placeholder="Enter SSN of donor"
          value={form1.donor_id}
          disabled={true}
          required
          id="ssn"
        />

        <label form="full-name">Full Name: </label>
        <input
          type="text"
          name="name"
          placeholder="Enter full name of donor"
          value={form2.name}
          onChange={(e) => handleChange(e, 2)}
          disabled={locked}
          required
          id="full-name"
        />

        <label form="blood-type">Blood Type: </label>
        <select
          name="blood_type"
          selected={form2.blood_type}
          value={form2.blood_type}
          onChange={(e) => handleChange(e, 2)}
          disabled={locked}
          id="blood_type"
          required
        >
          <option value={'0-'}>0-</option>
          <option value={'0+'}>0+</option>
          <option value={'A-'}>A-</option>
          <option value={'A+'}>A+</option>
          <option value={'B-'}>B-</option>
          <option value={'B+'}>B+</option>
          <option value={'AB-'}>AB-</option>
          <option value={'AB+'}>AB+</option>
        </select>

        <label form="bank-address">Bank Address: </label>
        <select
          name="bank_id"
          selected={form2.bank_id}
          onChange={(e) => handleChange(e, 2)}
          required
          id="bank-address"
        >
          {banks.map(({ bank_id, address }) => (
            <option key={bank_id} value={bank_id}>
              {address}
            </option>
          ))}
        </select>

        <button className="donate-btn" type="submit" disabled={locked}>
          Donate (500ml)
        </button>
      </form>
    </main>
  );
}

export default Donation;