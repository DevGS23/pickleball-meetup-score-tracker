const { Schema, model } = require('mongoose');

const matchSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  teams: {
    team1: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    team2: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  scores: {
    team1: [{
      type: Number,
      required: true
    }],
    team2: [{
      type: Number,
      required: true
    }]
  },
  winner: {
    type: String,
    enum: ['team1', 'team2'],
    required: true
  },
  meetup: {
    type: Schema.Types.ObjectId,
    ref: 'Meetup'
  },
  location: {
    type: String,
    required: true
  }
});

const Match = model('Match', matchSchema);
module.exports = Match;