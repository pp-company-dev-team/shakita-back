import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class CreateOneApplicationArgs {
  @Field()
  email: string;

  @Field()
  place: string;
}
