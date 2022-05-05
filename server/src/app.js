const express = require('express');
const cors = require('cors');

const topsRouter = require('./routes/tops.router');
const banksRouter = require('./routes/banks.router');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/tops', topsRouter);
app.use('/banks', banksRouter);

module.exports = app;
