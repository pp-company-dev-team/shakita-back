import { Field, ObjectType } from '@nestjs/graphql';
import { Application } from 'src/application/graphql/application.entity';
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

  @OneToMany(() => Application, (application) => application.user)
  applications?: Application[];
}
