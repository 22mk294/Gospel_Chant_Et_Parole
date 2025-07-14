# Script de déploiement automatique Vercel
# Exécuter dans PowerShell en tant qu'administrateur

Write-Host "🚀 Déploiement Frontend Gospel sur Vercel" -ForegroundColor Green
Write-Host "==============================================" -ForegroundColor Green

# Vérifier si nous sommes dans le bon répertoire
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Erreur: package.json non trouvé" -ForegroundColor Red
    Write-Host "Veuillez exécuter ce script depuis le dossier admin" -ForegroundColor Yellow
    exit 1
}

# Vérifier si Vercel CLI est installé
try {
    vercel --version | Out-Null
    Write-Host "✅ Vercel CLI détecté" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel CLI non installé" -ForegroundColor Red
    Write-Host "Installation en cours..." -ForegroundColor Yellow
    npm install -g vercel
}

# Vérifier si l'utilisateur est connecté
Write-Host "🔐 Vérification de la connexion Vercel..." -ForegroundColor Cyan
try {
    $whoami = vercel whoami 2>&1
    if ($whoami -match "Not authenticated") {
        Write-Host "❌ Non connecté à Vercel" -ForegroundColor Red
        Write-Host "Veuillez vous connecter avec: vercel login" -ForegroundColor Yellow
        exit 1
    } else {
        Write-Host "✅ Connecté à Vercel" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Erreur de connexion Vercel" -ForegroundColor Red
    Write-Host "Veuillez vous connecter avec: vercel login" -ForegroundColor Yellow
    exit 1
}

# Build de l'application
Write-Host "🔨 Build de l'application..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors du build" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build réussi" -ForegroundColor Green

# Déploiement sur Vercel
Write-Host "🚀 Déploiement sur Vercel..." -ForegroundColor Cyan
Write-Host "Suivez les instructions interactives..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Réponses suggérées:" -ForegroundColor Yellow
Write-Host "- Link to existing project? → N" -ForegroundColor Gray
Write-Host "- Project name? → gospel-admin" -ForegroundColor Gray
Write-Host "- Directory? → ./ (ou appuyer Entrée)" -ForegroundColor Gray
Write-Host "- Override settings? → N" -ForegroundColor Gray
Write-Host ""

# Lancer le déploiement
vercel --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "🎉 Déploiement réussi!" -ForegroundColor Green
    Write-Host "================================================" -ForegroundColor Green
    Write-Host "🌐 Frontend: Voir l'URL fournie par Vercel" -ForegroundColor Cyan
    Write-Host "🔗 Backend: https://gospel-chant-et-parole.onrender.com" -ForegroundColor Cyan
    Write-Host "================================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "❌ Erreur lors du déploiement" -ForegroundColor Red
    Write-Host "Consultez les logs ci-dessus pour plus d'informations" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "💡 Solutions possibles:" -ForegroundColor Yellow
    Write-Host "1. Vérifiez votre connexion Internet" -ForegroundColor Gray
    Write-Host "2. Réessayez avec: vercel --prod" -ForegroundColor Gray
    Write-Host "3. Utilisez l'interface web: https://vercel.com/dashboard" -ForegroundColor Gray
}

Write-Host ""
Write-Host "📚 Guide complet disponible dans: VERCEL_DEPLOYMENT_GUIDE.md" -ForegroundColor Cyan
