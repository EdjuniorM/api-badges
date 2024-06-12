import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dtos/create-user-dto';
import { UserDto } from '../dtos/user.dto';
import { Request } from 'express';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = { email: 'test@example.com', name: 'Test User', password: 'password' };
      const userDto: UserDto = { email: 'test@example.com', name: 'Test User' };
      jest.spyOn(service, 'create').mockResolvedValue(userDto);

      const result = await controller.create(createUserDto);

      expect(result).toEqual(userDto);
    });
  });

  describe('findById', () => {
    it('should return a user', async () => {
      const userDto: UserDto = { email: 'test@example.com', name: 'Test User' };
      jest.spyOn(service, 'findById').mockResolvedValue(userDto);

      const req = { user: { sub: 1 } };
      const result = await controller.findDataUser(req);

      expect(result).toEqual(userDto);
    });
  });
});
