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
  IconButton,
  Divider,
  Alert,
  LinearProgress,
  useTheme,
  alpha,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
} from '@mui/material';
import {
  MusicNote,
  Category,
  People,
  BarChart,
  Refresh,
  TrendingUp,
  Visibility,
} from '@mui/icons-material';
import { statsService } from '../services/statsService';

const Dashboard = () => {
  const theme = useTheme();
  const [stats, setStats] = useState({
    totalChants: 0,
    totalCategories: 0,
    totalUsers: 1,
    averageChantsByCategory: 0,
    recentChants: [],
    categoryStats: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError('');
      
      const data = await statsService.getAllStats();
      console.log('📊 Données reçues:', data);
      
      // Vérifier et formater les données
      const formattedStats = {
        totalChants: data.totalChants || 0,
        totalCategories: data.totalCategories || 0,
        totalUsers: data.totalUsers || 1,
        averageChantsByCategory: parseFloat(data.averageChantsByCategory) || 0,
        recentChants: Array.isArray(data.recentChants) ? data.recentChants : [],
        categoryStats: Array.isArray(data.categoryStats) ? data.categoryStats : []
      };
      
      console.log('📊 Données formatées:', formattedStats);
      setStats(formattedStats);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
      setError('Erreur lors du chargement des statistiques');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchStats();
  };

  // Composant StatCard moderne
  const StatCard = ({ title, value, icon, color, trend, subtitle }) => {
    return (
      <Card
        sx={{
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 3,
          background: `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.1)} 0%, ${alpha(theme.palette[color].main, 0.05)} 100%)`,
          border: `1px solid ${alpha(theme.palette[color].main, 0.2)}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: `0 12px 24px ${alpha(theme.palette[color].main, 0.15)}`,
          }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${theme.palette[color].main} 0%, ${theme.palette[color].light} 100%)`,
          }}
        />
        
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 56,
                height: 56,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.15)} 0%, ${alpha(theme.palette[color].main, 0.1)} 100%)`,
                color: theme.palette[color].main,
                mr: 2,
                '& svg': {
                  fontSize: 28,
                }
              }}
            >
              {icon}
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography 
                variant="h6" 
                component="div" 
                color="text.secondary"
                sx={{ 
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}
              >
                {title}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ fontSize: '0.75rem' }}
              >
                {subtitle}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Typography
              variant="h3"
              component="div"
              sx={{
                fontWeight: 700,
                fontSize: '2.5rem',
                color: 'text.primary',
                lineHeight: 1,
              }}
            >
              {typeof value === 'number' ? value.toLocaleString('fr-FR') : value}
            </Typography>
            
            {trend && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  background: alpha(theme.palette.success.main, 0.1),
                  color: theme.palette.success.main,
                }}
              >
                <TrendingUp sx={{ fontSize: 16 }} />
                <Typography variant="caption" fontWeight="bold">
                  {trend}
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Chargement du dashboard...
        </Typography>
        <LinearProgress sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item}>
              <Card sx={{ height: 200 }}>
                <CardContent>
                  <LinearProgress />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
      pb: 4 
    }}>
      <Container maxWidth="xl" sx={{ pt: 3 }}>
        {/* Header moderne */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
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
                Dashboard Analytics
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
                Tableau de bord complet de votre application Gospel
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Dernière mise à jour: {lastUpdated.toLocaleString('fr-FR')}
              </Typography>
              <Chip 
                label="En temps réel" 
                size="small" 
                color="success" 
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
              <IconButton 
                onClick={handleRefresh} 
                sx={{ 
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' }
                }}
              >
                <Refresh />
              </IconButton>
            </Box>
          </Box>
          
          <Divider sx={{ borderColor: alpha(theme.palette.primary.main, 0.1) }} />
        </Box>

        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 3, borderRadius: 2 }}
            action={
              <IconButton color="inherit" size="small" onClick={handleRefresh}>
                <Refresh />
              </IconButton>
            }
          >
            {error}
          </Alert>
        )}

        {/* Statistiques principales */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Total Chants"
              value={stats.totalChants}
              icon={<MusicNote />}
              color="primary"
              trend="+12% cette semaine"
              subtitle="Chants dans la bibliothèque"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Catégories"
              value={stats.totalCategories}
              icon={<Category />}
              color="secondary"
              trend="+3 ce mois"
              subtitle="Catégories actives"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Administrateurs"
              value={stats.totalUsers}
              icon={<People />}
              color="success"
              trend="Actif"
              subtitle="Comptes admin"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Moyenne/Catégorie"
              value={typeof stats.averageChantsByCategory === 'number' ? stats.averageChantsByCategory.toFixed(1) : '0.0'}
              icon={<BarChart />}
              color="warning"
              trend="Équilibré"
              subtitle="Répartition optimale"
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* Chants récents */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ height: '100%', borderRadius: 3 }}>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <MusicNote color="primary" />
                    <Typography variant="h6" component="div">
                      Chants récents
                    </Typography>
                  </Box>
                }
                subheader="Derniers chants ajoutés à la bibliothèque"
              />
              <CardContent>
                {stats.recentChants.length > 0 ? (
                  <List>
                    {stats.recentChants.map((chant, index) => (
                      <ListItem 
                        key={chant.id} 
                        divider={index < stats.recentChants.length - 1}
                        sx={{ 
                          borderRadius: 1,
                          mb: 1,
                          '&:hover': {
                            bgcolor: 'action.hover',
                          }
                        }}
                      >
                        <ListItemIcon>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                            <MusicNote />
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" fontWeight="medium">
                              {chant.title}
                            </Typography>
                          }
                          secondary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                              <Typography variant="body2" color="text.secondary">
                                {chant.artist || 'Artiste inconnu'}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                • {chant.category || 'Sans catégorie'}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                • {new Date(chant.createdAt).toLocaleDateString('fr-FR')}
                              </Typography>
                            </Box>
                          }
                        />
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Chip
                            label="Nouveau"
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                          <IconButton size="small" color="primary">
                            <Visibility />
                          </IconButton>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <MusicNote sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      Aucun chant trouvé
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Commencez par ajouter votre premier chant
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Statistiques par catégorie */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%', borderRadius: 3 }}>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Category color="secondary" />
                    <Typography variant="h6" component="div">
                      Répartition par catégorie
                    </Typography>
                  </Box>
                }
                subheader="Nombre de chants par catégorie"
              />
              <CardContent>
                {stats.categoryStats.length > 0 ? (
                  <List>
                    {stats.categoryStats.slice(0, 8).map((category, index) => (
                      <ListItem 
                        key={category.id} 
                        divider={index < Math.min(stats.categoryStats.length, 8) - 1}
                        sx={{ px: 0 }}
                      >
                        <ListItemIcon>
                          <Badge badgeContent={category.chantsCount} color="primary">
                            <Category color="action" />
                          </Badge>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle2" fontWeight="medium">
                              {category.name}
                            </Typography>
                          }
                          secondary={
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                              <LinearProgress
                                variant="determinate"
                                value={Math.min((category.chantsCount / stats.totalChants) * 100, 100)}
                                sx={{ 
                                  flexGrow: 1, 
                                  mr: 1,
                                  height: 6,
                                  borderRadius: 3,
                                }}
                              />
                              <Typography variant="caption" color="text.secondary">
                                {category.chantsCount} chants
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Category sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      Aucune catégorie
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Créez des catégories pour organiser vos chants
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
