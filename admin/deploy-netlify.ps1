# 🚀 Script de Déploiement Netlify
# Utilisez ce script pour déployer rapidement

# Étape 1: Construction du projet
Write-Host "🔨 Construction du projet..." -ForegroundColor Green
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build réussi!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📁 Dossier dist/ créé avec succès"
    Write-Host "📊 Taille du build:" -ForegroundColor Yellow
    Get-ChildItem -Path "dist" -Recurse | Measure-Object -Property Length -Sum | ForEach-Object {
        $size = [math]::Round($_.Sum / 1MB, 2)
        Write-Host "   $size MB" -ForegroundColor Cyan
    }
    Write-Host ""
    Write-Host "🌐 Prêt pour le déploiement Netlify!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Options de déploiement:" -ForegroundColor Yellow
    Write-Host "1. Manuel: Allez sur https://netlify.com et glissez-déposez le dossier dist/"
    Write-Host "2. CLI: npm install -g netlify-cli && netlify deploy --prod --dir=dist"
    Write-Host "3. Git: Push sur GitHub et connectez à Netlify"
    Write-Host ""
    Write-Host "📝 Voir NETLIFY_DEPLOYMENT_GUIDE.md pour plus de détails"
    
    # Ouvrir le dossier dist dans l'explorateur
    Write-Host "📂 Ouverture du dossier dist..." -ForegroundColor Blue
    Start-Process explorer "dist"
} else {
    Write-Host "❌ Erreur lors du build" -ForegroundColor Red
    Write-Host "🔧 Vérifiez les erreurs ci-dessus"
}
