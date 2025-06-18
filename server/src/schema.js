const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    username: String!
    coins: Int!
    wins: Int!
  }
  type SpinResult {
    result: [String!]!
    win: Boolean!
  }
  type Query {
    leaderboard: [User!]!
    user: User
  }
  type Mutation {
    updateStats(coins: Int!, wins: Int!): Boolean
    claimBonus: Int
    recommendTheme: String
    spin(bet: Int!): SpinResult
  }
`;
