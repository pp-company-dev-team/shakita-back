import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class CreateOneBonusArgs {
  @Field()
  count: string;

  @Field()
  asset: string;

  //   @Field()
  //   payload?: any;
}
