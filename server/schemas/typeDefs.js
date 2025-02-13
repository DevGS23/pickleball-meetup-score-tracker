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

  type Team {
    players: [User]
    scores: [Int]
  }

  type Match {
    _id: ID
    date: String
    players: [User]
    teams: TeamData
    scores: ScoreData
    winner: String
    meetup: Meetup
    location: String
  }

  type TeamData {
    team1: [User]
    team2: [User]
  }

  type ScoreData {
    team1: [Int]
    team2: [Int]
  }

  type Auth {
    token: ID!
    user: User
  }

  input MeetupInput {
    title: String!
    location: String!
    date: String!
    time: String!
    skillLevel: String
    maxPlayers: Int!
  }

  input ScoreInput {
    team1: [Int]!
    team2: [Int]!
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    meetups: [Meetup]
    meetup(_id: ID!): Meetup
    myMeetups: [Meetup]
    matches: [Match]
    match(_id: ID!): Match
    userMatches(userId: ID!): [Match]
    meetupMatches(meetupId: ID!): [Match]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, skillLevel: String): Auth
    createMeetup(input: MeetupInput!): Meetup
    joinMeetup(meetupId: ID!): Meetup
    cancelMeetup(meetupId: ID!): Meetup
    updateMeetupStatus(meetupId: ID!, status: String!): Meetup
    createMatch(
      players: [ID]!
      team1: [ID]!
      team2: [ID]!
      scores: ScoreInput!
      winner: String!
      meetupId: ID
      location: String!
    ): Match
    updateMatchScore(
      matchId: ID!
      scores: ScoreInput!
      winner: String!
    ): Match
  }
`;

module.exports = typeDefs;