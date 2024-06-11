import { IsString, MaxLength } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
    @ApiProperty({ example: 'user@example.com', description: 'The email of the user' })
    @IsString()
    @MaxLength(50)
    email: string;
  
    @ApiProperty({ example: '123', description: 'The password of the user' })
    @IsString()
    @MaxLength(100)
    password: string;
  }