import { Field, ArgsType } from '@nestjs/graphql';
import { ApplicationStatus } from '../application.enum';

@ArgsType()
export class GetApplicationsArgs {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  place?: string;

  @Field({ nullable: true })
  date_from?: Date;

  @Field({ nullable: true })
  date_to?: Date;

  @Field(() => ApplicationStatus, {
    nullable: true,
    // defaultValue: ApplicationStatus.APPROVED,
  })
  status?: ApplicationStatus;
}

@ArgsType()
export class GetApplicationsByDateArgs {
  @Field()
  date: Date;

  //   @Field({ nullable: true })
  //   status?: ApplicationStatus;
}

@ArgsType()
export class GetApplicationsHystoryArgs {
  @Field()
  email: string;
  //   @Field({ nullable: true })
  //   status?: ApplicationStatus;
}
