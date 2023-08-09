import { gql } from 'apollo-server-express';

export const StatusEnum = gql`
  """
  등록된 트윗의 상태를 표시합니다.
  """
  enum StatusEnum {
    ACTIVE
    INACTIVE
    SUSPENDED
  }
`;
