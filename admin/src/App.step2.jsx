import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Typography } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// Composant de test pour le Dashboard
const TestDashboard = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" component="h1" gutterBottom>
      Dashboard Test avec AuthProvider
    </Typography>
    <Typography variant="body1">
      Le contexte d'authentification fonctionne !
    </Typography>
  </Box>
);

// Composant de test pour le Login
const TestLogin = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" component="h1" gutterBottom>
      Login Test
    </Typography>
    <Typography variant="body1">
      Page de connexion de test
    </Typography>
  </Box>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<TestLogin />} />
            <Route path="/dashboard" element={<TestDashboard />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
