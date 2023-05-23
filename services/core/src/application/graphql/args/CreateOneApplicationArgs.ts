import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class CreateOneApplicationArgs {
  @Field()
  place: string;

  @Field()
  date: Date;
}
