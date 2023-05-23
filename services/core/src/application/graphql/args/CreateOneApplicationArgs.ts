import { Field, ArgsType, InputType } from '@nestjs/graphql';

@InputType()
export class PayloadArgs {
  @Field()
  phone?: string;

  @Field()
  telegram?: string;

  @Field()
  instagram?: string;
}

@ArgsType()
export class CreateOneApplicationArgs {
  @Field()
  place: string;

  @Field()
  date: Date;

  @Field()
  name: string;

  @Field(() => PayloadArgs)
  payload?: PayloadArgs;

  @Field()
  email: string;

  @Field()
  notificationOnMail: boolean;
}
