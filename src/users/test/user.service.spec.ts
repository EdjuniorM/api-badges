import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { UsersRepository } from '../repository/users';
import { CreateUserDto } from '../dtos/create-user-dto';
import { HttpException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
            findById: jest.fn(),
            listAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = { email: 'test@example.com', name: 'Test User', password: 'password' };
      const createdUser = { id: 1, email: 'test@example.com', name: 'Test User', password: 'password', createdAt: new Date(), updatedAt: new Date() };
      jest.spyOn(repository, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(repository, 'create').mockResolvedValue(createdUser);

      const result = await service.create(createUserDto);

      expect(result).toEqual({ email: createdUser.email, name: createdUser.name });
    });

    it('should throw an error if user already exists', async () => {
      const createUserDto: CreateUserDto = { email: 'test@example.com', name: 'Test User', password: 'password' };
      const existingUser = { id: 1, email: 'test@example.com', name: 'Test User', password: 'password', createdAt: new Date(), updatedAt: new Date() };
      jest.spyOn(repository, 'findByEmail').mockResolvedValue(existingUser);

      await expect(service.create(createUserDto)).rejects.toThrow(HttpException);
    });
  });

  describe('findById', () => {
    it('should return a user', async () => {
      const user = { id: 1, email: 'test@example.com', name: 'Test User', password: 'password', createdAt: new Date(), updatedAt: new Date() };
      jest.spyOn(repository, 'findById').mockResolvedValue(user);

      const result = await service.findById(user.id);

      expect(result).toEqual({ email: user.email, name: user.name });
    });

    it('should throw an error if user not found', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(null);

      await expect(service.findById(999)).rejects.toThrow(HttpException);
    });
  });

  describe('listAll', () => {
    it('should return all users', async () => {
      const users = [{ id: 1, email: 'test@example.com', name: 'Test User', password: 'password', createdAt: new Date(), updatedAt: new Date() }];
      jest.spyOn(repository, 'listAll').mockResolvedValue(users);

      const result = await service.listAll();

      expect(result).toEqual(users);
    });
  });
});
