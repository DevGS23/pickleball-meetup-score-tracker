const { Schema, model } = require('mongoose');

const meetupSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Meetup = model('Meetup', meetupSchema);
module.exports = Meetup;