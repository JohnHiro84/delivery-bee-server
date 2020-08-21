const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  order_id: {
    type: String,
    ref: 'orders'
  },
  handle: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date_created: {
    type: Date,
    default: Date.now
  },

})

const Comment = mongoose.model('comments', CommentSchema);
module.exports = Comment;
