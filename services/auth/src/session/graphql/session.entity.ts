import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/graphql/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  refreshToken: string;

  @ManyToOne(() => User, (user) => user.sessions)
  user: User;
}
