import React, { useState } from 'react';
import { signup, login } from '../services/authService';
import { Container, Typography, TextField, Button, Box, Paper, Link } from '@mui/material';
import { styled } from '@mui/system';

// Custom styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '16px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  borderRadius: '8px',
  padding: '12px',
}));

const AuthForm = ({ isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = isLogin
        ? await login(email, password)
        : await signup(email, password);
      console.log('Auth Response:', response);
      // Save the token to localStorage or context
      localStorage.setItem('token', response.token);
      setError(''); // Clear any previous errors
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={3}>
        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
          {isLogin ? 'Welcome Back!' : 'Create an Account'}
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 4 }}>
          {isLogin ? 'Sign in to continue' : 'Sign up to get started'}
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </StyledButton>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link href={isLogin ? '/signup' : '/login'} variant="body2" sx={{ textDecoration: 'none' }}>
              {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
            </Link>
          </Box>
        </StyledForm>
      </StyledPaper>
    </Container>
  );
};

export default AuthForm;