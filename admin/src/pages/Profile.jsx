import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Grid,
  TextField,
  Button,
  IconButton,
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  useTheme,
  alpha,
  Paper,
  LinearProgress,
  Switch,
  FormControlLabel,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
  Lock,
  Person,
  Email,
  Phone,
  LocationOn,
  CalendarToday,
  Security,
  Notifications,
  Dashboard,
  Settings,
  History,
  Visibility,
  VisibilityOff,
  PhotoCamera,
  Delete,
  Download,
  Upload,
  Key,
  Shield,
  Schedule,
  DeviceHub,
  Language,
  Palette,
  VolumeUp,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const Profile = () => {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showSecurityDialog, setShowSecurityDialog] = useState(false);

  // États pour les informations du profil
  const [profile, setProfile] = useState({
    username: 'admin',
    email: 'admin@gospelchantetparole.com',
    firstName: 'Administrateur',
    lastName: 'Principal',
    phone: '+33 1 23 45 67 89',
    address: 'Paris, France',
    bio: 'Administrateur principal de la plateforme Gospel Chante et Parole',
    joinedDate: new Date('2024-01-01'),
    avatar: null,
    preferences: {
      notifications: true,
      emailNotifications: true,
      smsNotifications: false,
      darkMode: false,
      language: 'fr',
      timezone: 'Europe/Paris',
    },
    security: {
      twoFactorEnabled: false,
      lastPasswordChange: new Date('2024-01-01'),
      activeSessions: 1,
      loginHistory: [
        { date: new Date(), ip: '192.168.1.100', device: 'Chrome on Windows', success: true },
        { date: new Date(Date.now() - 24 * 60 * 60 * 1000), ip: '192.168.1.100', device: 'Chrome on Windows', success: true },
        { date: new Date(Date.now() - 48 * 60 * 60 * 1000), ip: '192.168.1.102', device: 'Firefox on Windows', success: false },
      ]
    }
  });

  // État pour le changement de mot de passe
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    showCurrentPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleProfileEdit = () => {
    setIsEditing(true);
  };

  const handleProfileSave = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Simulation d'une sauvegarde API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Profil mis à jour avec succès!');
      setIsEditing(false);
    } catch (error) {
      setError('Erreur lors de la sauvegarde du profil');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileCancel = () => {
    setIsEditing(false);
    setError('');
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulation d'un changement de mot de passe
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Mot de passe mis à jour avec succès!');
      setShowPasswordDialog(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        showCurrentPassword: false,
        showNewPassword: false,
        showConfirmPassword: false,
      });
    } catch (error) {
      setError('Erreur lors du changement de mot de passe');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(prev => ({ ...prev, avatar: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePreferenceChange = (key, value) => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  const ProfileInfo = () => (
    <Grid container spacing={3}>
      {/* Carte principale du profil */}
      <Grid item xs={12} md={4}>
        <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <Box
            sx={{
              height: 120,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={profile.avatar}
                sx={{
                  width: 100,
                  height: 100,
                  border: `4px solid ${theme.palette.background.paper}`,
                  fontSize: '2rem',
                  fontWeight: 'bold',
                }}
              >
                {profile.firstName[0]}{profile.lastName[0]}
              </Avatar>
              {isEditing && (
                <>
                  <input
                    accept="image/*"
                    type="file"
                    id="avatar-upload"
                    style={{ display: 'none' }}
                    onChange={handleAvatarChange}
                  />
                  <label htmlFor="avatar-upload">
                    <IconButton
                      component="span"
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': { bgcolor: 'primary.dark' },
                        width: 32,
                        height: 32,
                      }}
                    >
                      <PhotoCamera sx={{ fontSize: 16 }} />
                    </IconButton>
                  </label>
                </>
              )}
            </Box>
          </Box>
          <CardContent sx={{ pt: 2 }}>
            <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
              {profile.firstName} {profile.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" paragraph>
              {profile.bio}
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
              <Chip
                label="Administrateur"
                color="primary"
                size="small"
                icon={<Shield />}
              />
              <Chip
                label="En ligne"
                color="success"
                size="small"
                variant="outlined"
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2">{profile.email}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2">{profile.phone}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2">{profile.address}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2">
                  Membre depuis {format(profile.joinedDate, 'MMMM yyyy', { locale: fr })}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Informations détaillées */}
      <Grid item xs={12} md={8}>
        <Card sx={{ borderRadius: 3, height: '100%' }}>
          <CardHeader
            title="Informations personnelles"
            action={
              !isEditing ? (
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={handleProfileEdit}
                  sx={{ borderRadius: 2 }}
                >
                  Modifier
                </Button>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Cancel />}
                    onClick={handleProfileCancel}
                    disabled={loading}
                  >
                    Annuler
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleProfileSave}
                    disabled={loading}
                  >
                    Sauvegarder
                  </Button>
                </Box>
              )
            }
          />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Prénom"
                  value={profile.firstName}
                  onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                  disabled={!isEditing}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nom"
                  value={profile.lastName}
                  onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                  disabled={!isEditing}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nom d'utilisateur"
                  value={profile.username}
                  onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
                  disabled={!isEditing}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  disabled={!isEditing}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Téléphone"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={!isEditing}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Adresse"
                  value={profile.address}
                  onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                  disabled={!isEditing}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Biographie"
                  multiline
                  rows={4}
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  disabled={!isEditing}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const SecuritySettings = () => (
    <Grid container spacing={3}>
      {/* Mot de passe */}
      <Grid item xs={12} md={6}>
        <Card sx={{ borderRadius: 3, height: '100%' }}>
          <CardHeader
            title="Mot de passe"
            avatar={<Lock color="primary" />}
            action={
              <Button
                variant="contained"
                startIcon={<Key />}
                onClick={() => setShowPasswordDialog(true)}
                sx={{ borderRadius: 2 }}
              >
                Changer
              </Button>
            }
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary" paragraph>
              Dernière modification: {format(profile.security.lastPasswordChange, 'dd/MM/yyyy à HH:mm', { locale: fr })}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={85}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: alpha(theme.palette.success.main, 0.1),
                '& .MuiLinearProgress-bar': {
                  backgroundColor: theme.palette.success.main,
                }
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Force du mot de passe: Forte
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Authentification à deux facteurs */}
      <Grid item xs={12} md={6}>
        <Card sx={{ borderRadius: 3, height: '100%' }}>
          <CardHeader
            title="Authentification à deux facteurs"
            avatar={<Shield color="secondary" />}
            action={
              <FormControlLabel
                control={
                  <Switch
                    checked={profile.security.twoFactorEnabled}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      security: { ...prev.security, twoFactorEnabled: e.target.checked }
                    }))}
                    color="secondary"
                  />
                }
                label=""
              />
            }
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary" paragraph>
              {profile.security.twoFactorEnabled 
                ? 'Votre compte est sécurisé avec l\'authentification à deux facteurs.'
                : 'Activez l\'authentification à deux facteurs pour une sécurité renforcée.'
              }
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setShowSecurityDialog(true)}
              sx={{ borderRadius: 2 }}
            >
              Configurer
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {/* Sessions actives */}
      <Grid item xs={12}>
        <Card sx={{ borderRadius: 3 }}>
          <CardHeader
            title="Sessions actives"
            avatar={<DeviceHub color="info" />}
            subheader={`${profile.security.activeSessions} session(s) active(s)`}
          />
          <CardContent>
            <List>
              {profile.security.loginHistory.filter(item => item.success).slice(0, 3).map((session, index) => (
                <ListItem key={index} divider={index < 2}>
                  <ListItemIcon>
                    <Schedule color="action" />
                  </ListItemIcon>
                  <ListItemText
                    primary={session.device}
                    secondary={`${session.ip} • ${format(session.date, 'dd/MM/yyyy à HH:mm', { locale: fr })}`}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    sx={{ borderRadius: 2 }}
                  >
                    Déconnecter
                  </Button>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>

      {/* Historique des connexions */}
      <Grid item xs={12}>
        <Card sx={{ borderRadius: 3 }}>
          <CardHeader
            title="Historique des connexions"
            avatar={<History color="warning" />}
          />
          <CardContent>
            <List>
              {profile.security.loginHistory.map((entry, index) => (
                <ListItem key={index} divider={index < profile.security.loginHistory.length - 1}>
                  <ListItemIcon>
                    {entry.success ? (
                      <Shield sx={{ color: 'success.main' }} />
                    ) : (
                      <Shield sx={{ color: 'error.main' }} />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2">
                          {entry.device}
                        </Typography>
                        <Chip
                          label={entry.success ? 'Succès' : 'Échec'}
                          size="small"
                          color={entry.success ? 'success' : 'error'}
                          variant="outlined"
                        />
                      </Box>
                    }
                    secondary={`${entry.ip} • ${format(entry.date, 'dd/MM/yyyy à HH:mm', { locale: fr })}`}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const PreferencesSettings = () => (
    <Grid container spacing={3}>
      {/* Notifications */}
      <Grid item xs={12} md={6}>
        <Card sx={{ borderRadius: 3 }}>
          <CardHeader
            title="Notifications"
            avatar={<Notifications color="primary" />}
          />
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={profile.preferences.notifications}
                    onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                    color="primary"
                  />
                }
                label="Notifications générales"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={profile.preferences.emailNotifications}
                    onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
                    color="primary"
                  />
                }
                label="Notifications par email"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={profile.preferences.smsNotifications}
                    onChange={(e) => handlePreferenceChange('smsNotifications', e.target.checked)}
                    color="primary"
                  />
                }
                label="Notifications par SMS"
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Apparence */}
      <Grid item xs={12} md={6}>
        <Card sx={{ borderRadius: 3 }}>
          <CardHeader
            title="Apparence"
            avatar={<Palette color="secondary" />}
          />
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={profile.preferences.darkMode}
                    onChange={(e) => handlePreferenceChange('darkMode', e.target.checked)}
                    color="secondary"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {profile.preferences.darkMode ? <Brightness4 /> : <Brightness7 />}
                    Mode sombre
                  </Box>
                }
              />
              <TextField
                select
                label="Langue"
                value={profile.preferences.language}
                onChange={(e) => handlePreferenceChange('language', e.target.value)}
                SelectProps={{
                  native: true,
                }}
                size="small"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </TextField>
              <TextField
                select
                label="Fuseau horaire"
                value={profile.preferences.timezone}
                onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                SelectProps={{
                  native: true,
                }}
                size="small"
              >
                <option value="Europe/Paris">Europe/Paris</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Asia/Tokyo">Asia/Tokyo</option>
              </TextField>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Données */}
      <Grid item xs={12}>
        <Card sx={{ borderRadius: 3 }}>
          <CardHeader
            title="Gestion des données"
            avatar={<Download color="info" />}
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  fullWidth
                  sx={{ borderRadius: 2 }}
                >
                  Exporter mes données
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="outlined"
                  startIcon={<Upload />}
                  fullWidth
                  sx={{ borderRadius: 2 }}
                >
                  Importer des données
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="outlined"
                  startIcon={<Settings />}
                  fullWidth
                  sx={{ borderRadius: 2 }}
                >
                  Sauvegarder config
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  fullWidth
                  sx={{ borderRadius: 2 }}
                >
                  Supprimer compte
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
      pb: 4 
    }}>
      <Container maxWidth="xl" sx={{ pt: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            fontWeight="bold" 
            sx={{ 
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              mb: 1 
            }}
          >
            Profil Administrateur
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Gérez vos informations personnelles et préférences
          </Typography>
        </Box>

        {/* Messages */}
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
            {success}
          </Alert>
        )}

        {/* Navigation par onglets */}
        <Paper sx={{ mb: 3, borderRadius: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            sx={{ 
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: 1.5,
              }
            }}
          >
            <Tab 
              label="Informations" 
              icon={<Person />} 
              iconPosition="start"
              sx={{ fontWeight: 600 }}
            />
            <Tab 
              label="Sécurité" 
              icon={<Security />} 
              iconPosition="start"
              sx={{ fontWeight: 600 }}
            />
            <Tab 
              label="Préférences" 
              icon={<Settings />} 
              iconPosition="start"
              sx={{ fontWeight: 600 }}
            />
          </Tabs>
        </Paper>

        {/* Contenu des onglets */}
        {activeTab === 0 && <ProfileInfo />}
        {activeTab === 1 && <SecuritySettings />}
        {activeTab === 2 && <PreferencesSettings />}

        {/* Dialog changement de mot de passe */}
        <Dialog 
          open={showPasswordDialog} 
          onClose={() => setShowPasswordDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Lock color="primary" />
              Changer le mot de passe
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <TextField
                fullWidth
                label="Mot de passe actuel"
                type={passwordData.showCurrentPassword ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setPasswordData(prev => ({ ...prev, showCurrentPassword: !prev.showCurrentPassword }))}
                    >
                      {passwordData.showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )
                }}
              />
              <TextField
                fullWidth
                label="Nouveau mot de passe"
                type={passwordData.showNewPassword ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setPasswordData(prev => ({ ...prev, showNewPassword: !prev.showNewPassword }))}
                    >
                      {passwordData.showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )
                }}
              />
              <TextField
                fullWidth
                label="Confirmer le nouveau mot de passe"
                type={passwordData.showConfirmPassword ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setPasswordData(prev => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }))}
                    >
                      {passwordData.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setShowPasswordDialog(false)}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button 
              onClick={handlePasswordChange}
              variant="contained"
              disabled={loading}
            >
              {loading ? 'Changement...' : 'Changer'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog sécurité */}
        <Dialog 
          open={showSecurityDialog} 
          onClose={() => setShowSecurityDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Shield color="secondary" />
              Configuration sécurité
            </Box>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" paragraph>
              Configuration de l'authentification à deux facteurs et autres options de sécurité.
            </Typography>
            <Alert severity="info" sx={{ mt: 2 }}>
              Cette fonctionnalité sera disponible prochainement.
            </Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowSecurityDialog(false)}>
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Profile;
