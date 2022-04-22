import { useNavigate } from "react-router-dom";
import './Homepage.css';

function Homepage() {
  const navigate = useNavigate();
  const onNavigateHandler = () => navigate("/how-to-donate");

  return (
    <main>
      <h2 className="data-header">Data</h2>
      <div className="stats">
        <p><span>15240</span> liters of blood have been donated so far.</p>
        <p>The most donated blood type is <span>AB+</span> with <span>30</span>%.</p>
        <p>The least donated blood type is <span>0-</span> with <span>2</span>%.</p>
        <p>The blood donation champion of 2022 is <span>Yusuf Mert</span>. <a href="/">Click here</a> to see the top 10.</p>
        <p>Our receptionist that registers the most donors is <span>Sude Zevrek</span>.</p>
        <p>The hospital we supply the most blood is <span>the World hospital</span> with <span>300</span> liters.</p>
      </div>

      <button onClick={onNavigateHandler}>Donate blood now!</button>
    </main>
  );
}

export default Homepage;
