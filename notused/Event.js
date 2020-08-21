const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  // organizer_name: {
  //   type: Schema.handle,
  //   ref: 'users'
  // },
  organizer_name: {
    type: String,
    // required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
  event_date: {
    type: String
    // required: true
  },
  event_time: {
    type: String,
    required: true
  },
  date_created: {
    type: Date,
    default: Date.now
  },
  whos_going: {
    type: [String]
  },
})

const Event = mongoose.model('events', EventSchema);
module.exports = Event;
