// Contrôleur d'authentification
const { Admin } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    
    // Vérifier si l'admin existe déjà (par username ou email si fourni)
    const whereClause = { username };
    if (email) {
      whereClause[Op.or] = [
        { username },
        { email }
      ];
    }
    
    const existingAdmin = await Admin.findOne({ where: whereClause });
    
    if (existingAdmin) {
      return res.status(400).json({
        message: 'Cet utilisateur ou cet email existe déjà'
      });
    }
    
    // Hasher le mot de passe
    const hash = await bcrypt.hash(password, 12);
    
    // Créer l'admin
    const admin = await Admin.create({ 
      username, 
      email: email || null,
      password: hash 
    });
    
    // Retourner sans le mot de passe
    const { password: _, ...adminData } = admin.toJSON();
    
    res.status(201).json({
      message: 'Administrateur créé avec succès',
      data: adminData
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    // Trouver l'admin par username ou email
    const admin = await Admin.findOne({ 
      where: { 
        [Op.or]: [
          { username },
          { email: username } // Permettre de se connecter avec l'email dans le champ username
        ]
      } 
    });
    
    if (!admin) {
      return res.status(401).json({
        message: 'Identifiants invalides'
      });
    }
    
    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({
        message: 'Identifiants invalides'
      });
    }
    
    // Générer le token JWT
    const token = jwt.sign(
      { 
        id: admin.id, 
        username: admin.username,
        email: admin.email
      }, 
      process.env.JWT_SECRET, 
      { 
        expiresIn: '24h' 
      }
    );
    
    // Retourner le token et les infos admin (sans mot de passe)
    const { password: _, ...adminData } = admin.toJSON();
    
    res.json({
      message: 'Connexion réussie',
      token,
      admin: adminData
    });
  } catch (err) {
    next(err);
  }
};

exports.profile = async (req, res, next) => {
  try {
    const admin = await Admin.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!admin) {
      return res.status(404).json({
        message: 'Utilisateur non trouvé'
      });
    }
    
    res.json({
      data: admin
    });
  } catch (err) {
    next(err);
  }
};
