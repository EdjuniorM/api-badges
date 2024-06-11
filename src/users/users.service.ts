import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersRepository } from './repository/users';
import { User } from './entity/User';

@Injectable()
export class UsersService {
    constructor(private readonly repositoy: UsersRepository) {}

    async create(createUserDto: CreateUserDto) {
      const user = await this.repositoy.findByEmail(createUserDto.email);
      if (user) {
        throw new HttpException('Usuário ja existe', 400);
      }
      const userWithoutId = new User({ 
        email: createUserDto.email, 
        name: createUserDto.name, 
        password: createUserDto.password 
      });
      return this.repositoy.create(userWithoutId);
    }
   
  }
  