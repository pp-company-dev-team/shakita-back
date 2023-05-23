import { Field, ObjectType } from '@nestjs/graphql';
import { Session } from 'src/session/graphql/session.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
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

  @OneToMany(() => Session, (session) => session.user)
  sessions?: Session[];
}
