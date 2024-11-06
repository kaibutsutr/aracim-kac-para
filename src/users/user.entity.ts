import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'; // decorators for typeorm

@Entity() // mark this class as an entity
export class User {
  @PrimaryGeneratedColumn()
  id: number; // id column for db
  @Column() // other columns for user
  email: string;
  @Column()
  password: string;
}
