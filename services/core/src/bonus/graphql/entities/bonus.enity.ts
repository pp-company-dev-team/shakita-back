import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { BonusTicket } from './bonusTicket.entity';

@Entity()
@ObjectType()
export class Bonus extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  count: string;

  @Column()
  @Field()
  asset: string;

  @Column({ default: false })
  @Field({ defaultValue: false })
  isActive: boolean;

  @Column({ type: 'json', nullable: true })
  @Field(() => GraphQLJSON, { nullable: true })
  payload: Record<string, any>;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @OneToMany(() => BonusTicket, (ticket) => ticket.bonus)
  tickets?: BonusTicket[];
}
