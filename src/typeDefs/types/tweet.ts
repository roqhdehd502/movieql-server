import { gql } from 'apollo-server-express';

export const Tweet = gql`
  """
  트윗에 대한 정보입니다.
  """
  type Tweet {
    id: ID!
    text: String!
    author: User
    status: StatusEnum!
  }
`;
