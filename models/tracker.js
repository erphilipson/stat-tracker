const mongoose = require('mongoose');

const trackerSchema = new mongoose.Schema ({
  quantity: Number
})

const Tracker = mongsoose.model('Tracker', trackerSchema);

module.exports = Tracker;
