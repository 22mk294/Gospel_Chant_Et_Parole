# Script de déploiement PowerShell pour Gospel Chant et Parole Backend

Write-Host "🚀 Déploiement du backend Gospel Chant et Parole" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green

# Vérifier le statut git
Write-Host "📋 Vérification du statut Git..." -ForegroundColor Yellow
git status

# Ajouter tous les fichiers modifiés
Write-Host "📦 Ajout des fichiers modifiés..." -ForegroundColor Yellow
git add .

# Commit avec message automatique
$commitMessage = "Fix: Configuration PostgreSQL pour production Render - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Write-Host "💾 Commit des modifications..." -ForegroundColor Yellow
git commit -m $commitMessage

# Push vers le repository
Write-Host "🚀 Push vers GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host "✅ Déploiement terminé !" -ForegroundColor Green
Write-Host "🔗 Render va automatiquement redéployer votre application" -ForegroundColor Cyan
Write-Host "🌐 URL: https://gospel-chant-et-parole.onrender.com" -ForegroundColor Cyan
