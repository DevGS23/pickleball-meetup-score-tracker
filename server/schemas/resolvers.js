const { AuthenticationError } = require('apollo-server-express');
const { User, Meetup, Match } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Existing queries
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    meetups: async () => {
      return Meetup.find().populate('creator').populate('currentPlayers');
    },
    meetup: async (parent, { _id }) => {
      return Meetup.findOne({ _id }).populate('creator').populate('currentPlayers');
    },
    myMeetups: async (parent, args, context) => {
      if (context.user) {
        return Meetup.find({
          $or: [
            { creator: context.user._id },
            { currentPlayers: context.user._id }
          ]
        }).populate('creator').populate('currentPlayers');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // New match queries
    matches: async () => {
      return Match.find()
        .populate('players')
        .populate('teams.team1')
        .populate('teams.team2')
        .populate('meetup');
    },
    match: async (parent, { _id }) => {
      return Match.findOne({ _id })
        .populate('players')
        .populate('teams.team1')
        .populate('teams.team2')
        .populate('meetup');
    },
    userMatches: async (parent, { userId }) => {
      return Match.find({ players: userId })
        .populate('players')
        .populate('teams.team1')
        .populate('teams.team2')
        .populate('meetup');
    },
    meetupMatches: async (parent, { meetupId }) => {
      return Match.find({ meetup: meetupId })
        .populate('players')
        .populate('teams.team1')
        .populate('teams.team2')
        .populate('meetup');
    }
  },

  Mutation: {
    // Existing mutations
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    createMeetup: async (parent, { input }, context) => {
      if (context.user) {
        const meetup = await Meetup.create({
          ...input,
          creator: context.user._id,
          currentPlayers: [context.user._id]
        });
        return meetup.populate('creator').populate('currentPlayers');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    joinMeetup: async (parent, { meetupId }, context) => {
      if (context.user) {
        const meetup = await Meetup.findOneAndUpdate(
          { _id: meetupId },
          { $addToSet: { currentPlayers: context.user._id } },
          { new: true }
        ).populate('creator').populate('currentPlayers');
        return meetup;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // New match mutations
    createMatch: async (parent, { players, team1, team2, scores, winner, meetupId, location }, context) => {
      if (context.user) {
        const match = await Match.create({
          players,
          teams: {
            team1,
            team2
          },
          scores,
          winner,
          meetup: meetupId,
          location
        });
        return match
          .populate('players')
          .populate('teams.team1')
          .populate('teams.team2')
          .populate('meetup');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateMatchScore: async (parent, { matchId, scores, winner }, context) => {
      if (context.user) {
        const match = await Match.findOneAndUpdate(
          { _id: matchId },
          {
            $set: {
              scores,
              winner
            }
          },
          { new: true }
        )
          .populate('players')
          .populate('teams.team1')
          .populate('teams.team2')
          .populate('meetup');
        return match;
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;