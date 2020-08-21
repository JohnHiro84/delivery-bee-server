const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  order_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  helper_id: {
    type: String,
    required: true
  },
  user_handle: {
    type: String,
    required: true
  },
  helper_handle: {
    type: String,
    required: false
  },
  stars: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: false
  }
})

const Review = mongoose.model('reviews', ReviewSchema);
module.exports = Review;
