import { Field, ArgsType } from '@nestjs/graphql';
import { BonusTicketType } from '../bonusTicket.enum';
import { IsUUID } from 'class-validator';

@ArgsType()
export class CreateOneBonusTicketArgs {
  @Field()
  code: string;

  @Field(() => BonusTicketType, { nullable: true })
  ticketType?: BonusTicketType;

  @Field()
  activeTill?: Date;

  @Field()
  @IsUUID()
  bonusId: string;

  @Field()
  @IsUUID()
  userId?: string;
}
