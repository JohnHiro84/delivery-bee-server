const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  user_handle: {
    type: String,
    required: true
  },
  helper: {
    type: String
    // ref: 'users'
  },
  helper_handle: {
    type: String,
    required: false
  },
  pick_up_lat: {
    type: String,
    required: true
  },
  pick_up_long: {
    type: String,
    required: true
  },
  pick_up_address: {
    type: String,
    required: true
  },
  pick_up_neighborhood: {
    type: String,
    required: true
  },
  drop_off_lat: {
    type: String,
    required: true
  },
  drop_off_long: {
    type: String,
    required: true
  },
  drop_off_address: {
    type: String,
    required: true
  },
  drop_off_neighborhood: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: false
  },
  distance: {
    type: String,
    required: true
  },
  cost: {
    type: String,
    required: true
  },
  vehicle: {
    type: String,
    required: false
  },
  time_accepted: {
    type: Date,
    required: false
  },
  time_completed: {
    type: Date,
    required: false
  },
  order_completed: {
    type: Boolean,
    required: true
  },
  final_confirmation: {
    type: Boolean,
    required: true
  }
})

const Order = mongoose.model('orders', OrderSchema);
module.exports = Order;
