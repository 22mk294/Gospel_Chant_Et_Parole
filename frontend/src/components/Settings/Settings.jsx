import React, { useState, useContext } from 'react';
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  FormGroup,
  Avatar,
  IconButton,
  Chip,
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  AccountCircle,
  Security,
  Palette,
  Code,
  Database,
  Edit,
  Camera,
  Delete,
  Save,
  Cancel,
  Visibility,
  VisibilityOff,
  ExpandMore,
  Warning,
  CheckCircle,
  Info,
  Storage,
  Api,
  Speed,
  Backup,
  Settings as SettingsIcon,
  Brightness4,
  Brightness7,
  Language,
  Notifications,
  Shield,
  Key,
  Timeline,
  Memory,
  CloudUpload,
} from '@mui/icons-material';
import { AuthContext } from '../../contexts/AuthContext';
import { useTheme } from '@mui/material/styles';
import Logo from '../Logo/Logo';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Settings = () => {
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [settings, setSettings] = useState({
    // Compte
    email: 'admin@gospelchantetparole.com',
    name: 'Administrateur',
    avatar: null,
    
    // Préférences
    darkMode: false,
    language: 'fr',
    notifications: true,
    autoSave: true,
    
    // Sécurité
    twoFactorEnabled: false,
    sessionTimeout: 30,
    
    // Système
    debugMode: false,
    maintenanceMode: false,
  });
  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [alert, setAlert] = useState(null);
  const { user } = useContext(AuthContext);
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleFormChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const showAlert = (message, severity = 'info') => {
    setAlert({ message, severity });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleSaveAccount = () => {
    // Logique de sauvegarde du compte
    showAlert('Informations du compte mises à jour', 'success');
  };

  const handleChangePassword = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      showAlert('Les mots de passe ne correspondent pas', 'error');
      return;
    }
    // Logique de changement de mot de passe
    showAlert('Mot de passe modifié avec succès', 'success');
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleDeleteAccount = () => {
    // Logique de suppression du compte
    showAlert('Compte supprimé avec succès', 'success');
    setDeleteDialogOpen(false);
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleSettingChange('avatar', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const systemInfo = {
    version: '1.0.0',
    database: 'PostgreSQL 15.3',
    nodeVersion: 'v18.17.0',
    uptime: '2 jours 14h 32m',
    totalChants: 247,
    totalCategories: 12,
    storageUsed: '1.2 GB',
    storageTotal: '10 GB',
    lastBackup: '2024-01-15 03:00:00',
    apiCalls: 1547,
    averageResponseTime: '145ms',
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Logo size="medium" />
        <Typography variant="h4" sx={{ ml: 2, fontWeight: 'bold' }}>
          Paramètres
        </Typography>
      </Box>

      {alert && (
        <Alert severity={alert.severity} sx={{ mb: 3 }}>
          {alert.message}
        </Alert>
      )}

      <Paper elevation={3}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="settings tabs"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<AccountCircle />} label="Compte" />
          <Tab icon={<SettingsIcon />} label="Préférences" />
          <Tab icon={<Security />} label="Sécurité" />
          <Tab icon={<Database />} label="Base de données" />
          <Tab icon={<Api />} label="API" />
          <Tab icon={<Speed />} label="Système" />
        </Tabs>

        {/* Onglet Compte */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Informations personnelles" />
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar
                      src={settings.avatar}
                      sx={{ width: 80, height: 80, mr: 2 }}
                    />
                    <Box>
                      <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="avatar-upload"
                        type="file"
                        onChange={handleAvatarUpload}
                      />
                      <label htmlFor="avatar-upload">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                          <Camera />
                        </IconButton>
                      </label>
                      <Typography variant="body2" color="text.secondary">
                        Cliquez pour changer la photo
                      </Typography>
                    </Box>
                  </Box>
                  
                  <TextField
                    fullWidth
                    label="Nom complet"
                    value={settings.name}
                    onChange={(e) => handleSettingChange('name', e.target.value)}
                    margin="normal"
                  />
                  
                  <TextField
                    fullWidth
                    label="Email"
                    value={settings.email}
                    onChange={(e) => handleSettingChange('email', e.target.value)}
                    margin="normal"
                  />
                  
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSaveAccount}
                    sx={{ mt: 2 }}
                  >
                    Sauvegarder
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Changer le mot de passe" />
                <CardContent>
                  <TextField
                    fullWidth
                    label="Mot de passe actuel"
                    type={showPassword ? 'text' : 'password'}
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleFormChange}
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Nouveau mot de passe"
                    type={showPassword ? 'text' : 'password'}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleFormChange}
                    margin="normal"
                  />
                  
                  <TextField
                    fullWidth
                    label="Confirmer le nouveau mot de passe"
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleFormChange}
                    margin="normal"
                  />
                  
                  <Button
                    variant="contained"
                    startIcon={<Key />}
                    onClick={handleChangePassword}
                    sx={{ mt: 2 }}
                  >
                    Changer le mot de passe
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardHeader 
                  title="Zone de danger" 
                  sx={{ color: 'error.main' }}
                />
                <CardContent>
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    Cette action est irréversible. Toutes vos données seront supprimées définitivement.
                  </Alert>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    Supprimer mon compte
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Onglet Préférences */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Apparence" />
                <CardContent>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.darkMode}
                          onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {settings.darkMode ? <Brightness4 /> : <Brightness7 />}
                          <Typography sx={{ ml: 1 }}>Mode sombre</Typography>
                        </Box>
                      }
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.notifications}
                          onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Notifications />
                          <Typography sx={{ ml: 1 }}>Notifications</Typography>
                        </Box>
                      }
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.autoSave}
                          onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Save />
                          <Typography sx={{ ml: 1 }}>Sauvegarde automatique</Typography>
                        </Box>
                      }
                    />
                  </FormGroup>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Langue et région" />
                <CardContent>
                  <TextField
                    select
                    fullWidth
                    label="Langue"
                    value={settings.language}
                    onChange={(e) => handleSettingChange('language', e.target.value)}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </TextField>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Onglet Sécurité */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Authentification" />
                <CardContent>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.twoFactorEnabled}
                          onChange={(e) => handleSettingChange('twoFactorEnabled', e.target.checked)}
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Shield />
                          <Typography sx={{ ml: 1 }}>Authentification à deux facteurs</Typography>
                        </Box>
                      }
                    />
                  </FormGroup>
                  
                  <TextField
                    fullWidth
                    label="Délai d'expiration de session (minutes)"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
                    margin="normal"
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Historique des connexions" />
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Connexion réussie"
                        secondary="Aujourd'hui à 14:32 - IP: 192.168.1.100"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Connexion réussie"
                        secondary="Hier à 09:15 - IP: 192.168.1.100"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Warning color="warning" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Tentative de connexion échouée"
                        secondary="Il y a 2 jours à 16:45 - IP: 203.0.113.1"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Onglet Base de données */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="État de la base de données" />
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Storage sx={{ mr: 2 }} />
                    <Typography variant="h6">
                      {systemInfo.database}
                    </Typography>
                    <Chip label="En ligne" color="success" sx={{ ml: 2 }} />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Utilisation du stockage: {systemInfo.storageUsed} / {systemInfo.storageTotal}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Box>
                      <Typography variant="h4" color="primary">
                        {systemInfo.totalChants}
                      </Typography>
                      <Typography variant="body2">Chants</Typography>
                    </Box>
                    <Box>
                      <Typography variant="h4" color="secondary">
                        {systemInfo.totalCategories}
                      </Typography>
                      <Typography variant="body2">Catégories</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Sauvegarde" />
                <CardContent>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Dernière sauvegarde: {systemInfo.lastBackup}
                  </Typography>
                  
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
                      startIcon={<Backup />}
                      fullWidth
                      sx={{ mb: 1 }}
                    >
                      Créer une sauvegarde
                    </Button>
                    
                    <Button
                      variant="outlined"
                      startIcon={<CloudUpload />}
                      fullWidth
                    >
                      Restaurer une sauvegarde
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardHeader title="Données en temps réel" />
                <CardContent>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>Chants récents</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        <ListItem>
                          <ListItemText primary="Amazing Grace" secondary="Ajouté il y a 2 heures" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="How Great Thou Art" secondary="Modifié il y a 4 heures" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Blessed Assurance" secondary="Ajouté hier" />
                        </ListItem>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                  
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>Catégories récentes</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        <ListItem>
                          <ListItemText primary="Louange" secondary="Modifiée il y a 1 heure" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Adoration" secondary="Ajoutée il y a 3 jours" />
                        </ListItem>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Onglet API */}
        <TabPanel value={tabValue} index={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Statistiques API" />
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Api sx={{ mr: 2 }} />
                    <Typography variant="h6">Documentation API</Typography>
                    <Chip label="Accessible" color="success" sx={{ ml: 2 }} />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Appels API aujourd'hui: {systemInfo.apiCalls}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Temps de réponse moyen: {systemInfo.averageResponseTime}
                  </Typography>
                  
                  <Button
                    variant="contained"
                    startIcon={<Code />}
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => window.open('/api-docs', '_blank')}
                  >
                    Voir la documentation Swagger
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Routes API disponibles" />
                <CardContent>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="POST /api/auth/login"
                        secondary="Authentification"
                      />
                      <Chip label="POST" color="success" size="small" />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="GET /api/chants"
                        secondary="Liste des chants"
                      />
                      <Chip label="GET" color="primary" size="small" />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="POST /api/chants"
                        secondary="Créer un chant"
                      />
                      <Chip label="POST" color="success" size="small" />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="PUT /api/chants/:id"
                        secondary="Modifier un chant"
                      />
                      <Chip label="PUT" color="warning" size="small" />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="DELETE /api/chants/:id"
                        secondary="Supprimer un chant"
                      />
                      <Chip label="DELETE" color="error" size="small" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Onglet Système */}
        <TabPanel value={tabValue} index={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Informations système" />
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Version de l'application"
                        secondary={systemInfo.version}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Version Node.js"
                        secondary={systemInfo.nodeVersion}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Temps de fonctionnement"
                        secondary={systemInfo.uptime}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Base de données"
                        secondary={systemInfo.database}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Paramètres système" />
                <CardContent>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.debugMode}
                          onChange={(e) => handleSettingChange('debugMode', e.target.checked)}
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Memory />
                          <Typography sx={{ ml: 1 }}>Mode débogage</Typography>
                        </Box>
                      }
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.maintenanceMode}
                          onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Settings />
                          <Typography sx={{ ml: 1 }}>Mode maintenance</Typography>
                        </Box>
                      }
                    />
                  </FormGroup>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardHeader title="Performances" />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Box textAlign="center">
                      <Typography variant="h4" color="primary">
                        {systemInfo.apiCalls}
                      </Typography>
                      <Typography variant="body2">Appels API</Typography>
                    </Box>
                    <Box textAlign="center">
                      <Typography variant="h4" color="secondary">
                        {systemInfo.averageResponseTime}
                      </Typography>
                      <Typography variant="body2">Temps de réponse</Typography>
                    </Box>
                    <Box textAlign="center">
                      <Typography variant="h4" color="success.main">
                        {systemInfo.uptime}
                      </Typography>
                      <Typography variant="body2">Temps de fonctionnement</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      {/* Dialog de suppression du compte */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Supprimer le compte
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est
            irréversible et toutes vos données seront perdues définitivement.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Annuler
          </Button>
          <Button onClick={handleDeleteAccount} color="error" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Settings;
