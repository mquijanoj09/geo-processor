import { IsNumber } from 'class-validator';

export class PointDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}
