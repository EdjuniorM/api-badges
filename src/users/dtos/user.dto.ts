import {  IsEmail,  IsString, MaxLength, IsArray, ValidateNested} from "@nestjs/class-validator";
import { Type } from '@nestjs/class-transformer';
import { ApiProperty } from "@nestjs/swagger";
import { BadgeDto } from "src/user-badge/dtos/badge.dto";

export class UserDto {
  @ApiProperty({ example: 'user@example.com', description: 'The email of the user' })
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiProperty({ example: 'User Name', description: 'The name of the user' })
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({ type: [BadgeDto], description: 'The badges of the user' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BadgeDto)
  badges: BadgeDto[];

}