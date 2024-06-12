import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('UserBadgeController (integration)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtService: JwtService;
  let accessToken: string;
  let userId: number;
  let badgeId: number;

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
        email: 'user@example.com',
        name: 'Test User',
        password: 'password',
      },
    });

    userId = user.id;

    
    accessToken = jwtService.sign({ sub: userId, email: 'user@example.com' });
  });


  afterAll(async () => {
    await app.close();
  });

  it('/user-badge (POST) - should add a badge to user', async () => {
    const badge = await prisma.badge.create({
      data: {
        slug: 'testUser-badge',
        name: 'Test Badge',
        imageUrl: 'http://example.com/image.png',
      },
    });

    badgeId = badge.id;

    const response = await request(app.getHttpServer())
      .post('/user-badge')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ badgeSlug: badge.slug });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        userId: userId,
        badgeId: badge.id,
      }),
    );
  });

  it('/user-badge/me/badges (GET) - should get badges for current user', async () => {

    const response = await request(app.getHttpServer())
      .get('/user-badge/me/badges')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      expect.objectContaining({
        id: response.body[0].id,
        slug: response.body[0].slug,
        name: response.body[0].name,
        imageUrl: response.body[0].imageUrl,
      }),
    ]);
  });

  it('/user-badge/me/badges/:badgeId (DELETE) - should remove a badge from user', async () => {

    const badge = await prisma.badge.create({
      data: {
        slug: 'test-badge-delete',
        name: 'Test Badge-delete',
        imageUrl: 'http://example.com/image.png',
      },
    });

    await prisma.userBadge.create({
      data: {
        userId: userId,
        badgeId: badge.id,
      },
    });

    const response = await request(app.getHttpServer())
      .delete(`/user-badge/me/badges/${badge.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);

    const userBadgeCheck = await prisma.userBadge.findUnique({
      where: {
        badgeId_userId: {
          badgeId: badge.id,
          userId: userId,
        },
      },
    });
    expect(userBadgeCheck).toBeNull();
  });
});
