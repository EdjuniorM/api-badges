import { IsString, MaxLength } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddBadgeDto {  
    @ApiProperty({ example: "cda", description: 'The Slug of the badge' })
    @IsString()
    @MaxLength(50)
    badgeSlug: string;
  }