import { IsArray, IsEmail, IsInt, IsString, MaxLength } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'The email of the user' })
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiProperty({ example: 'User Name', description: 'The name of the user' })
  @IsString()
  @MaxLength(50)
  name: string;


  @ApiProperty({ example: 'password', description: 'The password of the user' })
  @IsString()
  @MaxLength(100)
  password: string;
  
}