const express = require('express');
const cors = require('cors');

const topsRouter = require('./routes/tops.router');
const banksRouter = require('./routes/banks.router');
const donationsRouter = require('./routes/donations.router');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/users', banksRouter);
app.use('/banks', banksRouter);
app.use('/tops', topsRouter);
app.use('/donations', donationsRouter);

module.exports = app;
