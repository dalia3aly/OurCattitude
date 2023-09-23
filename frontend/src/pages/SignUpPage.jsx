import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import UserSignUp from "../components/UserSignUp";
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import Footer from '../themes/Footer';

const SignUpPage = () => {
  return (
    < >    
    <ResponsiveAppBar />
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Sign Up..It's free!
        </Typography>
        <Typography variant="body1" paragraph>
          Join us now to keep track of your beloved cat's behaviours and routine!
        </Typography>
      </Box>
      <UserSignUp />
      <Box my={4}>
        <Typography variant="body2">
          By signing up, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
        </Typography>
      </Box>
    </Container>
    <Footer />
    </>

  );
};

export default SignUpPage;
