import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import UserLogIn from '../components/UserLogIn';
import ResponsiveAppBar from '../components/ResponsiveAppBar';

const LogInPage = () => {
  const [showWelcomeImage, setShowWelcomeImage] = useState(false);

  const handleLogin = () => {
    setShowWelcomeImage(true);
  };
    // navigate to the user's profile page
    useEffect(() => {
      let timer;
      // If showWelcomeImage is true, set up a timer
      if (showWelcomeImage) {
        timer = setTimeout(() => {

          // Navigate to the UserProfile page after 2 seconds (not working atm, will have a look later)
          console.log('Navigating to UserProfile');
          setShowWelcomeImage(false); // Reset the state
        }, 2000);
      }
      // Cleanup timer if the component is unmounted
      return () => {
        clearTimeout(timer);
      };
    }, [showWelcomeImage]);

    return (
      < >
      <ResponsiveAppBar />
      <Container>
        <Box my={4}>
          <Typography variant="body1" paragraph>
            Log in now to View, Share or Add your daily logs!
          </Typography>
        </Box>
        {showWelcomeImage ? (
          <div>
            {/* Display your welcome back image here */}
            <img src="loggeduser.png" alt="Welcome Back" />
          </div>
        ) : (
          <UserLogIn onLogin={handleLogin} />
        )}
      </Container>
      </>
    );
  };

export default LogInPage;
