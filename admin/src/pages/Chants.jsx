import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Alert,
  Fab,
  InputAdornment,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Search,
  MusicNote,
  PlayArrow,
  Pause,
  Visibility,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import chantService from '../services/chantService';
import categoryService from '../services/categoryService';

const chantSchema = yup.object().shape({
  title: yup.string().required('Le titre est requis').min(2, 'Le titre doit contenir au moins 2 caractères'),
  artist: yup.string().required('L\'artiste est requis').min(2, 'L\'artiste doit contenir au moins 2 caractères'),
  lyrics: yup.string().required('Les paroles sont requises').min(10, 'Les paroles doivent contenir au moins 10 caractères'),
  categoryId: yup.string().required('La catégorie est requise'),
  audio_url: yup.string().url('URL audio invalide').nullable(),
  video_url: yup.string().url('URL vidéo invalide').nullable(),
  duration: yup.number().positive('La durée doit être positive').nullable(),
  language: yup.string().nullable(),
  tags: yup.string().nullable(),
});

const Chants = () => {
  const [chants, setChants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingChant, setEditingChant] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [chantToDelete, setChantToDelete] = useState(null);
  const [lyricsDialogOpen, setLyricsDialogOpen] = useState(false);
  const [selectedChant, setSelectedChant] = useState(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(chantSchema),
  });

  useEffect(() => {
    loadChants();
    loadCategories();
  }, [page, searchTerm, selectedCategory]);

  const loadChants = async () => {
    try {
      console.log('🔄 Chargement des chants...');
      setLoading(true);
      const params = {
        limit: 12,
        offset: (page - 1) * 12,
        search: searchTerm,
        categoryId: selectedCategory,
      };

      const result = await chantService.getChants(params);
      console.log('📋 Résultat chants:', result);
      
      if (result.success) {
        const chantsData = result.data.data || result.data.chants || result.data || [];
        console.log('🎵 Chants récupérés:', chantsData);
        setChants(chantsData);
        setTotalPages(Math.ceil((result.data.total || result.total || chantsData.length) / 12));
      } else {
        console.error('❌ Erreur:', result.message);
        toast.error(result.message);
      }
    } catch (error) {
      console.error('❌ Erreur lors du chargement des chants:', error);
      toast.error('Erreur lors du chargement des chants');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const result = await categoryService.getCategories();
      if (result.success) {
        setCategories(result.data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des catégories:', error);
    }
  };

  const handleOpenDialog = (chant = null) => {
    setEditingChant(chant);
    if (chant) {
      reset({
        title: chant.title,
        artist: chant.artist || '',
        lyrics: chant.lyrics,
        categoryId: chant.category_id?.toString() || chant.categoryId?.toString(),
        audio_url: chant.audio_url || '',
        video_url: chant.video_url || '',
        duration: chant.duration || '',
        language: chant.language || 'fr',
        tags: chant.tags || '',
      });
    } else {
      reset({
        title: '',
        artist: '',
        lyrics: '',
        categoryId: '',
        audio_url: '',
        video_url: '',
        duration: '',
        language: 'fr',
        tags: '',
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingChant(null);
    reset();
  };

  const onSubmit = async (data) => {
    try {
      // Convertir les données pour correspondre au backend
      const chantData = {
        title: data.title,
        artist: data.artist,
        lyrics: data.lyrics,
        category_id: parseInt(data.categoryId), // Convertir en entier et corriger le nom
        audio_url: data.audio_url || null,
        video_url: data.video_url || null,
        duration: data.duration ? parseInt(data.duration) : null,
        language: data.language || 'fr',
        tags: data.tags || null,
      };

      console.log('🚀 Données à envoyer:', chantData);

      const result = editingChant
        ? await chantService.updateChant(editingChant.id, chantData)
        : await chantService.createChant(chantData);

      if (result.success) {
        toast.success(editingChant ? 'Chant modifié avec succès' : 'Chant créé avec succès');
        handleCloseDialog();
        loadChants();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde:', error);
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const handleDeleteClick = (chant) => {
    setChantToDelete(chant);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const result = await chantService.deleteChant(chantToDelete.id);
      if (result.success) {
        toast.success('Chant supprimé avec succès');
        setDeleteDialogOpen(false);
        setChantToDelete(null);
        loadChants();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setPage(1);
  };

  const handleViewLyrics = (chant) => {
    setSelectedChant(chant);
    setLyricsDialogOpen(true);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Gestion des Chants
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Nouveau Chant
        </Button>
      </Box>

      {/* Filtres */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Rechercher un chant..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Catégorie</InputLabel>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Catégorie"
            >
              <MenuItem value="">Toutes les catégories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Liste des chants */}
      <Grid container spacing={3}>
        {chants.map((chant) => (
          <Grid item xs={12} sm={6} md={4} key={chant.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <MusicNote sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" component="h2" noWrap>
                    {chant.title}
                  </Typography>
                </Box>
                {chant.artist && (
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    Par {chant.artist}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {chant.lyrics?.substring(0, 100)}...
                </Typography>
                <Button
                  size="small"
                  startIcon={<Visibility />}
                  onClick={() => handleViewLyrics(chant)}
                  sx={{ mb: 2 }}
                >
                  Voir les paroles
                </Button>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  <Chip
                    label={chant.Category?.name || 'Sans catégorie'}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  {chant.language && (
                    <Chip
                      label={chant.language.toUpperCase()}
                      size="small"
                      color="secondary"
                      variant="outlined"
                    />
                  )}
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {chant.audio_url && (
                    <Chip
                      label="Audio"
                      size="small"
                      color="success"
                      variant="outlined"
                      sx={{ fontSize: '0.75rem' }}
                    />
                  )}
                  {chant.video_url && (
                    <Chip
                      label="Vidéo"
                      size="small"
                      color="info"
                      variant="outlined"
                      sx={{ fontSize: '0.75rem' }}
                    />
                  )}
                  {chant.duration && (
                    <Chip
                      label={`${Math.floor(chant.duration / 60)}:${(chant.duration % 60).toString().padStart(2, '0')}`}
                      size="small"
                      color="default"
                      variant="outlined"
                      sx={{ fontSize: '0.75rem' }}
                    />
                  )}
                </Box>
              </CardContent>
              <CardActions>
                <IconButton
                  size="small"
                  onClick={() => handleOpenDialog(chant)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteClick(chant)}
                  color="error"
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}

      {/* Dialog pour créer/modifier un chant */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingChant ? 'Modifier le chant' : 'Nouveau chant'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {/* Titre */}
              <Grid item xs={12}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Titre *"
                      error={!!errors.title}
                      helperText={errors.title?.message}
                      variant="outlined"
                      placeholder="Ex: Amazing Grace"
                    />
                  )}
                />
              </Grid>
              
              {/* Artiste */}
              <Grid item xs={12}>
                <Controller
                  name="artist"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Artiste *"
                      error={!!errors.artist}
                      helperText={errors.artist?.message}
                      variant="outlined"
                      placeholder="Ex: John Newton"
                    />
                  )}
                />
              </Grid>
              
              {/* Catégorie */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.categoryId}>
                      <InputLabel>Catégorie *</InputLabel>
                      <Select {...field} label="Catégorie *">
                        {categories.map((category) => (
                          <MenuItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.categoryId && (
                        <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                          {errors.categoryId?.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>
              
              {/* Langue */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="language"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Langue</InputLabel>
                      <Select {...field} label="Langue">
                        <MenuItem value="fr">Français</MenuItem>
                        <MenuItem value="en">Anglais</MenuItem>
                        <MenuItem value="es">Espagnol</MenuItem>
                        <MenuItem value="it">Italien</MenuItem>
                        <MenuItem value="de">Allemand</MenuItem>
                        <MenuItem value="pt">Portugais</MenuItem>
                        <MenuItem value="other">Autre</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              
              {/* Paroles */}
              <Grid item xs={12}>
                <Controller
                  name="lyrics"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Paroles *"
                      multiline
                      rows={8}
                      error={!!errors.lyrics}
                      helperText={errors.lyrics?.message}
                      variant="outlined"
                      placeholder="Saisissez les paroles du chant ici..."
                    />
                  )}
                />
              </Grid>
              
              {/* URLs Audio et Vidéo */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="audio_url"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="URL Audio"
                      error={!!errors.audio_url}
                      helperText={errors.audio_url?.message}
                      variant="outlined"
                      placeholder="https://example.com/audio.mp3"
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Controller
                  name="video_url"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="URL Vidéo"
                      error={!!errors.video_url}
                      helperText={errors.video_url?.message}
                      variant="outlined"
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  )}
                />
              </Grid>
              
              {/* Durée */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="duration"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Durée (en secondes)"
                      type="number"
                      error={!!errors.duration}
                      helperText={errors.duration?.message}
                      variant="outlined"
                      placeholder="240"
                    />
                  )}
                />
              </Grid>
              
              {/* Tags */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Tags"
                      error={!!errors.tags}
                      helperText="Séparez les tags par des virgules (ex: louange, joie, espoir)"
                      variant="outlined"
                      placeholder="louange, joie, espoir"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            {editingChant ? 'Modifier' : 'Créer'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de confirmation de suppression */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <Typography>
            Êtes-vous sûr de vouloir supprimer le chant "{chantToDelete?.title}" ?
            Cette action est irréversible.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Annuler</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog pour afficher les paroles */}
      <Dialog 
        open={lyricsDialogOpen} 
        onClose={() => setLyricsDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedChant?.title}
          {selectedChant?.artist && (
            <Typography variant="subtitle1" color="text.secondary">
              Par {selectedChant.artist}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent>
          <Typography 
            variant="body1" 
            sx={{ 
              whiteSpace: 'pre-line', 
              fontFamily: 'monospace',
              lineHeight: 1.6,
              mt: 2
            }}
          >
            {selectedChant?.lyrics}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLyricsDialogOpen(false)}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Chants;
