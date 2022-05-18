import { useEffect, useState } from 'react';
import { getOrdersForAManager, updateOrderState } from '../../api/orders.api';

import './ManageOrders.css';

function ManageOrders({ user }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    updateOrderTable();
  }, []);

  const updateOrderTable = () => {
    getOrdersForAManager(user.id)
      .then((r) => {
        setOrders(r.data);
      })
      .catch((err) => console.error(err));
  };

  const approveOrder = (order_id) => {
    updateOrderState(order_id, 'approved')
      .then(() => updateOrderTable())
      .catch((err) => console.error(err));
  };

  const rejectOrder = (order_id) => {
    console.log(order_id);
    updateOrderState(order_id, 'rejected')
      .then(() => updateOrderTable())
      .catch((err) => console.error(err));
  };

  return (
    <main className="manage-orders-page">
      <table className="manage-orders-table">
        {orders ? (
          <caption>Please manage orders!</caption>
        ) : (
          <caption>No orders to manage.</caption>
        )}
        <thead>
          <tr>
            <th>Hospital</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Order Date</th>
            <th>Approve</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(
            ({ blood_type, amount, order_date, order_id, full_name }) => (
              <tr key={order_id}>
                <td>{full_name}</td>
                <td>{blood_type}</td>
                <td>{amount}</td>
                <td>{new Date(order_date).toLocaleDateString()}</td>
                <td>
                  <i
                    className="bi bi-check"
                    onClick={() => approveOrder(order_id)}
                  ></i>
                </td>
                <td>
                  <i
                    className="bi bi-x"
                    onClick={() => rejectOrder(order_id)}
                  ></i>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </main>
  );
}

export default ManageOrders;
