#!/bin/bash
# Installation des dépendances de sécurité

echo "🔒 Installation des packages de sécurité..."

# Helmet pour headers sécurisés
npm install helmet

# Winston pour logging
npm install winston

# Express-slow-down pour protection brute force
npm install express-slow-down

# Joi pour validation avancée (optionnel)
npm install joi

echo "✅ Packages de sécurité installés"
echo "📝 Consultez SECURITY_ANALYSIS.md pour les étapes suivantes"
