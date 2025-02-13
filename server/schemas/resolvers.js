const { AuthenticationError } = require('apollo-server-express');
const { User, Meetup } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
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
    }
  },
  
  Mutation: {
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
    }
  }
};

module.exports = resolvers;