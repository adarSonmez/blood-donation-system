const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')

dotenv.config()

const topsRouter = require('./routes/tops.router')
const banksRouter = require('./routes/banks.router')
const donationsRouter = require('./routes/donations.router')
const usersRouter = require('./routes/users.router')
const ordersRouter = require('./routes/orders.router')

const app = express()

app.use(morgan('dev'))
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())

app.use('/users', usersRouter)
app.use('/banks', banksRouter)
app.use('/tops', topsRouter)
app.use('/donations', donationsRouter)
app.use('/orders', ordersRouter)

module.exports = app
