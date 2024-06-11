import {  IsString, MaxLength, IsArray, IsInt } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class BadgeDto {
  @ApiProperty({ example: '1', description: 'The id of the badge' })
  @IsInt({ each: true })
  id: number;

  @ApiProperty({ example: 'cda', description: 'The slug of the badge' })
  @IsString()
  slug: string;

  @ApiProperty({ example: 'cda', description: 'The name of the badge' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'image.url', description: 'The imageUrl of the badge' })
  @IsString()
  imageUrl: string;


}