import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  BeforeRemove,
  OneToMany,
} from 'typeorm'; // decorators for typeorm
import { Report } from 'src/reports/report.entity';

@Entity() // mark this class as an entity
export class User {
  @PrimaryGeneratedColumn()
  id: number; // id column for db
  @Column() // other columns for user
  email: string;
  @Column()
  @Exclude() // exclude this info with interceptor
  password: string;
  @AfterInsert()
  insertLog() {
    console.log('Created a new user with id:', this.id);
  }
  @BeforeRemove()
  removeLog() {
    console.log('Deleted user with id:', this.id);
  }
  @AfterUpdate()
  updateLog() {
    console.log('Updated user with id:', this.id);
  }
  @OneToMany()
  reports: Report[];
}
