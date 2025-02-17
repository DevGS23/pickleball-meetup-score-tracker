const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    skillLevel: String
  }

  type Meetup {
    _id: ID
    title: String
    location: String
    date: String
    creator: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    meetups: [Meetup]
    meetup(_id: ID!): Meetup
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, skillLevel: String): Auth
    login(email: String!, password: String!): Auth
    createMeetup(title: String!, location: String!, date: String!): Meetup
  }
`;

module.exports = typeDefs;