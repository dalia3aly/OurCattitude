import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import MainAppBar from '../components/MainAppBar';
import CatFactBox from '../components/CatFactBox';

const HomePage = () => {
  return (
    <div>
      <MainAppBar />  {/* Your Navigation Bar */}

      {/* Main content */}
      <Container>
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', marginTop: '5%'}}>
          <Grid item xs={12} sm={12} md={9} lg={3}>
            <Box display="flex" justifyContent="center">
              {/* Intro GIF */}
              <img src="/Intro.gif" alt="Intro GIF" style={{ width: '300%', height: 'auto' }} />
            </Box>
          </Grid >
          </Grid>
          <Grid item xs={6} sm={6} md={12} lg={12}>
          <CatFactBox />
          </Grid>
        
      </Container>

      {/* You can add more elements below this line */}
    </div>
  );
};

export default HomePage;
