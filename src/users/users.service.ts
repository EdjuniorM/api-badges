import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersRepository } from './repository/users';
import { User } from './entity/User';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly repositoy: UsersRepository) {}

    async create(createUserDto: CreateUserDto): Promise<UserDto | null> {
      try{
      const user = await this.repositoy.findByEmail(createUserDto.email);
      if (user) {
        throw new HttpException('Usuário ja existe', 400);
      }
      const userWithoutId = new User({ 
        email: createUserDto.email, 
        name: createUserDto.name, 
        password: createUserDto.password 
      });
      const cretateUser = await this.repositoy.create(userWithoutId);

      const userDto = {
        email: cretateUser.email,
        name: cretateUser.name
      }

      return userDto;
      } catch (error) {
        throw new HttpException(error, error.status);
      }
    }

    async findById(id: number) {
      try{
      const user = await this.repositoy.findById(id);

      const userDto = {
        email: user.email,
        name: user.name
      }

      return userDto;
      } catch (error) {
        throw new HttpException(error, 400);
      }
    }
   
    async listAll() {
      return this.repositoy.listAll();
    }
  }
  