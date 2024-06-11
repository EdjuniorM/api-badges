import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UserBadgeService } from './user-badge.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AddBadgeDto } from './dtos/add-badge.dto';

@ApiTags('user-badge')
@ApiBearerAuth()
@Controller('user-badge')
export class UserBadgeController {
    constructor(private readonly userBadgeService: UserBadgeService) {}

    @UseGuards(AuthGuard)
    @Post()
    @ApiOperation({ summary: 'Add badge to user' })
    @ApiResponse({ status: 201, description: 'The badge has been successfully added.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    async addBadge(@Request() req, @Body() addBadgeDto: AddBadgeDto) {
        const userId = req.user.sub; 
        return this.userBadgeService.create({ userId, badgeSlug: addBadgeDto.badgeSlug });
    }

    @UseGuards(AuthGuard)
    @Get('me/badges')
    @ApiOperation({ summary: 'Get current user with badges' })
    @ApiResponse({ status: 200, description: 'User with badges retrieved successfully.' })
    async findBadgeByUserId(@Request() req) {
      const userId = req.user.sub;
      return this.userBadgeService.findBadgeByUserId(userId);
    }
}
