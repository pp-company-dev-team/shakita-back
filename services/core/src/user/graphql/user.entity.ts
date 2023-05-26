import { Field, ObjectType } from '@nestjs/graphql';
import { Application } from 'src/application/graphql/application.entity';
import { BonusTicket } from 'src/bonus/graphql/entities/bonusTicket.entity';
import { Session } from 'src/session/graphql/session.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @OneToMany(() => Session, (session) => session.user)
  sessions?: Session[];

  @OneToMany(() => Application, (application) => application.user)
  applications?: Application[];

  @OneToMany(() => BonusTicket, (ticket) => ticket.user)
  bonusTickets?: BonusTicket[];
}
