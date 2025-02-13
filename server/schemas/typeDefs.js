const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    skillLevel: String
    meetups: [Meetup]
  }

  type Meetup {
    _id: ID
    title: String
    creator: User
    location: String
    date: String
    time: String
    skillLevel: String
    maxPlayers: Int
    currentPlayers: [User]
    status: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    meetups: [Meetup]
    meetup(_id: ID!): Meetup
    myMeetups: [Meetup]
  }

  input MeetupInput {
    title: String!
    location: String!
    date: String!
    time: String!
    skillLevel: String
    maxPlayers: Int!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, skillLevel: String): Auth
    createMeetup(input: MeetupInput!): Meetup
    joinMeetup(meetupId: ID!): Meetup
    cancelMeetup(meetupId: ID!): Meetup
    updateMeetupStatus(meetupId: ID!, status: String!): Meetup
  }
`;

module.exports = typeDefs;