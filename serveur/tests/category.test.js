// Tests pour le module Category
const request = require('supertest');
const app = require('../app');
const { Category, Admin, Chant } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let adminToken;
let testAdmin;

beforeAll(async () => {
  // Créer un admin de test
  const hashedPassword = await bcrypt.hash('testpass123', 10);
  testAdmin = await Admin.create({
    username: 'testadmin_cat',
    password: hashedPassword
  });

  // Générer un token pour les tests
  adminToken = jwt.sign(
    { id: testAdmin.id, username: testAdmin.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
});

afterAll(async () => {
  // Nettoyage désactivé pour éviter les erreurs de connexion fermée
  // await Chant.destroy({ where: {} });
  // await Category.destroy({ where: {} });
  // await Admin.destroy({ where: { username: 'testadmin_cat' } });
});

describe('Category API', () => {
  
  describe('GET /api/categories', () => {
    it('should fetch all categories', async () => {
      const res = await request(app)
        .get('/api/categories')
        .expect(200);

      expect(res.body).toHaveProperty('total');
      expect(res.body).toHaveProperty('data');
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('POST /api/categories', () => {
    it('should create a new category with valid data', async () => {
      const categoryData = {
        name: 'Gospel Moderne'
      };

      const res = await request(app)
        .post('/api/categories')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(categoryData)
        .expect(201);

      expect(res.body.message).toBe('Catégorie créée avec succès');
      expect(res.body.data.name).toBe(categoryData.name);
    });

    it('should reject creation without authentication', async () => {
      const categoryData = {
        name: 'Test Category'
      };

      await request(app)
        .post('/api/categories')
        .send(categoryData)
        .expect(401);
    });

    it('should reject creation with invalid data', async () => {
      const invalidData = {
        name: '' // Nom vide
      };

      await request(app)
        .post('/api/categories')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(invalidData)
        .expect(400);
    });

    it('should reject creation of duplicate category', async () => {
      const categoryData = {
        name: 'Duplicate Category'
      };

      // Créer la première fois
      await request(app)
        .post('/api/categories')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(categoryData)
        .expect(201);

      // Essayer de créer à nouveau
      await request(app)
        .post('/api/categories')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(categoryData)
        .expect(400);
    });
  });

  describe('GET /api/categories/:id', () => {
    let testCategory;

    beforeAll(async () => {
      testCategory = await Category.create({
        name: 'Test Category for Get'
      });
    });

    it('should fetch a specific category by ID', async () => {
      const res = await request(app)
        .get(`/api/categories/${testCategory.id}`)
        .expect(200);

      expect(res.body.id).toBe(testCategory.id);
      expect(res.body.name).toBe(testCategory.name);
    });

    it('should return 404 for non-existent category', async () => {
      await request(app)
        .get('/api/categories/9999')
        .expect(404);
    });
  });

  describe('PUT /api/categories/:id', () => {
    let testCategory;

    beforeEach(async () => {
      testCategory = await Category.create({
        name: 'Original Category Name'
      });
    });

    afterEach(async () => {
      await Category.destroy({ where: { id: testCategory.id } });
    });

    it('should update a category with valid data', async () => {
      const updateData = {
        name: 'Updated Category Name'
      };

      const res = await request(app)
        .put(`/api/categories/${testCategory.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateData)
        .expect(200);

      expect(res.body.message).toBe('Catégorie mise à jour avec succès');
    });

    it('should reject update without authentication', async () => {
      const updateData = {
        name: 'Updated Name'
      };

      await request(app)
        .put(`/api/categories/${testCategory.id}`)
        .send(updateData)
        .expect(401);
    });

    it('should return 404 for non-existent category', async () => {
      const updateData = {
        name: 'Updated Name'
      };

      await request(app)
        .put('/api/categories/9999')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateData)
        .expect(404);
    });
  });

  describe('DELETE /api/categories/:id', () => {
    let testCategory;

    beforeEach(async () => {
      testCategory = await Category.create({
        name: 'Category to Delete'
      });
    });

    it('should delete a category without chants', async () => {
      await request(app)
        .delete(`/api/categories/${testCategory.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      // Vérifier que la catégorie a été supprimée
      const deletedCategory = await Category.findByPk(testCategory.id);
      expect(deletedCategory).toBeNull();
    });

    it('should reject deletion of category with chants', async () => {
      // Créer un chant associé à la catégorie
      await Chant.create({
        title: 'Test Chant',
        lyrics: 'Test lyrics',
        category_id: testCategory.id
      });

      await request(app)
        .delete(`/api/categories/${testCategory.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400);
    });

    it('should reject deletion without authentication', async () => {
      await request(app)
        .delete(`/api/categories/${testCategory.id}`)
        .expect(401);
    });

    it('should return 404 for non-existent category', async () => {
      await request(app)
        .delete('/api/categories/9999')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
    });
  });
});
