import { gql } from 'apollo-server-express';

import { StatusEnum } from './enums/tweet';

import { SearchInput, TweetPostInput, TweetUpdateInput } from './inputs/tweet';

import { EmailScalar, PhoneNumberScalar } from './scalars/user';

import { Tweet } from './types/tweet';
import { User } from './types/user';

const typeDefs = gql`
  ${EmailScalar}
  ${PhoneNumberScalar}

  ${StatusEnum}

  ${SearchInput}
  ${TweetPostInput}
  ${TweetUpdateInput}

  ${Tweet}
  ${User}

  type Query {
    """
    모든 회원의 정보들을 가져옵니다.
    """
    allUsers: [User!]!
    """
    모든 트윗의 정보들을 가져옵니다.
    """
    allTweets: [Tweet!]!
    """
    검색 조건에 맞는 트윗의 정보들을 가져옵니다.
    """
    searchTweets(searchInput: SearchInput): [Tweet!]!
    """
    해당 트윗의 정보를 가져옵니다.
    """
    tweet(id: ID!): Tweet
  }

  type Mutation {
    """
    트윗을 등록합니다.
    """
    postTweet(tweetPostInput: TweetPostInput!): Boolean!
    """
    트윗을 수정합니다.
    """
    updateTweet(tweetUpdateInput: TweetUpdateInput!): Boolean!
    """
    트윗을 삭제합니다.
    """
    deleteTweet(id: ID!): Boolean!
  }
`;

export default typeDefs;
