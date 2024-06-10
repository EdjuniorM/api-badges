import { IsString, MaxLength } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBadgeDto {
    @ApiProperty({ example: 'unique-slug', description: 'The slug of the badge' })
    @IsString()
    @MaxLength(50)
    slug: string;
  
    @ApiProperty({ example: 'Badge Name', description: 'The name of the badge' })
    @IsString()
    @MaxLength(100)
    name: string;
  
    @ApiProperty({ example: 'https://example.com/image.png', description: 'The URL of the badge image' })
    @IsString()
    @MaxLength(255)
    imageUrl: string;
  }