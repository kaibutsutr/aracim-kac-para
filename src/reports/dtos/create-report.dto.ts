import { IsNumber, IsString } from 'class-validator';
export class createReportDto {
  id: string;
  @IsNumber()
  price: number;
  @IsString()
  make: string;
  @IsString()
  model: string;
  @IsNumber()
  year: number;
  @IsNumber()
  lineage: number;
  @IsNumber()
  latitude: number;
  @IsNumber()
  mileage: number;
}
