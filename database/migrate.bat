@echo off
chcp 65001 >nul
echo.
echo 🎵 Gospel Chant et Parole - Migration de base de données
echo ========================================================

REM Variables de configuration
set DB_HOST=localhost
set DB_NAME=gospelchantetparole
set DB_USER=root

REM Demander le mot de passe MySQL
echo 🔐 Veuillez entrer le mot de passe MySQL pour l'utilisateur root:
set /p DB_PASSWORD=

REM Vérifier la connexion
echo 🔍 Vérification de la connexion à la base de données...
mysql -h%DB_HOST% -u%DB_USER% -p%DB_PASSWORD% -e "SELECT 1" 2>nul
if %errorlevel% neq 0 (
    echo ❌ Erreur: Impossible de se connecter à la base de données
    echo Vérifiez vos paramètres de connexion
    pause
    exit /b 1
)

echo ✅ Connexion à la base de données réussie

REM Créer un backup de la base de données existante
echo 💾 Création d'un backup de la base de données existante...
set BACKUP_FILE=backup_%date:~6,4%%date:~3,2%%date:~0,2%_%time:~0,2%%time:~3,2%%time:~6,2%.sql
set BACKUP_FILE=%BACKUP_FILE: =0%
mysqldump -h%DB_HOST% -u%DB_USER% -p%DB_PASSWORD% %DB_NAME% > %BACKUP_FILE% 2>nul

if %errorlevel% equ 0 (
    echo ✅ Backup créé: %BACKUP_FILE%
) else (
    echo ⚠️  Attention: Impossible de créer le backup
    echo Voulez-vous continuer sans backup? (y/N)
    set /p CONTINUE=
    if /i not "%CONTINUE%"=="y" (
        echo ❌ Migration annulée
        pause
        exit /b 1
    )
)

REM Exécuter la migration
echo 🔄 Exécution de la migration...
mysql -h%DB_HOST% -u%DB_USER% -p%DB_PASSWORD% %DB_NAME% < migration_v2.sql

if %errorlevel% equ 0 (
    echo ✅ Migration terminée avec succès!
    echo 📊 Vérification des tables créées:
    mysql -h%DB_HOST% -u%DB_USER% -p%DB_PASSWORD% %DB_NAME% -e "SHOW TABLES;"
) else (
    echo ❌ Erreur lors de la migration
    echo 💾 Vous pouvez restaurer la base de données avec:
    echo mysql -h%DB_HOST% -u%DB_USER% -p%DB_PASSWORD% %DB_NAME% ^< %BACKUP_FILE%
    pause
    exit /b 1
)

echo.
echo 🎉 Migration terminée avec succès!
echo 🚀 Votre base de données est maintenant prête pour la version 2.0
echo 📋 Nouvelles tables ajoutées:
echo    - Favoris (gestion des favoris)
echo    - Signalements (signalement de contenu)
echo    - Statistiques (analytics)
echo    - Synchronizations (sync hors ligne)
echo.
echo 🔧 N'oubliez pas de redémarrer votre serveur backend!
echo.
pause
