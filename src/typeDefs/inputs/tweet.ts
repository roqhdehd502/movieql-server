import { gql } from 'apollo-server-express';

export const SearchInput = gql`
  """
  검색할 트윗의 정보를 입력합니다.
  """
  input SearchInput {
    keyword: String
  }
`;

export const TweetPostInput = gql`
  """
  등록할 트윗의 정보를 입력합니다.
  """
  input TweetPostInput {
    text: String!
  }
`;

export const TweetUpdateInput = gql`
  """
  수정할 트윗의 정보를 입력합니다.
  """
  input TweetUpdateInput {
    id: ID!
    text: String
  }
`;
