import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Todo } from './Todo';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  email!: string;

  @Column('text')
  password!: string;

  @Column('int', { default: 0 })
  tokenVersion: number;

  @OneToMany(() => Todo, (t) => t.creator)
  todos: Promise<Todo[]>;
}
