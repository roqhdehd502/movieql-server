import { gql } from 'apollo-server-express';

export const User = gql`
  """
  회원에 대한 정보입니다.
  """
  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String
    fullName: String!
    email: EmailScalar
    phoneNumber: PhoneNumberScalar
  }
`;
