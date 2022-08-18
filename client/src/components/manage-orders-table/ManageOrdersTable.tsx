import { updateOrderState } from '../../api/orders.api'

function ManageOrdersTable({ updateOrderTable, orders, types }) {
  const approveOrder = (order_id, amount, blood_type) => {
    const stock = types.filter((t) => t.blood_type === blood_type)[0]
    if (stock.num_of_blood < amount)
      alert('There is not enough blood available!')
    else {
      updateOrderState({ order_id, state: 'approved', blood_type, amount })
        .then(() => updateOrderTable())
        .catch((err) => console.error(err))
    }
  }

  const rejectOrder = (order_id, amount, blood_type) => {
    updateOrderState({ order_id, state: 'rejected', blood_type, amount })
      .then(() => updateOrderTable())
      .catch((err) => console.error(err))
  }

  return (
    <table className="manage-orders-table">
      {orders[0] ? (
        <caption>Please manage orders!</caption>
      ) : (
        <caption>No orders to manage.</caption>
      )}
      <thead>
        <tr>
          <th>Hospital</th>
          <th>Type</th>
          <th>Units</th>
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
                  onClick={() => approveOrder(order_id, amount, blood_type)}
                ></i>
              </td>
              <td>
                <i
                  className="bi bi-x"
                  onClick={() => rejectOrder(order_id, amount, blood_type)}
                ></i>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  )
}

export default ManageOrdersTable
