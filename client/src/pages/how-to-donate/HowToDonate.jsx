import { useState, useEffect } from 'react';
import { getBanks } from '../../api/banks.api';

import './HowToDonate.css';

function HowToDonate() {
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    getBanks()
      .then((r) => {setBanks(r.data)})
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <main className="how-to-donate-page">
      <h2>How to Donate</h2>
      <p>
        You can visit one of our listed blood banks at any time and donate
        blood.
        <i className="bi bi-heart"></i>
      </p>
      <ul className="blood-banks">
        {banks.map(({ bank_id, address }) => <li key={bank_id}>{address}</li>)}
      </ul>
    </main>
  );
}

export default HowToDonate;
