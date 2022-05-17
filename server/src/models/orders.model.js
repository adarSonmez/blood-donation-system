const Order = {
  insertOrder: `
    INSERT INTO orders
    (blood_type, amount, hospital_id, man_id)
    VALUES (?,?,?,?)
  `,

  selectOrdersOfAHospital: `
    SELECT * from orders WHERE hospital_id = (?)
    ORDER BY order_date DESC
  `,

  deleteOrder: `
    DELETE FROM orders WHERE order_id = (?)
  `,
};

module.exports = Order;
