import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import UserSignUp from "../components/UserSignUp";
import GuestAppBar from '../components/MainAppBar';
import Footer from '../themes/Footer';

const SignUpPage = () => {
  return (
    <div>
      <GuestAppBar spacing={3} maxWidth="lg" />
      <Grid container spacing={3} maxWidth="lg">

        {/* Wide Grid for desktop, full width for mobile */}
        <Grid
          item
          xs={6}
          sm={6}
          md={9}
          lg={12}
          className="user-page-container">
          <Box>
          <Typography variant="body1" paragraph tyle={{ marginTop: "50px" }}>
          Join us to keep track of your cats behaviours and routine !
        </Typography>
            <UserSignUp />
          </Box>
        </Grid>
      </Grid>
    </div>

  );
};

export default SignUpPage;
