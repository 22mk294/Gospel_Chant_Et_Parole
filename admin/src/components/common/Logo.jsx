import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import logoGospel from '../../assets/images/logoGospel.PNG';

// Styled components pour le logo
const LogoContainer = styled(Box)(({ theme, size = 'medium' }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  ...(size === 'small' && {
    '& .logo-icon': {
      width: 24,
      height: 24,
    },
    '& .logo-text': {
      fontSize: '1rem',
    },
  }),
  ...(size === 'medium' && {
    '& .logo-icon': {
      width: 32,
      height: 32,
    },
    '& .logo-text': {
      fontSize: '1.2rem',
    },
  }),
  ...(size === 'large' && {
    '& .logo-icon': {
      width: 48,
      height: 48,
    },
    '& .logo-text': {
      fontSize: '1.5rem',
    },
  }),
}));

const LogoIcon = styled('img')(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(244, 67, 54, 0.3)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #f44336 0%, #e91e63 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
}));

const Logo = ({ 
  size = 'medium', 
  showText = true, 
  onClick = null,
  variant = 'default' // 'default', 'white', 'dark'
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <LogoContainer size={size} onClick={handleClick}>
      <LogoIcon 
        className="logo-icon" 
        src={logoGospel} 
        alt="Gospel Chant Et Parole"
      />
      {showText && (
        <LogoText 
          className="logo-text" 
          variant="h6" 
          component="div"
          sx={{
            ...(variant === 'white' && {
              background: 'white',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }),
            ...(variant === 'dark' && {
              background: '#333',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }),
          }}
        >
          Gospel
        </LogoText>
      )}
    </LogoContainer>
  );
};

export default Logo;
