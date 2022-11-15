const Order = {
  selectOrderByOrderId: `
    SELECT * FROM orders WHERE order_id = (?)
  `,

  insertOrder: `
    INSERT INTO orders
    (blood_type, amount, hospital_id, man_id)
    VALUES (?,?,?,?)
  `,

  selectOrdersOfAHospital: `
    SELECT * from orders WHERE hospital_id = (?)
    ORDER BY order_date DESC
  `,

  selectOrdersForAManager: `
    SELECT orders.order_id, orders.order_date, orders.blood_type,  
    orders.amount, sys_user.full_name from orders 
    LEFT JOIN sys_user ON orders.hospital_id = sys_user.user_id 
    WHERE man_id = (?) AND state = "waiting"
    ORDER BY order_date DESC;
  `,

  deleteOrder: `
    DELETE FROM orders WHERE order_id = (?)
  `,

  updateOrderState: `
    UPDATE orders SET state = (?) WHERE order_id = (?)
  `,

  updateBloodState: `
    UPDATE blood
    LEFT JOIN donor
    ON blood.donor_id = donor.donor_id 
    SET blood.used = 1
    WHERE donated_date > (SELECT DATE_SUB(CURRENT_DATE(), INTERVAL 4500 DAY)) 
    AND used = 0 AND blood_type = ? 
    ORDER BY blood.donated_date
    LIMIT ?
  `,
}

module.exports = Order
