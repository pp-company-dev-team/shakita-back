import { Field, ArgsType, InputType } from '@nestjs/graphql';

@InputType()
export class PayloadArgs {
  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  telegram?: string;

  @Field({ nullable: true })
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

  @Field(() => PayloadArgs, { nullable: true })
  payload?: PayloadArgs;

  @Field()
  email: string;

  @Field({ defaultValue: true })
  notificationOnMail?: boolean;
}
