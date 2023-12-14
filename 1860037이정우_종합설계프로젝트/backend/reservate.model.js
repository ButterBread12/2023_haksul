const mongoose = require('mongoose');

var DataSchema = mongoose.Schema({
  deviceId: { type: Number, require: true },
  reservateId: { type: Number, require: true },
  reshospital: { type: String, require: true },
  resroom: { type: String, require: true },
  resname: { type: String, require: true },
  resdate: { type: String, require: true },
  restime: { type: String, require: true },
  register_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Resv', DataSchema);