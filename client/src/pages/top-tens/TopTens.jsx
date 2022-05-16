import { useEffect, useState } from 'react';

import TopTensTable from '../../components/top-tens-table/TopTensTable';
import {
  getTopTenDonors,
  getTopTenHospitals,
  getTopTenReceptionists,
} from '../../api/tops.api';

import './TopTens.css';

function TopTens() {
  const [topDonors, setTopDonors] = useState([{ id: 0, unit: 'Donations' }]);
  const [topReceps, setTopReceps] = useState([
    { id: 0, unit: 'Registrations' },
  ]);
  const [topHospitals, setTopHospitals] = useState([
    { id: 0, unit: 'Orders (L)' },
  ]);

  useEffect(() => {
    getTopTenDonors()
      .then((r) =>
        setTopDonors(
          r.data.map(({ donor_id, name, num_of_blood }) => {
            return {
              ...topDonors[0],
              id: donor_id,
              name: name,
              num: num_of_blood,
            };
          })
        )
      )
      .catch((err) => console.error(err.message));

    getTopTenHospitals()
      .then((r) =>
        setTopHospitals(
          r.data.map(({ user_id, full_name, amount_of_blood }) => {
            return {
              ...topHospitals[0],
              id: user_id,
              name: full_name,
              num: amount_of_blood / 2,
            };
          })
        )
      )
      .catch((err) => console.error(err.message));

    getTopTenReceptionists()
      .then((r) =>
        setTopReceps(
          r.data.map(({ user_id, full_name, num_of_registration }) => {
            return {
              ...topReceps[0],
              id: user_id,
              name: full_name,
              num: num_of_registration,
            };
          })
        )
      )
      .catch((err) => console.error(err.message));
  }, [topDonors, topHospitals, topReceps]);

  return (
    <main className="top-tens-page">
      <h2>Top Tens</h2>
      <div className="top-tens-container">
        <TopTensTable
          url="donors"
          data={topDonors === [] ? { unit: '' } : topDonors}
        />
        <TopTensTable url="hospitals" data={topHospitals} />
        <TopTensTable url="receptionist" data={topReceps} />
      </div>
    </main>
  );
}

export default TopTens;
