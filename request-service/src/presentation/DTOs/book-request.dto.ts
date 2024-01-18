import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BookRequestDto {
  @ApiProperty({ type: String, required: true, example: 'Hamid Sekandari' })
  @IsString()
  @IsNotEmpty()
  requester_name: string;

  @ApiProperty({ type: String, required: true, example: 'Mastering NestJS' })
  @IsString()
  @IsNotEmpty()
  requested_book: string;

  @ApiProperty({
    type: [String],
    required: false,
    example: ['programming', '2023'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(0)
  tags?: Array<string>;
}
