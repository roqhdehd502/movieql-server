import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar EmailScalar
  scalar PhoneNumberScalar

  enum StatusEnum {
    ACTIVE
    INACTIVE
    SUSPENDED
  }

  input SearchInput {
    keyword: String
  }
  input TweetPostInput {
    text: String!
  }
  input TweetUpdateInput {
    id: ID!
    text: String
  }

  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String
    fullName: String!
    email: EmailScalar
    phoneNumber: PhoneNumberScalar
  }
  type Tweet {
    id: ID!
    text: String!
    author: User
    status: StatusEnum!
  }

  type Query {
    allUsers: [User!]!
    allTweets: [Tweet!]!
    searchTweets(searchInput: SearchInput): [Tweet!]!
    tweet(id: ID!): Tweet
  }

  type Mutation {
    postTweet(tweetPostInput: TweetPostInput!): Boolean!
    updateTweet(tweetUpdateInput: TweetUpdateInput!): Boolean!
    deleteTweet(id: ID!): Boolean!
  }
`;

export default typeDefs;
