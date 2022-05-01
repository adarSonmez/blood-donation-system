const express = require('express');
const cors = require('cors');

const hospitalRouter = require('./routes/hospitals/hospitals.router');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(express.json());
app.use(hospitalRouter);

module.exports = app;
