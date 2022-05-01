import './TopTens.css';

import TopTensTable from '../../components/top-tens-table/TopTensTable';

function TopTens() {
  return (
    <main className="top-tens-page">
      <h2>Top Tens</h2>
      <div className="top-tens-container">
        <TopTensTable url="donors" />
        <TopTensTable url="hospitals" />
        <TopTensTable url="donors" />
      </div>
    </main>
  );
}

export default TopTens;
