import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
} from 'typeorm'; // decorators for typeorm

@Entity() // mark this class as an entity
export class User {
  @PrimaryGeneratedColumn()
  id: number; // id column for db
  @Column() // other columns for user
  email: string;
  @Column()
  password: string;
  @AfterInsert()
  insertLog() {
    console.log('Created a new user with id:', this.id);
  }
  @AfterRemove()
  removeLog() {
    console.log('Deleted user with id:', this.id);
  }
  @AfterUpdate()
  updateLog() {
    console.log('Updated user with id:', this.id);
  }
}
