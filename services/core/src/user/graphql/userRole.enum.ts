import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  user,
  unregisteredUser,
  admin,
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
