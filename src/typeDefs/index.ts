import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Email
  scalar PhoneNumber

  enum Status {
    ACTIVE
    INACTIVE
    SUSPENDED
  }

  input SearchInput {
    keyword: String
  }

  input TweetInput {
    text: String!
    userId: ID!
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
    searchTweets(keyword: String): [Tweet!]!
    tweet(id: ID!): Tweet
  }

  type Mutation {
    postTweet(tweetInput: TweetInput!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

export default typeDefs;
