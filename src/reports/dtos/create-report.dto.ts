import {
  IsNumber,
  IsString,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from 'class-validator';
export class createReportDto {
  @IsNumber()
  @Min(0)
  @Max(100000000)
  price: number;
  @IsString()
  make: string;
  @IsString()
  model: string;
  @IsNumber()
  @Min(1950) // min max values for numbers
  @Max(2030)
  year: number;
  // new class valudators for exciting data!
  @IsLongitude()
  longitude: number;
  @IsLatitude()
  latitude: number;
  @IsNumber()
  mileage: number;
}
