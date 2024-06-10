import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersRepository } from './repository/users';

@Injectable()
export class UsersService {
    constructor(private readonly repositoy: UsersRepository) {}

    async create(createUserDto: CreateUserDto) {
      return this.repositoy.create(createUserDto);
    }
   
  }
  