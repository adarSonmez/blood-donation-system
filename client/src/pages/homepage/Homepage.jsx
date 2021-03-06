import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  getLeastAvailableBloodType,
  getMostAvailableBloodType,
  getNumOfTotalAvailableBlood,
  getTotalDonatedBlood,
} from '../../api/banks.api';
import {
  getTopTenDonors,
  getTopTenHospitals,
  getTopTenReceptionists,
} from '../../api/tops.api';

import './Homepage.css';

function Homepage() {
  const navigate = useNavigate();

  const [totalBlood, setTotalBlood] = useState(1);
  const [numOfAvailable, setNumOfAvailable] = useState(1);
  const [mostAvailable, setMostAvailable] = useState({
    num_of_blood: 1,
    blood_type: '0+',
  });
  const [leastAvailable, setLeastAvailable] = useState({
    num_of_blood: 1,
    blood_type: '0-',
  });
  const [topDonor, setTopDonor] = useState({
    name: 'Loading...',
    num_of_blood: 1,
  });
  const [topRecep, setTopRecep] = useState({
    name: 'Loading...',
    num_of_registration: 1,
  });
  const [topHospital, setTopHospital] = useState({
    name: 'Loading...',
    amount_of_blood: 1,
  });

  useEffect(() => {
    setStats();
  }, []);

  const setStats = () => {
    getTotalDonatedBlood()
      .then((r) => setTotalBlood(r.data.total_donated_blood))
      .catch((err) => console.error(err.message));

    getNumOfTotalAvailableBlood()
      .then((r) => setNumOfAvailable(r.data.total_available))
      .catch((err) => console.error(err.message));

    getMostAvailableBloodType()
      .then((r) => setMostAvailable(r.data))
      .catch((err) => console.error(err.message));

    getLeastAvailableBloodType()
      .then((r) => setLeastAvailable(r.data))
      .catch((err) => console.error(err.message));

    getTopTenDonors()
      .then((r) => setTopDonor(r.data[0]))
      .catch((err) => console.error(err.message));

    getTopTenHospitals()
      .then((r) => setTopHospital(r.data[0]))
      .catch((err) => console.error(err.message));

    getTopTenReceptionists()
      .then((r) => setTopRecep(r.data[0]))
      .catch((err) => console.error(err.message));
  };

  return (
    <main>
      <h2 className="data-header">
        Give <i className="bi bi-activity"></i> Blood
      </h2>
      <div className="stats">
        <ul>
          <li>
            <span>{totalBlood / 2}</span> liters of blood have been donated so
            far.
          </li>
          <li>
            The most available blood type is{' '}
            <span>{mostAvailable.blood_type}</span> with{' '}
            <span>
              {((mostAvailable.num_of_blood / numOfAvailable) * 100).toFixed(2)}
            </span>
            %. (<span>{mostAvailable.num_of_blood / 2}</span> litters)
          </li>
          <li>
            The least available blood type is{' '}
            <span>{leastAvailable.blood_type}</span> with{' '}
            <span>
              {((leastAvailable.num_of_blood / numOfAvailable) * 100).toFixed(
                2
              )}
            </span>
            %. (<span>{leastAvailable.num_of_blood / 2}</span> litters)
          </li>
          <li>
            The donor who donated the most blood so far is{' '}
            <span>{topDonor?.name}</span> with{' '}
            <span>{topDonor?.num_of_blood}</span> donations (
            <span>{topDonor?.num_of_blood / 2}</span> litters).
          </li>
          <li>
            Our receptionist that registers the most donors is{' '}
            <span>{topRecep?.full_name}</span> with{' '}
            <span>{topRecep?.num_of_registration}</span> registrations.
          </li>
          <li>
            The hospital we supply the most blood so far is{' '}
            <span>{topHospital?.full_name}</span> with{' '}
            <span>{topHospital?.amount_of_blood / 2}</span> liters.
          </li>
        </ul>
      </div>

      <div className="buttons">
        <button onClick={() => navigate('/how-to-donate')}>
          How to Donate
        </button>
        <button onClick={() => navigate('/top-tens')}>See Top Tens</button>
      </div>
    </main>
  );
}

export default Homepage;
