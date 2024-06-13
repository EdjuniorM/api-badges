import { Controller, Body, Post, Request, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user-dto';
import { Public } from 'src/auth/public.decorator';
@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Public()
    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    async create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @ApiBearerAuth()
    @Get()
    @ApiOperation({ summary: 'Get user data' })
    @ApiResponse({ status: 200, description: 'User data retrieved successfully.' })
    async findDataUser(@Request() req) {
        const userId = req.user.sub;
        return this.usersService.findById(userId);
    }


    @ApiBearerAuth()
    @Get('/listAll')
    @ApiOperation({ summary: 'Get all users data' })
    @ApiResponse({ status: 200, description: 'User data retrieved successfully.' })
    async listAll() {
        return this.usersService.listAll();
    }
}
