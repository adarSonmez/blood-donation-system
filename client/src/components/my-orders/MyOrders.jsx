import React, { useContext, useEffect, useState } from 'react';
import { deleteOrder, getOrdersByHospitalId } from '../../api/orders.api';
import { UserContext } from '../../contexts/user.context';

import './MyOrders.css';

function MyOrders() {
  const { user } = useContext(UserContext);
  
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    updateOrderHistory();
  }, [user]);

  const updateOrderHistory = () => {
    getOrdersByHospitalId(user.id)
      .then((r) => setMyOrders(r.data))
      .catch((err) => console.error(err.message));
  };

  const setStatusColor = (status) => {
    switch (status) {
      case 'waiting':
        return { backgroundColor: '#885' };
      case 'rejected':
        return { backgroundColor: '#800' };
      case 'approved':
        return { backgroundColor: '#050' };
      default:
        return { backgroundColor: 'black' };
    }
  };

  const cancelOrder = (order_id) => {
    deleteOrder(order_id)
      .then(() => updateOrderHistory())
      .catch((err) => console.error(err));
  };

  return (
    <main className="my-orders-page">
      <table className="my-orders-table">
        <caption>Order History</caption>
        <thead>
          <tr>
            <th>Type</th>
            <th>
              Units <br />
              (0.5L)
            </th>
            <th>Date</th>
            <th>Status</th>
            <th>Cancel</th>
          </tr>
        </thead>
        <tbody>
          {myOrders.map(
            ({ blood_type, amount, order_date, state, order_id }) => (
              <tr key={order_id} style={setStatusColor(state)}>
                <td>{blood_type}</td>
                <td>{amount}</td>
                <td>{new Date(order_date).toDateString()}</td>
                <td>{state}</td>
                <td>
                  {' '}
                  {state === 'waiting' ? (
                    <i
                      className="bi bi-x"
                      onClick={() => cancelOrder(order_id)}
                    ></i>
                  ) : (
                    ''
                  )}{' '}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </main>
  );
}

export default MyOrders;
