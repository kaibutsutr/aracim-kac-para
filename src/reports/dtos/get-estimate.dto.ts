import { Transform } from 'class-transformer';
import {
  IsNumber,
  IsString,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from 'class-validator';
export class getEstimateDto {
  // @IsNumber()
  // @Min(0)
  // @Max(100000000)
  // price: number;
  // we dont need price since we estimate the price
  @IsString()
  make: string;
  @IsString()
  model: string;
  @Transform(({ value }) => parseInt(value)) // transform string into integer so we can run our logic correctly
  @IsNumber()
  @Min(1950) // min max values for numbers
  @Max(2030)
  year: number;
  // new class valudators for exciting data!
  @Transform(({ value }) => parseFloat(value)) // transform string into float so we can run our logic correctly
  @IsLongitude()
  longitude: number;
  @Transform(({ value }) => parseFloat(value)) // transform string into float so we can run our logic correctly
  @IsLatitude()
  latitude: number;
  @Transform(({ value }) => parseFloat(value)) // transform string into integer so we can run our logic correctly
  @IsNumber()
  mileage: number;
}
