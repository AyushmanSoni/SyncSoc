const mongoose = require('mongoose');

async function connect(url) {
  try {
    await mongoose.connect(url);
    console.log('Database connection established');
  } catch (e) {
    console.log('Error connecting to the database:', e);
  }
}

module.exports = { connect };