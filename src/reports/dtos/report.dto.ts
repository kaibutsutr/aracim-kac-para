import { Expose, Transform } from 'class-transformer';

export class reportDto {
  @Expose()
  price: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  year: number;
  @Expose()
  longitude: number;
  @Expose()
  mileage: number;
  @Transform(({ obj }) => obj.user.userId) // transform the report objects user.id part here as userid
  @Expose()
  userId: number;
}
