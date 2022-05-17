import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderBlood } from '../../api/orders.api';
import { getRandomManagerId } from '../../api/users.api';
import bloodTypes from '../../data/bloodTypes';

import './OrderBlood.css';

function OrderBlood({ user }) {
  const navigate = useNavigate();
  const [orderForm, setOrderForm] = useState({
    blood_type: '0-',
    amount: 1,
    hospital_id: '',
    man_id: '',
  });

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setOrderForm({ ...orderForm, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await getRandomManagerId();
      const man_id = await res.data.user_id;

      await orderBlood({ ...orderForm, hospital_id: user.id, man_id });
      alert('Order Submitted!');

      navigate('/my-orders');
    } catch (err) {
      console.error(err);
    }

    try {
      // TO DO: update my orders on submit
    } catch (err) {}
  };

  return (
    <main className="order-page ">
      <form className="order-blood-form" onSubmit={handleSubmit}>
        <h3>Order Blood</h3>

        <label form="blood-type">Blood Type: </label>
        <select
          name="blood_type"
          value={orderForm.blood_type}
          onChange={handleChange}
          id="blood_type"
          required
        >
          {bloodTypes.map(({ type }) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <label form="amount">Amount (unit: 500ml): </label>
        <input
          type="number"
          name="amount"
          min={1}
          max={50}
          onChange={handleChange}
          value={orderForm.amount}
          required
          id="amount"
        />

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default OrderBlood;
