# Script de test de connexion Frontend-Backend
Write-Host "🔍 Test de Connexion Frontend-Backend Gospel" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

$API_URL = "https://gospel-chant-et-parole.onrender.com/api"
$FRONTEND_URL = "https://votre-app.vercel.app"  # À remplacer par votre URL Vercel

Write-Host ""
Write-Host "📡 Test des endpoints API..." -ForegroundColor Cyan

# Test 1: Health Check Backend
Write-Host "🔄 Test 1: Backend Health Check..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$API_URL/health" -Method Get -TimeoutSec 10
    Write-Host "✅ Backend: OK" -ForegroundColor Green
    Write-Host "   Status: $($response.status)" -ForegroundColor Gray
    Write-Host "   Message: $($response.message)" -ForegroundColor Gray
    Write-Host "   Response Time: $($response.responseTime)ms" -ForegroundColor Gray
} catch {
    Write-Host "❌ Backend: ERREUR" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Gray
}

Write-Host ""

# Test 2: Database Health Check
Write-Host "🔄 Test 2: Database Health Check..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$API_URL/health/database" -Method Get -TimeoutSec 10
    Write-Host "✅ Database: OK" -ForegroundColor Green
    Write-Host "   Status: $($response.status)" -ForegroundColor Gray
    Write-Host "   Connected: $($response.database.connected)" -ForegroundColor Gray
    Write-Host "   Response Time: $($response.responseTime)ms" -ForegroundColor Gray
} catch {
    Write-Host "❌ Database: ERREUR" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Gray
}

Write-Host ""

# Test 3: System Info
Write-Host "🔄 Test 3: System Info..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$API_URL/health/system/info" -Method Get -TimeoutSec 10
    Write-Host "✅ System Info: OK" -ForegroundColor Green
    Write-Host "   Node Version: $($response.system.nodeVersion)" -ForegroundColor Gray
    Write-Host "   Platform: $($response.system.platform)" -ForegroundColor Gray
    Write-Host "   Uptime: $([math]::Round($response.system.uptime, 2))s" -ForegroundColor Gray
    Write-Host "   Database: $($response.database.dialect)" -ForegroundColor Gray
    Write-Host "   Models: $($response.database.modelsLoaded)" -ForegroundColor Gray
    Write-Host "   Admins: $($response.database.counts.admins)" -ForegroundColor Gray
    Write-Host "   Categories: $($response.database.counts.categories)" -ForegroundColor Gray
    Write-Host "   Chants: $($response.database.counts.chants)" -ForegroundColor Gray
} catch {
    Write-Host "❌ System Info: ERREUR" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Gray
}

Write-Host ""

# Test 4: Authentication Test
Write-Host "🔄 Test 4: Authentication Test..." -ForegroundColor Yellow
try {
    $authBody = @{
        username = "admin"
        password = "admin123"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$API_URL/auth/login" -Method Post -Body $authBody -ContentType "application/json" -TimeoutSec 10
    Write-Host "✅ Authentication: OK" -ForegroundColor Green
    Write-Host "   Token: $($response.token.Substring(0, 20))..." -ForegroundColor Gray
    Write-Host "   Admin: $($response.admin.username)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Authentication: ERREUR" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Gray
}

Write-Host ""

# Test 5: Categories List
Write-Host "🔄 Test 5: Categories List..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$API_URL/categories" -Method Get -TimeoutSec 10
    Write-Host "✅ Categories: OK" -ForegroundColor Green
    Write-Host "   Count: $($response.count)" -ForegroundColor Gray
    if ($response.categories.Count -gt 0) {
        Write-Host "   First Category: $($response.categories[0].name)" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ Categories: ERREUR" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Gray
}

Write-Host ""

# Test 6: Chants List
Write-Host "🔄 Test 6: Chants List..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$API_URL/chants" -Method Get -TimeoutSec 10
    Write-Host "✅ Chants: OK" -ForegroundColor Green
    Write-Host "   Count: $($response.count)" -ForegroundColor Gray
    if ($response.chants.Count -gt 0) {
        Write-Host "   First Chant: $($response.chants[0].title)" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ Chants: ERREUR" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Gray
}

Write-Host ""
Write-Host "🎯 Résumé des Tests" -ForegroundColor Green
Write-Host "==================" -ForegroundColor Green
Write-Host "📡 Backend API: $API_URL" -ForegroundColor Cyan
Write-Host "🌐 Frontend: $FRONTEND_URL" -ForegroundColor Cyan
Write-Host ""
Write-Host "Pour tester le frontend :" -ForegroundColor Yellow
Write-Host "1. Allez sur votre URL Vercel" -ForegroundColor Gray
Write-Host "2. Connectez-vous avec: admin / admin123" -ForegroundColor Gray
Write-Host "3. Vérifiez le widget 'Statut de Connexion'" -ForegroundColor Gray
Write-Host "4. Testez l'ajout d'un chant ou d'une catégorie" -ForegroundColor Gray
Write-Host ""
Write-Host "🎵 Votre plateforme Gospel est prête !" -ForegroundColor Green
