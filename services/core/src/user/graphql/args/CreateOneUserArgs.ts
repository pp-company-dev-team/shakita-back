import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class CreateOneUserArgs {
  @Field()
  email: string;

  @Field()
  password: string;
}
