const { Schema, model } = require('mongoose');

const meetupSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  skillLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Pro', 'All Levels'],
    default: 'All Levels'
  },
  maxPlayers: {
    type: Number,
    required: true,
    min: 2,
    max: 20
  },
  currentPlayers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['Open', 'Full', 'Cancelled', 'Completed'],
    default: 'Open'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Meetup = model('Meetup', meetupSchema);
module.exports = Meetup;