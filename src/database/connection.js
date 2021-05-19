const mongoose = require('mongoose');
module.exports = mongoose.connect(process.env.MONGOOSE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});