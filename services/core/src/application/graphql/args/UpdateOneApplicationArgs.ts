import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class UpdateOneApplicationArgs {
  @Field()
  id: string;

  @Field()
  place: string;

  @Field()
  date: Date;
}
