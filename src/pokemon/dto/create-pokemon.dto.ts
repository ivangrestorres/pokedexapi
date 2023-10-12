import { IsPositive, IsInt, Min, MinLength, IsString } from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  @MinLength(1)
  name: string;
  @IsPositive()
  @IsInt()
  @Min(1)
  no: number;
}
