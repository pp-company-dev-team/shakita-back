import { Field, ArgsType } from '@nestjs/graphql';
import { ApplicationStatus } from '../application.enum';

@ArgsType()
export class UpdateOneApplicationArgs {
  @Field()
  id: string;

  @Field({ nullable: true })
  place?: string;

  @Field({ nullable: true })
  date?: Date;

  @Field(() => ApplicationStatus, { nullable: true })
  status?: ApplicationStatus;
}
