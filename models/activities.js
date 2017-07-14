const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema ({


  title: String,
  quantity: Number,
  date: String,
  url: String
  },
  {timestamps: true}
)


const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
