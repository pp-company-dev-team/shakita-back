import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/graphql/user.entity';
import { BonusTicket } from './bonusTicket.entity';

@Entity()
@ObjectType()
export class ActivatedBonus extends BaseEntity {
  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => BonusTicket)
  @JoinColumn({ name: 'bonusTicketId' })
  bonusTicket: BonusTicket;

  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  bonusTicketId: string;
}
