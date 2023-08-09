import { gql } from 'apollo-server-express';

export const EmailScalar = gql`
  """
  이메일의 형태를 가진 문자열입니다.
  """
  scalar EmailScalar
`;

export const PhoneNumberScalar = gql`
  """
  핸드폰 번호의 형태를 가진 문자열입니다.
  """
  scalar PhoneNumberScalar
`;
