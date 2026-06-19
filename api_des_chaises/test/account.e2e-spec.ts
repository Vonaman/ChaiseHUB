import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Account Controller (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /accounts/login', () => {
    // Test 1: Login réussi avec un compte existant
    it('should login successfully with valid credentials', () => {
      return request(app.getHttpServer())
        .post('/accounts/login')
        .send({
          email: 'alice@demo.com',
          passwordHash: 'alice123',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('username', 'alice');
          expect(res.body).toHaveProperty('email', 'alice@demo.com');
          expect(res.body).toHaveProperty('role', 'user');
          // Le mot de passe ne doit PAS être retourné
          expect(res.body).not.toHaveProperty('passwordHash');
        });
    });

    // Test 2: Login échoué - email incorrect
    it('should fail login with non-existent email', () => {
      return request(app.getHttpServer())
        .post('/accounts/login')
        .send({
          email: 'nonexistent@demo.com',
          passwordHash: 'password123',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('Email ou mot de passe incorrect');
        });
    });

    // Test 3: Login échoué - mauvais mot de passe
    it('should fail login with incorrect password', () => {
      return request(app.getHttpServer())
        .post('/accounts/login')
        .send({
          email: 'alice@demo.com',
          passwordHash: 'wrongpassword',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('Email ou mot de passe incorrect');
        });
    });

    // Test 4: Login échoué - corps vide
    it('should fail login with empty body', () => {
      return request(app.getHttpServer())
        .post('/accounts/login')
        .send({})
        .expect(400);
    });

    // Test 5: Login réussi - autre compte par défaut
    it('should login successfully with admin account', () => {
      return request(app.getHttpServer())
        .post('/accounts/login')
        .send({
          email: 'admin@admin.admin',
          passwordHash: 'admin',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('username', 'admin');
          expect(res.body).toHaveProperty('role', 'admin');
          expect(res.body).not.toHaveProperty('passwordHash');
        });
    });
  });

  describe('POST /accounts (register)', () => {
    // Test 6: Inscription réussie avec nouvel utilisateur
    it('should register successfully with new user', () => {
      return request(app.getHttpServer())
        .post('/accounts')
        .send({
          username: 'testuser',
          email: `test${Date.now()}@demo.com`, // Email unique avec timestamp
          passwordHash: 'password123',
          role: 'user',
          isActive: true,
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('username', 'testuser');
          expect(res.body).not.toHaveProperty('passwordHash');
        });
    });

    // Test 7: Inscription échouée - email en doublon
    it('should fail registration with duplicate email', () => {
      return request(app.getHttpServer())
        .post('/accounts')
        .send({
          username: 'another_user',
          email: 'alice@demo.com', // Email déjà existant
          passwordHash: 'password123',
          role: 'user',
          isActive: true,
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('email');
        });
    });

    // Test 8: Inscription échouée - username en doublon
    it('should fail registration with duplicate username', () => {
      return request(app.getHttpServer())
        .post('/accounts')
        .send({
          username: 'alice', // Username déjà existant
          email: `unique${Date.now()}@demo.com`,
          passwordHash: 'password123',
          role: 'user',
          isActive: true,
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('username');
        });
    });
  });

  describe('GET /accounts/:id', () => {
    // Test 9: Récupération d'un compte valide
    it('should get account by valid ID', () => {
      return request(app.getHttpServer())
        .get('/accounts/1')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id', 1);
          expect(res.body).toHaveProperty('username');
        });
    });

    // Test 10: ID invalide (NaN)
    it('should fail with invalid ID (NaN)', () => {
      return request(app.getHttpServer())
        .get('/accounts/invalid')
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('ID invalide');
        });
    });

    // Test 11: ID n'existe pas
    it('should fail with non-existent ID', () => {
      return request(app.getHttpServer())
        .get('/accounts/99999')
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toContain('non trouvé');
        });
    });
  });
});
