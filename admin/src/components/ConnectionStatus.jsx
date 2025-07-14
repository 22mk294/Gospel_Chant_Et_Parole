import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Alert,
  AlertTitle,
  Grid,
  LinearProgress,
  Divider,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  CheckCircle,
  Error,
  Warning,
  Refresh,
  ExpandMore,
  ExpandLess,
  Storage,
  Cloud,
  Security,
  Speed,
  Info
} from '@mui/icons-material';
import connectionService from '../services/connectionService';

const ConnectionStatus = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [connectionSpeed, setConnectionSpeed] = useState(null);
  const [systemInfo, setSystemInfo] = useState(null);

  // Vérifier le statut de connexion
  const checkConnectionStatus = async () => {
    setLoading(true);
    try {
      const systemStatus = await connectionService.checkSystemStatus();
      const speedTest = await connectionService.testConnectionSpeed();
      const sysInfo = await connectionService.getSystemInfo();
      
      setStatus(systemStatus);
      setConnectionSpeed(speedTest);
      setSystemInfo(sysInfo);
    } catch (error) {
      console.error('Erreur lors de la vérification:', error);
    } finally {
      setLoading(false);
    }
  };

  // Vérification automatique au chargement
  useEffect(() => {
    checkConnectionStatus();
    
    // Vérification périodique toutes les 30 secondes
    const interval = setInterval(checkConnectionStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Obtenir la couleur selon le statut
  const getStatusColor = (success) => {
    if (success === true) return 'success';
    if (success === false) return 'error';
    return 'warning';
  };

  // Obtenir l'icône selon le statut
  const getStatusIcon = (success) => {
    if (success === true) return <CheckCircle />;
    if (success === false) return <Error />;
    return <Warning />;
  };

  // Obtenir la couleur de la vitesse
  const getSpeedColor = (quality) => {
    if (quality === 'Excellente') return 'success';
    if (quality === 'Bonne') return 'primary';
    if (quality === 'Moyenne') return 'warning';
    return 'error';
  };

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2}>
            <CircularProgress size={24} />
            <Typography>Vérification de la connexion...</Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" component="h2">
            Statut de Connexion
          </Typography>
          <IconButton onClick={checkConnectionStatus} size="small">
            <Refresh />
          </IconButton>
        </Box>

        {/* Statut global */}
        <Alert 
          severity={status?.overall?.connected ? 'success' : 'error'}
          sx={{ mb: 2 }}
        >
          <AlertTitle>
            {status?.overall?.connected ? 'Système Opérationnel' : 'Problème de Connexion'}
          </AlertTitle>
          {status?.overall?.message}
        </Alert>

        {/* Indicateurs de statut */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={4}>
            <Box textAlign="center">
              <Box mb={1}>
                {getStatusIcon(status?.details?.backend?.success)}
              </Box>
              <Typography variant="body2">Backend</Typography>
              <Chip 
                label={status?.details?.backend?.success ? 'Connecté' : 'Déconnecté'}
                color={getStatusColor(status?.details?.backend?.success)}
                size="small"
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box textAlign="center">
              <Box mb={1}>
                <Storage color={status?.details?.database?.success ? 'success' : 'error'} />
              </Box>
              <Typography variant="body2">Base de données</Typography>
              <Chip 
                label={status?.details?.database?.success ? 'Connectée' : 'Déconnectée'}
                color={getStatusColor(status?.details?.database?.success)}
                size="small"
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box textAlign="center">
              <Box mb={1}>
                <Security color={status?.details?.auth?.success ? 'success' : 'error'} />
              </Box>
              <Typography variant="body2">Authentification</Typography>
              <Chip 
                label={status?.details?.auth?.success ? 'Valide' : 'Invalide'}
                color={getStatusColor(status?.details?.auth?.success)}
                size="small"
              />
            </Box>
          </Grid>
        </Grid>

        {/* Vitesse de connexion */}
        {connectionSpeed && (
          <Box sx={{ mb: 2 }}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Speed />
              <Typography variant="body2">
                Vitesse: {connectionSpeed.responseTime}ms
              </Typography>
              <Chip 
                label={connectionSpeed.quality}
                color={getSpeedColor(connectionSpeed.quality)}
                size="small"
              />
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={Math.min(100, (2000 - connectionSpeed.responseTime) / 20)}
              color={getSpeedColor(connectionSpeed.quality)}
            />
          </Box>
        )}

        {/* Détails étendus */}
        <Box>
          <Box 
            display="flex" 
            alignItems="center" 
            sx={{ cursor: 'pointer' }}
            onClick={() => setExpanded(!expanded)}
          >
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
              Détails techniques
            </Typography>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </Box>
          
          <Collapse in={expanded}>
            <Divider sx={{ my: 1 }} />
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <Cloud />
                </ListItemIcon>
                <ListItemText 
                  primary="URL API"
                  secondary={import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <Info />
                </ListItemIcon>
                <ListItemText 
                  primary="Dernière vérification"
                  secondary={new Date(status?.timestamp).toLocaleString()}
                />
              </ListItem>

              {systemInfo?.success && (
                <ListItem>
                  <ListItemIcon>
                    <Storage />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Informations système"
                    secondary={JSON.stringify(systemInfo.data, null, 2)}
                  />
                </ListItem>
              )}

              {/* Détails des erreurs */}
              {!status?.details?.backend?.success && (
                <ListItem>
                  <ListItemIcon>
                    <Error color="error" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Erreur Backend"
                    secondary={status?.details?.backend?.error}
                  />
                </ListItem>
              )}

              {!status?.details?.database?.success && (
                <ListItem>
                  <ListItemIcon>
                    <Error color="error" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Erreur Base de données"
                    secondary={status?.details?.database?.error}
                  />
                </ListItem>
              )}

              {!status?.details?.auth?.success && (
                <ListItem>
                  <ListItemIcon>
                    <Error color="error" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Erreur Authentification"
                    secondary={status?.details?.auth?.error}
                  />
                </ListItem>
              )}
            </List>
          </Collapse>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ConnectionStatus;
