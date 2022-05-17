const db = require('../config/db.config');
const Order = require('../models/orders.model');

function orderBlood(req, res) {
  const { blood_type, amount, hospital_id, man_id } = req.body;
  const sql = Order.insertOrder;

  db.query(sql, [blood_type, amount, hospital_id, man_id], (err, data) => {
    if (err) throw err;

    res.json({ success: true });
  });
}

module.exports = {
  orderBlood,
};
