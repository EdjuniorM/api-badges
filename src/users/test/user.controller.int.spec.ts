import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('UsersController (integration)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtService: JwtService;
  let accessToken: string;
  let userId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);
    jwtService = moduleFixture.get<JwtService>(JwtService);

    await prisma.userBadge.deleteMany({});
    await prisma.badge.deleteMany({});
    await prisma.user.deleteMany({});

    const user = await prisma.user.create({
      data: {
        email: 'userTest@example.com',
        name: 'Test User',
        password: 'password',
      },
    });

    userId = user.id;
    accessToken = jwtService.sign({ sub: userId, email: 'userTest@example.com' });
    console.log('accessToken', accessToken);
  }, 20000);
  

  afterAll(async () => {
    await prisma.userBadge.deleteMany({});
    await prisma.badge.deleteMany({});
    await prisma.user.deleteMany({});
    await app.close();
  });

  it('/users (POST) - should create a user', async () => {
    const createUserDto = { email: 'newuser@example.com', name: 'New User', password: 'password' };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining({ email: createUserDto.email, name: createUserDto.name }));
  });

  it('/users/me (GET) - should return current user data', async () => {
    console.log('accessToken2', accessToken);
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({ email: 'userTest@example.com', name: 'Test User' }));
  });

  it('/users (POST) - should return 400 if user already exists', async () => {
    const createUserDto = { email: 'newuser@example.com', name: 'Test User', password: 'password' };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto);

    expect(response.status).toBe(400);
  });
});
