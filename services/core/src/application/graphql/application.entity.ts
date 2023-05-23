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
import { User } from 'src/user/graphql/user.entity';

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
