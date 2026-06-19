// dto/add-to-cart.dto.ts
import { IsString, IsInt, Min, IsOptional } from 'class-validator';

export class AddToCartDto {
  @IsInt()
  chaiseId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number;
}