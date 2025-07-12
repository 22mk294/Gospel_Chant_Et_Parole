// Tests pour le module Chant
const request = require('supertest');
const app = require('../app');
const { Chant, Category, Admin } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Configuration de test
let adminToken;
let testAdmin;
let testCategory;

beforeAll(async () => {
  // Créer un admin de test
  const hashedPassword = await bcrypt.hash('testpass123', 10);
  testAdmin = await Admin.create({
    username: 'testadmin',
    password: hashedPassword
  });

  // Générer un token pour les tests
  adminToken = jwt.sign(
    { id: testAdmin.id, username: testAdmin.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // Créer une catégorie de test
  testCategory = await Category.create({
    name: 'Test Category'
  });
});

afterAll(async () => {
  // Nettoyage désactivé pour éviter les erreurs de connexion fermée
  // await Chant.destroy({ where: {} });
  // await Category.destroy({ where: {} });
  // await Admin.destroy({ where: {} });
});

describe('Chant API', () => {
  
  describe('GET /api/chants', () => {
    it('should fetch all chants with pagination', async () => {
      const res = await request(app)
        .get('/api/chants')
        .expect(200);

      expect(res.body).toHaveProperty('total');
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('pagination');
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should handle pagination parameters', async () => {
      const res = await request(app)
        .get('/api/chants?limit=5&offset=0')
        .expect(200);

      expect(res.body.pagination.limit).toBe(5);
      expect(res.body.pagination.offset).toBe(0);
    });

    it('should handle search parameter', async () => {
      // Créer un chant de test
      await Chant.create({
        title: 'Amazing Grace',
        lyrics: 'Amazing grace how sweet the sound',
        category_id: testCategory.id
      });

      const res = await request(app)
        .get('/api/chants?search=Amazing')
        .expect(200);

      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('POST /api/chants', () => {
    it('should create a new chant with valid data', async () => {
      const chantData = {
        title: 'Test Chant',
        lyrics: 'Test lyrics for this chant',
        category_id: testCategory.id
      };

      const res = await request(app)
        .post('/api/chants')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(chantData)
        .expect(201);

      expect(res.body.message).toBe('Chant créé avec succès');
      expect(res.body.data.title).toBe(chantData.title);
    });

    it('should reject creation without authentication', async () => {
      const chantData = {
        title: 'Test Chant',
        lyrics: 'Test lyrics for this chant'
      };

      await request(app)
        .post('/api/chants')
        .send(chantData)
        .expect(401);
    });

    it('should reject creation with invalid data', async () => {
      const invalidData = {
        title: '', // Titre vide
        lyrics: 'Test lyrics'
      };

      await request(app)
        .post('/api/chants')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(invalidData)
        .expect(400);
    });

    it('should reject creation with non-existent category', async () => {
      const chantData = {
        title: 'Test Chant',
        lyrics: 'Test lyrics for this chant',
        category_id: 9999 // ID inexistant
      };

      await request(app)
        .post('/api/chants')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(chantData)
        .expect(400);
    });
  });

  describe('GET /api/chants/:id', () => {
    let testChant;

    beforeAll(async () => {
      testChant = await Chant.create({
        title: 'Test Chant for Get',
        lyrics: 'Test lyrics for get endpoint',
        category_id: testCategory.id
      });
    });

    it('should fetch a specific chant by ID', async () => {
      const res = await request(app)
        .get(`/api/chants/${testChant.id}`)
        .expect(200);

      expect(res.body.id).toBe(testChant.id);
      expect(res.body.title).toBe(testChant.title);
    });

    it('should return 404 for non-existent chant', async () => {
      await request(app)
        .get('/api/chants/9999')
        .expect(404);
    });
  });

  describe('PUT /api/chants/:id', () => {
    let testChant;

    beforeEach(async () => {
      testChant = await Chant.create({
        title: 'Original Title',
        lyrics: 'Original lyrics',
        category_id: testCategory.id
      });
    });

    afterEach(async () => {
      await Chant.destroy({ where: { id: testChant.id } });
    });

    it('should update a chant with valid data', async () => {
      const updateData = {
        title: 'Updated Title',
        lyrics: 'Updated lyrics'
      };

      const res = await request(app)
        .put(`/api/chants/${testChant.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateData)
        .expect(200);

      expect(res.body.message).toBe('Chant mis à jour avec succès');
      expect(res.body.data.title).toBe(updateData.title);
    });

    it('should reject update without authentication', async () => {
      const updateData = {
        title: 'Updated Title'
      };

      await request(app)
        .put(`/api/chants/${testChant.id}`)
        .send(updateData)
        .expect(401);
    });

    it('should return 404 for non-existent chant', async () => {
      const updateData = {
        title: 'Updated Title'
      };

      await request(app)
        .put('/api/chants/9999')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateData)
        .expect(404);
    });
  });

  describe('DELETE /api/chants/:id', () => {
    let testChant;

    beforeEach(async () => {
      testChant = await Chant.create({
        title: 'Chant to Delete',
        lyrics: 'This will be deleted',
        category_id: testCategory.id
      });
    });

    it('should delete a chant', async () => {
      await request(app)
        .delete(`/api/chants/${testChant.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      // Vérifier que le chant a été supprimé
      const deletedChant = await Chant.findByPk(testChant.id);
      expect(deletedChant).toBeNull();
    });

    it('should reject deletion without authentication', async () => {
      await request(app)
        .delete(`/api/chants/${testChant.id}`)
        .expect(401);
    });

    it('should return 404 for non-existent chant', async () => {
      await request(app)
        .delete('/api/chants/9999')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
    });
  });
});
