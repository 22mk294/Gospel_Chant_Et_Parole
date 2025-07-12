// Tests pour le module Auth
const request = require('supertest');
const app = require('../app');
const { Admin } = require('../models');
const bcrypt = require('bcrypt');

afterAll(async () => {
  // Nettoyage désactivé pour éviter les erreurs de connexion fermée
  // await Admin.destroy({ where: {} });
});

describe('Auth API', () => {
  
  describe('POST /api/auth/register', () => {
    it('should register a new admin with valid data', async () => {
      const adminData = {
        username: 'testadmin',
        password: 'TestPass123'
      };

      const res = await request(app)
        .post('/api/auth/register')
        .send(adminData)
        .expect(201);

      expect(res.body.message).toBe('Administrateur créé avec succès');
      expect(res.body.data.username).toBe(adminData.username);
      expect(res.body.data).not.toHaveProperty('password');
    });

    it('should reject registration with weak password', async () => {
      const adminData = {
        username: 'testadmin2',
        password: 'weak' // Mot de passe faible
      };

      await request(app)
        .post('/api/auth/register')
        .send(adminData)
        .expect(400);
    });

    it('should reject registration with invalid username', async () => {
      const adminData = {
        username: 'te', // Trop court
        password: 'TestPass123'
      };

      await request(app)
        .post('/api/auth/register')
        .send(adminData)
        .expect(400);
    });

    it('should reject registration with special characters in username', async () => {
      const adminData = {
        username: 'test@admin', // Caractères spéciaux non autorisés
        password: 'TestPass123'
      };

      await request(app)
        .post('/api/auth/register')
        .send(adminData)
        .expect(400);
    });

    it('should reject registration of duplicate username', async () => {
      const adminData = {
        username: 'duplicate',
        password: 'TestPass123'
      };

      // Créer le premier admin
      await request(app)
        .post('/api/auth/register')
        .send(adminData)
        .expect(201);

      // Essayer de créer à nouveau
      await request(app)
        .post('/api/auth/register')
        .send(adminData)
        .expect(400);
    });
  });

  describe('POST /api/auth/login', () => {
    let testAdmin;

    beforeAll(async () => {
      // Créer un admin de test
      const hashedPassword = await bcrypt.hash('TestPass123', 12);
      testAdmin = await Admin.create({
        username: 'logintest',
        password: hashedPassword
      });
    });

    it('should login with valid credentials', async () => {
      const loginData = {
        username: 'logintest',
        password: 'TestPass123'
      };

      const res = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200);

      expect(res.body.message).toBe('Connexion réussie');
      expect(res.body).toHaveProperty('token');
      expect(res.body.admin.username).toBe(loginData.username);
      expect(res.body.admin).not.toHaveProperty('password');
    });

    it('should reject login with invalid username', async () => {
      const loginData = {
        username: 'nonexistent',
        password: 'TestPass123'
      };

      await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(401);
    });

    it('should reject login with invalid password', async () => {
      const loginData = {
        username: 'logintest',
        password: 'wrongpassword'
      };

      await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(401);
    });

    it('should reject login with missing credentials', async () => {
      await request(app)
        .post('/api/auth/login')
        .send({})
        .expect(400);
    });
  });

  describe('GET /api/auth/profile', () => {
    let testAdmin;
    let adminToken;

    beforeAll(async () => {
      const hashedPassword = await bcrypt.hash('TestPass123', 12);
      testAdmin = await Admin.create({
        username: 'profiletest',
        password: hashedPassword
      });

      // Login pour obtenir le token
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'profiletest',
          password: 'TestPass123'
        });

      adminToken = loginRes.body.token;
    });

    it('should get profile with valid token', async () => {
      const res = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.data.username).toBe('profiletest');
      expect(res.body.data).not.toHaveProperty('password');
    });

    it('should reject profile request without token', async () => {
      await request(app)
        .get('/api/auth/profile')
        .expect(401);
    });

    it('should reject profile request with invalid token', async () => {
      await request(app)
        .get('/api/auth/profile')
        .set('Authorization', 'Bearer invalidtoken')
        .expect(403);
    });
  });
});
