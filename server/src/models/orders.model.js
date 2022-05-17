const Order = {
  insertOrder: `
    INSERT INTO orders
    (blood_type, amount, hospital_id, man_id)
    VALUES (?,?,?,?)
  `,
};

module.exports = Order;
