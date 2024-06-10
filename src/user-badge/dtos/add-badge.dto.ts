import { IsInt } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddBadgeDto {  
    @ApiProperty({ example: 2, description: 'The ID of the badge' })
    @IsInt()
    badgeId: number;
  }