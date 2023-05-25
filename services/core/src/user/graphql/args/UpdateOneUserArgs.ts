import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class UpdateOneUserArgs {
  @Field()
  email: string;

  @Field()
  password: string;
}
