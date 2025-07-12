# Script PowerShell pour tester les nouveaux endpoints
Write-Host "=== Test des nouveaux endpoints du backend Gospel ===" -ForegroundColor Green

# Test du health check
Write-Host "`n1. Test du health check:" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method GET
    Write-Host "✅ Health check: $($response.status)" -ForegroundColor Green
    Write-Host "   Message: $($response.message)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Erreur health check: $($_.Exception.Message)" -ForegroundColor Red
}

# Test des statistiques
Write-Host "`n2. Test des statistiques:" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/stats/dashboard" -Method GET
    Write-Host "✅ Stats dashboard récupérées" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur stats: $($_.Exception.Message)" -ForegroundColor Red
}

# Test de la synchronisation
Write-Host "`n3. Test de la synchronisation:" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/sync/status" -Method GET
    Write-Host "✅ Sync status récupéré" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur sync: $($_.Exception.Message)" -ForegroundColor Red
}

# Test des endpoints existants
Write-Host "`n4. Test des endpoints existants:" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/chants" -Method GET
    Write-Host "✅ Chants endpoint accessible" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur chants: $($_.Exception.Message)" -ForegroundColor Red
}

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/categories" -Method GET
    Write-Host "✅ Categories endpoint accessible" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur categories: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== Test terminé ===" -ForegroundColor Green
