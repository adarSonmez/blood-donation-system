import { useNavigate } from 'react-router-dom';
import './Homepage.css';

function Homepage() {
  const navigate = useNavigate();

  return (
    <main>
      <h2 className="data-header">
        Give <i className="bi bi-activity"></i> Blood
      </h2>
      <div className="stats">
        <ul>
          <li>
            <span>15240</span> liters of blood have been donated so far.
          </li>
          <li>
            The most donated blood type is <span>AB+</span> with <span>30</span>
            %.
          </li>
          <li>
            The least donated blood type is <span>0-</span> with <span>2</span>
            %.
          </li>
          <li>
            The blood donation champion of 2022 is <span>Yusuf Mert Ülgen</span>
            . <a href="/">Click here</a> to see the top 10.
          </li>
          <li>
            Our receptionist that registers the most donors is{' '}
            <span>Ekrem Yıldızhan</span>.
          </li>
          <li>
            The hospital we supply the most blood is{' '}
            <span>the World hospital</span> with <span>300</span> liters.
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
