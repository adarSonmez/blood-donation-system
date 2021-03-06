import { useContext, useEffect, useState } from 'react';
import { getAllAvailableBloodTypes } from '../../api/banks.api';
import { getOrdersForAManager } from '../../api/orders.api';
import BloodTypesTable from '../../components/blood-types-table/BloodTypesTable';
import ManageOrdersTable from '../../components/manage-orders-table/ManageOrdersTable';
import { UserContext } from '../../contexts/user.context';

import './ManageOrders.css';

function ManageOrders() {
  const { user } = useContext(UserContext);

  const [orders, setOrders] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    updateOrderTable();
  }, []);

  useEffect(() => {
    getAllAvailableBloodTypes()
      .then((r) => setTypes(r.data))
      .catch((err) => console.error(err));
  }, [orders]);

  const updateOrderTable = () => {
    getOrdersForAManager(user.id)
      .then((r) => {
        setOrders(r.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <main className="manage-orders-page">
      <ManageOrdersTable
        orders={orders}
        updateOrderTable={updateOrderTable}
        types={types}
      />
      <BloodTypesTable orders={orders} types={types} />
    </main>
  );
}

export default ManageOrders;
