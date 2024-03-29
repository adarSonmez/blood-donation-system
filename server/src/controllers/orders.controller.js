const db = require('../config/db.config')
const Order = require('../models/orders.model')

function orderBlood(req, res) {
  const { blood_type, amount, hospital_id, man_id } = req.body
  const sql = Order.insertOrder

  db.query(sql, [blood_type, amount, hospital_id, man_id], (err, data) => {
    if (err)
      return res.json({ error: true, success: false, message: err.message })
    res.json({ success: true, message: 'Saved blood order!' })
  })
}

function getOrders(req, res) {
  const { hospital_id, man_id } = req.query
  const sqlForHospital = Order.selectOrdersOfAHospital
  const sqlForManager = Order.selectOrdersForAManager

  if (hospital_id) {
    db.query(sqlForHospital, [hospital_id], (err, data) => {
      if (err)
        return res.json({ error: true, success: false, message: err.message })
      res.json(data)
    })
  } else if (man_id) {
    db.query(sqlForManager, [man_id], (err, data) => {
      if (err)
        return res.json({ error: true, success: false, message: err.message })
      res.json(data)
    })
  }
}

function deleteOrderById(req, res) {
  const { order_id } = req.query
  const sql = Order.deleteOrder

  db.query(sql, [order_id], (err, data) => {
    if (err)
      return res.json({ error: true, success: false, message: err.message })

    res.json({ success: true, message: 'Order successfully deleted!' })
  })
}

function updateOrder(req, res) {
  const { state, order_id } = req.body
  const reduceBlood = Order.updateBloodState
  const updateOrderState = Order.updateOrderState
  const selectOrder = Order.selectOrderByOrderId

  if (state == 'approved') {
    db.query(selectOrder, [order_id], (err, data) => {
      const {blood_type, amount} = data[0]

      db.query(reduceBlood, [blood_type, amount], (err, data) => {
        if (err)
          return res.json({ error: true, success: false, message: err.message })
        db.query(updateOrderState, [state, order_id], (err, data) => {
          if (err)
            return res.json({ error: true, success: false, message: err.message })
          res.json({ success: true, message: 'Order status changed!' })
        })
      })
    })


  } else
    db.query(updateOrderState, [state, order_id], (err, data) => {
      if (err)
        return res.json({ error: true, success: false, message: err.message })
      res.json({ success: true, message: 'Order status changed!' })
    })
}

function updateBloodState(req, res) {
  const { blood_type, amount } = req.query
}

module.exports = {
  orderBlood,
  getOrders,
  deleteOrderById,
  updateOrder,
  updateBloodState,
}
