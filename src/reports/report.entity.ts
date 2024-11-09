import { TypeOrmModule } from '@nestjs/typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn() // auto generated by typeORM
  id: number;

  @Column()
  make: string;
  @Column()
  model: string;
  @Column()
  year: number;
  @Column()
  mileage: number;
  @Column()
  longitude: number;
  @Column()
  latitude: number;

  @Column()
  price: number;
}
