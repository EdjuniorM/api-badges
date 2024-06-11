import { Controller, Get, Request, Post, Body, UseGuards } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { CreateBadgeDto } from './dtos/create-badge.dto';
import { Public } from 'src/auth/public.decorator';

@ApiTags('badges')
@Controller('badges')
export class BadgesController {
    constructor(private readonly badgesService: BadgesService) {}

    @Public()
    @Get('pages?')
    @ApiOperation({ summary: 'Paginate badges' })
    @ApiResponse({ status: 200, description: 'Badges paginated successfully.' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
    @ApiQuery({ name: 'size', required: false, type: Number, description: 'Page size' })
    @ApiQuery({ name: 'sort', required: false, type: String, description: 'Sort field' })
    @ApiQuery({ name: 'order', required: false, type: String, description: 'Sort order' })
    @ApiQuery({ name: 'search', required: false, type: String, description: 'Search query' })
    async pagination(@Request() req) {
        return await this.badgesService.paginate(
            req.query.page ? parseInt(req.query.page, 10) : 1,
            req.query.size ? parseInt(req.query.size, 10) : 10,
            req.query.sort ? req.query.sort : 'id',
            req.query.order ? req.query.order : 'asc',
            req.query.search ? req.query.search : '',
        );
    }

    @ApiBearerAuth()
    @Post()
    @ApiOperation({ summary: 'Create a new badge' })
    @ApiResponse({ status: 201, description: 'The badge has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    async create(@Body() createBadgeDto: CreateBadgeDto) {
        return this.badgesService.create(createBadgeDto);
    }
}
