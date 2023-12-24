const express = require('express');
const process = require('process');
const app = express();
const connectDB = require('./db/db.js');
require('dotenv').config();

const realEstate = require('./routes/real-estate.route.js');
const anonLocation = require('./routes/anonymous-location.route.js');
const settings = require('./routes/settings.route.js');
const login = require('./login.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(login);
app.use('/api/realestate', realEstate);
app.use('/api/locations', anonLocation);
app.use('/api/settings', settings);

const PORT = parseInt(process.env.PORT) || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
