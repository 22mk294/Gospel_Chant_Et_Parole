# Script de test local avec l'API de production
Write-Host "🧪 Test du Frontend avec l'API de production" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

# Vérifier si nous sommes dans le bon répertoire
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Erreur: package.json non trouvé" -ForegroundColor Red
    Write-Host "Veuillez exécuter ce script depuis le dossier admin" -ForegroundColor Yellow
    exit 1
}

# Créer un fichier .env.local pour les tests
$envContent = @"
# Configuration de test local avec API de production
VITE_API_URL=https://gospel-chant-et-parole.onrender.com/api
"@

$envContent | Out-File -FilePath ".env.local" -Encoding UTF8
Write-Host "✅ Configuration .env.local créée" -ForegroundColor Green

# Installer les dépendances si nécessaire
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installation des dépendances..." -ForegroundColor Cyan
    npm install
}

# Démarrer le serveur de développement
Write-Host "🚀 Démarrage du serveur de développement..." -ForegroundColor Cyan
Write-Host "URL locale: http://localhost:5173" -ForegroundColor Yellow
Write-Host "API: https://gospel-chant-et-parole.onrender.com/api" -ForegroundColor Yellow
Write-Host ""
Write-Host "Appuyez sur Ctrl+C pour arrêter le serveur" -ForegroundColor Gray
Write-Host ""

npm run dev
