import { EmailScalar, PhoneNumberScalar } from '../scalars/user';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: EmailScalar;
  phoneNumber: PhoneNumberScalar;
};
