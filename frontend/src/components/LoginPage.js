import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const { signIn } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(username, password);
    navigate('/');
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        > 
          <Avatar  sx={{ m: 1, bgcolor: 'black' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="usernames"
              autoComplete="email"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                '& label.Mui-focused': {
                  color: '#444', 
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#444', 
                  },
                  '&:hover fieldset': {
                    borderColor: '#444', 
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#444', 
                  },
                },
              }}
            />
            <TextField
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
              sx={{
                '& label.Mui-focused': {
                  color: '#444', 
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#444', 
                  },
                  '&:hover fieldset': {
                    borderColor: '#444', 
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#444', 
                  },
                },
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
           

           <Button
  type="submit"
  fullWidth
  variant="contained"
  sx={{
    mt: 3,
    mb: 2,
    backgroundColor: '#444444',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#444444', 
      opacity: 0.8, 
    },
    '&:focus': {
      backgroundColor: '#444444', 
      outline: 'none',
      boxShadow: 'none',
    },
    '&:active': {
      backgroundColor: '#444444', 
      boxShadow: 'none',
    },
  }}
>
  Sign In
</Button>

            <Grid container>
            
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
