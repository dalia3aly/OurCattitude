import React from "react";
import { Grid, Box } from "@mui/material";
import UserLogIn from "../components/UserLogIn";
import GuestAppBar from "../components/MainAppBar";

const LogInPage = () => {
  return (
    <div>
      <GuestAppBar spacing={3} maxWidth="lg" />
      <Grid container spacing={3} maxWidth="lg" justifyContent={"center"}>

        {/* Wide Grid for desktop, full width for mobile */}
        <Grid
          item
          xs={12}
          sm={10}
          md={8}
          lg={9}
          xl={7}
          >
          <Box>
          <Box display="flex" justifyContent="center">
              {/* Intro GIF */}
              <img src="/Pumpkin.gif" alt="Welcome Back" style={{ width: '70%', height: 'auto' }} />
            </Box>
            <UserLogIn />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default LogInPage;
