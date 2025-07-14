#!/usr/bin/env pwsh

# Script pour tester le build du frontend
Write-Host "🔄 Test du build frontend..." -ForegroundColor Yellow

# Naviguer vers le dossier admin
Set-Location -Path "admin"

# Installer les dépendances si nécessaire
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installation des dépendances..." -ForegroundColor Blue
    npm install
}

# Tester le build
Write-Host "🏗️ Build en cours..." -ForegroundColor Blue
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build réussi ! Le frontend est prêt pour Vercel." -ForegroundColor Green
    Write-Host "📂 Fichiers générés dans le dossier 'dist'" -ForegroundColor Green
} else {
    Write-Host "❌ Erreur lors du build" -ForegroundColor Red
}

# Retour au dossier parent
Set-Location -Path ".."
