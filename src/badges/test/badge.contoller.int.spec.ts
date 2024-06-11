import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from 'src/app.module';

describe('BadgesController (integration)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    jwtService = moduleFixture.get<JwtService>(JwtService);
    accessToken = jwtService.sign({ sub: 1, username: 'testuser' }); 
  }, 20000); 

  afterAll(async () => {
    await app.close();
  });

  it('/badges (POST) - should create a badge', () => {
    const createBadgeDto = { slug: 'test-slug', name: 'Test Badge', imageUrl: 'http://example.com/image.png' };
    
    return request(app.getHttpServer())
      .post('/badges')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(createBadgeDto)
      .expect(201)
      .expect(({ body }) => {
        expect(body).toEqual(expect.objectContaining(createBadgeDto));
      });
  });

  it('/badges (POST) - should return 409 if badge slug already exists', () => {
    const createBadgeDto = { slug: 'duplicate-slug', name: 'Duplicate Badge', imageUrl: 'http://example.com/image.png' };

    return request(app.getHttpServer())
      .post('/badges')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(createBadgeDto)
      .expect(201)
      .then(() => {
        return request(app.getHttpServer())
          .post('/badges')
          .set('Authorization', `Bearer ${accessToken}`)
          .send(createBadgeDto)
          .expect(409);
      });
  });
  it('/badges/:id (PUT) - should update a badge', async () => {
    const createBadgeDto = { slug: 'update-slug', name: 'Test Badge', imageUrl: 'http://example.com/image.png' };
    const updateBadgeDto = { name: 'Updated Badge' };

    const createResponse = await request(app.getHttpServer())
      .post('/badges')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(createBadgeDto)
      .expect(201);

    const updateResponse = await request(app.getHttpServer())
      .put(`/badges/${createResponse.body.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updateBadgeDto);

    console.log('Response:', updateResponse.body);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.name).toBe('Updated Badge');
  });

  it('/badges/:id (PUT) - should return 404 if badge is not found', async () => {
    const updateBadgeDto = { name: 'Updated Badge' };

    const response = await request(app.getHttpServer())
      .put('/badges/99999') 
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updateBadgeDto);

    expect(response.status).toBe(404);
  });
});