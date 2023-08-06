import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Email
  scalar PhoneNumber

  enum Status {
    ACTIVE
    INACTIVE
    SUSPENDED
  }

  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String
    fullName: String!
    email: Email
    phoneNumber: PhoneNumber
  }
  type Tweet {
    id: ID!
    text: String!
    author: User
    status: Status!
  }

  type Query {
    allUsers: [User!]!
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }

  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

export default typeDefs;
