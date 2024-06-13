import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { UserBadgeService } from './user-badge.service';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AddBadgeDto } from './dtos/add-badge.dto';

@ApiTags('user-badge')
@ApiBearerAuth()
@Controller('user-badge')
export class UserBadgeController {
    constructor(private readonly userBadgeService: UserBadgeService) {}

    @ApiBearerAuth()
    @Post()
    @ApiOperation({ summary: 'Add badge to user' })
    @ApiResponse({ status: 201, description: 'The badge has been successfully added.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    async addBadge(@Request() req, @Body() addBadgeDto: AddBadgeDto) {
        const userId = req.user.sub; 
        return this.userBadgeService.create({ userId, badgeSlug: addBadgeDto.badgeSlug });
    }

    @ApiBearerAuth()
    @Get('me/badges')
    @ApiOperation({ summary: 'Get current user with badges' })
    @ApiResponse({ status: 200, description: 'User with badges retrieved successfully.' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
    @ApiQuery({ name: 'size', required: false, type: Number, description: 'Page size' })
    @ApiQuery({ name: 'sort', required: false, type: String, description: 'Sort field' })
    @ApiQuery({ name: 'order', required: false, type: String, description: 'Sort order' })
    @ApiQuery({ name: 'search', required: false, type: String, description: 'Search query' })

    async findBadgeByUserId(@Request() req) {
      const userId = req.user.sub;
      return this.userBadgeService.findBadgeByUserId(
        req.query.page ? parseInt(req.query.page, 10) : 1,
        req.query.size ? parseInt(req.query.size, 10) : 10,
        req.query.sort ? req.query.sort : 'createdAt',
        req.query.order ? req.query.order : 'asc',
        req.query.search ? req.query.search : '',
        userId
      );
    }

    @ApiBearerAuth()
    @Delete('me/badges/:badgeId')
    @ApiOperation({ summary: 'Remove badge from user' })
    @ApiResponse({ status: 200, description: 'The badge has been successfully removed.' })
    @ApiResponse({ status: 404, description: 'Badge not found.' })
    @ApiParam({ name: 'badgeId', type: Number })
    async removeBadge(@Request() req, @Param('badgeId', ParseIntPipe) badgeId: number) {
      const userId = req.user.sub;
      return this.userBadgeService.removeBadge(userId, badgeId);
    }

    @ApiBearerAuth()
    @Get('client/:userId')
    @ApiOperation({ summary: 'Get current user with badges' })
    @ApiResponse({ status: 200, description: 'User with badges retrieved successfully.' })
    @ApiParam({ name: 'userId', type: Number })
    async getUserBadges(@Param('userId', ParseIntPipe) userId: number) {
      return this.userBadgeService.getUserBadges(userId);
    }
}
