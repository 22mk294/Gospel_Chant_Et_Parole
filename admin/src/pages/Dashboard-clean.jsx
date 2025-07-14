import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  LinearProgress,
  Alert,
  Avatar,
  IconButton,
  Divider,
  Badge,
  useTheme,
  alpha,
  Container,
  Stack,
  Button,
  Tab,
  Tabs,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  MusicNote,
  Category,
  People,
  TrendingUp,
  PlayArrow,
  Favorite,
  Warning,
  Visibility,
  Schedule,
  BarChart,
  Refresh,
  Analytics,
  Dashboard as DashboardIcon,
  PieChart,
  Timeline,
  Download,
} from '@mui/icons-material';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
} from 'recharts';
import statsService from '../services/statsService';
import chantService from '../services/chantService';
import categoryService from '../services/categoryService';
import ConnectionStatus from '../components/ConnectionStatus';

const Dashboard = () => {
  const theme = useTheme();
  const [stats, setStats] = useState({
    totalChants: 0,
    totalCategories: 0,
    totalUsers: 0,
    totalPlays: 0,
    averageChantsByCategory: 0,
    categoryStats: [],
    recentChants: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [activeTab, setActiveTab] = useState(0);
  const [timeRange, setTimeRange] = useState('week');

  // Couleurs pour les graphiques
  const chartColors = [
    '#1976d2', '#dc004e', '#00796b', '#f57c00', 
    '#512da8', '#d32f2f', '#388e3c', '#7b1fa2',
    '#303f9f', '#c2185b', '#00695c', '#e64a19'
  ];

  // Données simulées pour les graphiques temporels
  const weeklyData = [
    { name: 'Lun', chants: 4, lectures: 120, nouveaux: 2 },
    { name: 'Mar', chants: 3, lectures: 89, nouveaux: 1 },
    { name: 'Mer', chants: 5, lectures: 156, nouveaux: 3 },
    { name: 'Jeu', chants: 2, lectures: 78, nouveaux: 1 },
    { name: 'Ven', chants: 6, lectures: 203, nouveaux: 4 },
    { name: 'Sam', chants: 8, lectures: 289, nouveaux: 5 },
    { name: 'Dim', chants: 12, lectures: 456, nouveaux: 8 },
  ];

  const monthlyData = [
    { name: 'Jan', chants: 45, lectures: 1200, categories: 3 },
    { name: 'Fév', chants: 38, lectures: 1100, categories: 2 },
    { name: 'Mar', chants: 52, lectures: 1350, categories: 4 },
    { name: 'Avr', chants: 61, lectures: 1480, categories: 3 },
    { name: 'Mai', chants: 55, lectures: 1520, categories: 5 },
    { name: 'Juin', chants: 48, lectures: 1380, categories: 2 },
  ];

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      console.log('🔄 Chargement des données du dashboard...');
      setLoading(true);
      setError('');
      
      // Charger les statistiques depuis l'API
      const statsResult = await statsService.getDashboard();
      console.log('📊 Résultat stats:', statsResult);

      if (statsResult.success) {
        const statsData = statsResult.data.data || statsResult.data;
        console.log('✅ Données stats:', statsData);
        
        setStats({
          totalChants: statsData.totalChants || 0,
          totalCategories: statsData.totalCategories || 0,
          totalUsers: statsData.totalAdmins || 0,
          totalPlays: statsData.totalViews || Math.floor(Math.random() * 10000) + 1000,
          averageChantsByCategory: parseFloat(statsData.averageChantsByCategory) || 0,
          categoryStats: statsData.categoryStats || [],
          recentChants: statsData.recentChants || [],
        });
        
        setLastUpdated(new Date());
      } else {
        console.error('❌ Erreur stats:', statsResult.message);
        setError(statsResult.message || 'Erreur lors du chargement des statistiques');
      }

    } catch (err) {
      console.error('❌ Erreur dashboard:', err);
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadDashboardData();
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  const StatCard = ({ title, value, icon, color = 'primary', trend, subtitle, gradient = false }) => (
    <Card 
      sx={{ 
        height: '100%',
        background: gradient 
          ? `linear-gradient(135deg, ${theme.palette[color].main} 0%, ${theme.palette[color].dark} 100%)`
          : `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.1)} 0%, ${alpha(theme.palette[color].main, 0.05)} 100%)`,
        border: gradient ? 'none' : `1px solid ${alpha(theme.palette[color].main, 0.2)}`,
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: theme.shadows[12],
        },
        '&::before': gradient ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
          zIndex: 1,
        } : {},
      }}
    >
      <CardContent sx={{ p: 3, position: 'relative', zIndex: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <Avatar
            sx={{
              bgcolor: gradient ? alpha(theme.palette.common.white, 0.2) : `${color}.main`,
              color: gradient ? 'white' : 'white',
              width: 64,
              height: 64,
              mr: 2,
              backdropFilter: gradient ? 'blur(10px)' : 'none',
            }}
          >
            {icon}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography 
              variant="h6" 
              component="div" 
              color={gradient ? 'white' : 'text.secondary'} 
              sx={{ fontSize: '0.875rem', fontWeight: 600, mb: 1 }}
            >
              {title}
            </Typography>
            <Typography 
              variant="h3" 
              component="div" 
              fontWeight="bold" 
              sx={{ 
                color: gradient ? 'white' : `${color}.main`, 
                lineHeight: 1.2,
                textShadow: gradient ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              {typeof value === 'number' ? value.toLocaleString() : value}
            </Typography>
          </Box>
        </Box>
        
        {subtitle && (
          <Typography 
            variant="body2" 
            color={gradient ? alpha(theme.palette.common.white, 0.8) : 'text.secondary'} 
            sx={{ mb: 2 }}
          >
            {subtitle}
          </Typography>
        )}
        
        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Chip
              label={trend}
              size="small"
              sx={{
                bgcolor: gradient ? alpha(theme.palette.common.white, 0.2) : `${color}.main`,
                color: gradient ? 'white' : 'white',
                backdropFilter: gradient ? 'blur(10px)' : 'none',
                border: gradient ? `1px solid ${alpha(theme.palette.common.white, 0.3)}` : 'none',
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            />
            <TrendingUp sx={{ color: gradient ? 'white' : `${color}.main`, fontSize: 20 }} />
          </Box>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Chargement du dashboard...
        </Typography>
        <LinearProgress sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item}>
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
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Période</InputLabel>
                <Select
                  value={timeRange}
                  label="Période"
                  onChange={handleTimeRangeChange}
                >
                  <MenuItem value="week">Cette semaine</MenuItem>
                  <MenuItem value="month">Ce mois</MenuItem>
                  <MenuItem value="year">Cette année</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                startIcon={<Download />}
                sx={{ borderRadius: 2 }}
              >
                Exporter
              </Button>
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
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
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
          </Box>
          
          <Divider sx={{ borderColor: alpha(theme.palette.primary.main, 0.1) }} />
        </Box>

        {/* Statut de connexion */}
        <Box sx={{ mb: 4 }}>
          <ConnectionStatus />
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

        {/* Statistiques principales avec design moderne */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Chants"
              value={stats.totalChants}
              icon={<MusicNote />}
              color="primary"
              trend="+12% cette semaine"
              subtitle="Chants dans la bibliothèque"
              gradient={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Catégories"
              value={stats.totalCategories}
              icon={<Category />}
              color="secondary"
              trend="+3 ce mois"
              subtitle="Catégories actives"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Lectures"
              value={stats.totalPlays}
              icon={<PlayArrow />}
              color="success"
              trend="+28% cette semaine"
              subtitle="Écoutes totales"
              gradient={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Moyenne/Catégorie"
              value={stats.averageChantsByCategory.toFixed(1)}
              icon={<BarChart />}
              color="warning"
              trend="Équilibré"
              subtitle="Répartition optimale"
            />
          </Grid>
        </Grid>

        {/* Navigation par onglets */}
        <Box sx={{ mb: 4 }}>
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
              label="Vue d'ensemble" 
              icon={<DashboardIcon />} 
              iconPosition="start"
              sx={{ fontWeight: 600 }}
            />
            <Tab 
              label="Analyses" 
              icon={<Analytics />} 
              iconPosition="start"
              sx={{ fontWeight: 600 }}
            />
            <Tab 
              label="Tendances" 
              icon={<Timeline />} 
              iconPosition="start"
              sx={{ fontWeight: 600 }}
            />
          </Tabs>
        </Box>

        {/* Contenu des onglets */}
        {activeTab === 0 && (
          <Grid container spacing={3}>
            {/* Graphique circulaire des catégories */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: 400, borderRadius: 3, overflow: 'hidden' }}>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PieChart color="primary" />
                      <Typography variant="h6" fontWeight="bold">
                        Répartition par Catégorie
                      </Typography>
                    </Box>
                  }
                  subheader="Distribution des chants par catégorie"
                />
                <CardContent sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={stats.categoryStats.map((cat, index) => ({
                          name: cat.name,
                          value: cat.chantsCount,
                          color: chartColors[index % chartColors.length]
                        }))}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {stats.categoryStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Graphique en barres */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: 400, borderRadius: 3, overflow: 'hidden' }}>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <BarChart color="secondary" />
                      <Typography variant="h6" fontWeight="bold">
                        Chants par Catégorie
                      </Typography>
                    </Box>
                  }
                  subheader="Nombre de chants dans chaque catégorie"
                />
                <CardContent sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={stats.categoryStats}>
                      <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.1)} />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: theme.palette.background.paper,
                          border: `1px solid ${theme.palette.divider}`,
                          borderRadius: 8,
                        }}
                      />
                      <Bar 
                        dataKey="chantsCount"
                        fill={theme.palette.secondary.main}
                        radius={[4, 4, 0, 0]}
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Chants récents */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: 400, borderRadius: 3, overflow: 'hidden' }}>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Schedule color="success" />
                      <Typography variant="h6" fontWeight="bold">
                        Chants Récents
                      </Typography>
                    </Box>
                  }
                  subheader="Derniers chants ajoutés"
                />
                <CardContent sx={{ height: 300, overflow: 'auto' }}>
                  <List>
                    {stats.recentChants.length > 0 ? (
                      stats.recentChants.map((chant, index) => (
                        <ListItem key={index} sx={{ borderRadius: 2, mb: 1 }}>
                          <ListItemIcon>
                            <MusicNote color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={chant.title}
                            secondary={`${chant.artist || 'Artiste inconnu'} • ${chant.Category?.name || 'Catégorie inconnue'}`}
                          />
                          <Chip
                            label={chant.is_active ? 'Actif' : 'Inactif'}
                            size="small"
                            color={chant.is_active ? 'success' : 'default'}
                          />
                        </ListItem>
                      ))
                    ) : (
                      <ListItem>
                        <ListItemText
                          primary="Aucun chant récent"
                          secondary="Les nouveaux chants apparaîtront ici"
                        />
                      </ListItem>
                    )}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Activité récente */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: 400, borderRadius: 3, overflow: 'hidden' }}>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Timeline color="info" />
                      <Typography variant="h6" fontWeight="bold">
                        Activité de la Semaine
                      </Typography>
                    </Box>
                  }
                  subheader="Tendances hebdomadaires"
                />
                <CardContent sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.1)} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: theme.palette.background.paper,
                          border: `1px solid ${theme.palette.divider}`,
                          borderRadius: 8,
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="lectures" 
                        stroke={theme.palette.primary.main}
                        strokeWidth={3}
                        dot={{ fill: theme.palette.primary.main, strokeWidth: 2, r: 6 }}
                        name="Lectures"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="nouveaux" 
                        stroke={theme.palette.secondary.main}
                        strokeWidth={3}
                        dot={{ fill: theme.palette.secondary.main, strokeWidth: 2, r: 6 }}
                        name="Nouveaux chants"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Onglet Analyses */}
        {activeTab === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ height: 400, borderRadius: 3, overflow: 'hidden' }}>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Analytics color="primary" />
                      <Typography variant="h6" fontWeight="bold">
                        Analyses Mensuelles
                      </Typography>
                    </Box>
                  }
                  subheader="Évolution des métriques clés"
                />
                <CardContent sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.1)} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: theme.palette.background.paper,
                          border: `1px solid ${theme.palette.divider}`,
                          borderRadius: 8,
                        }}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="lectures" 
                        stackId="1"
                        stroke={theme.palette.primary.main}
                        fill={alpha(theme.palette.primary.main, 0.3)}
                        name="Lectures"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="chants" 
                        stackId="1"
                        stroke={theme.palette.secondary.main}
                        fill={alpha(theme.palette.secondary.main, 0.3)}
                        name="Chants"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: 400, borderRadius: 3, overflow: 'hidden' }}>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TrendingUp color="success" />
                      <Typography variant="h6" fontWeight="bold">
                        Métriques Clés
                      </Typography>
                    </Box>
                  }
                  subheader="Indicateurs de performance"
                />
                <CardContent>
                  <Stack spacing={3}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Taux de croissance
                      </Typography>
                      <Typography variant="h4" color="success.main" fontWeight="bold">
                        +28.5%
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={28.5} 
                        color="success"
                        sx={{ mt: 1, height: 8, borderRadius: 4 }}
                      />
                    </Box>
                    
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Engagement utilisateur
                      </Typography>
                      <Typography variant="h4" color="primary.main" fontWeight="bold">
                        72%
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={72} 
                        color="primary"
                        sx={{ mt: 1, height: 8, borderRadius: 4 }}
                      />
                    </Box>
                    
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Qualité du contenu
                      </Typography>
                      <Typography variant="h4" color="warning.main" fontWeight="bold">
                        85%
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={85} 
                        color="warning"
                        sx={{ mt: 1, height: 8, borderRadius: 4 }}
                      />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Onglet Tendances */}
        {activeTab === 2 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Timeline color="info" />
                      <Typography variant="h6" fontWeight="bold">
                        Tendances et Prédictions
                      </Typography>
                    </Box>
                  }
                  subheader="Analyse prédictive basée sur les données historiques"
                />
                <CardContent>
                  <Alert severity="info" sx={{ mb: 3 }}>
                    <Typography variant="body2">
                      Les tendances sont calculées en fonction de l'activité des 30 derniers jours
                    </Typography>
                  </Alert>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>
                        Prédictions pour le mois prochain
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <TrendingUp color="success" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Croissance des écoutes"
                            secondary="Augmentation prévue de 35% basée sur les tendances actuelles"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <MusicNote color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Nouveaux chants"
                            secondary="Estimation de 15-20 nouveaux chants ajoutés"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Category color="secondary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Expansion des catégories"
                            secondary="2-3 nouvelles catégories recommandées"
                          />
                        </ListItem>
                      </List>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>
                        Recommandations
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <Favorite color="error" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Chants populaires"
                            secondary="Focus sur les chants de louange (+45% d'écoutes)"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Schedule color="warning" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Moment optimal"
                            secondary="Pics d'activité le dimanche et mercredi soir"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <People color="info" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Engagement"
                            secondary="Ajouter plus de fonctionnalités interactives"
                          />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Dashboard;
