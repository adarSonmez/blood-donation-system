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

function getOrders(req, res) {
  const { hospital_id } = req.query;
  const sql = Order.selectOrdersOfAHospital;

  db.query(sql, [hospital_id], (err, data) => {
    if (err) throw err;

    res.json(data);
  });
}

function deleteOrderById(req, res) {
  const { order_id } = req.query;
  console.log(order_id);
  const sql = Order.deleteOrder;

  db.query(sql, [order_id], (err, data) => {
    if (err) throw err;

    res.json({ success: true, message: 'Order successfully deleted!' });
  });
}

module.exports = {
  orderBlood,
  getOrders,
  deleteOrderById,
};
