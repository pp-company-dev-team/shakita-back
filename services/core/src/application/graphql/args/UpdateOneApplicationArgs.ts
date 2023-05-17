import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class UpdateOneApplicationArgs {
  @Field()
  email: string;

  @Field()
  place: string;
}
