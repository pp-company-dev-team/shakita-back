import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApplicationStatus } from './application.enum';

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

  @OneToMany(() => Application, (application) => application.user)
  applications?: Application[];
}

@Entity()
@ObjectType()
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  place: string;

  @Column({ default: ApplicationStatus.PENDING })
  @Field(() => ApplicationStatus)
  status: ApplicationStatus;

  @Column({ default: new Date() })
  @Field()
  date: Date;

  @ManyToOne(() => User, (user) => user.applications)
  user: User;
}
