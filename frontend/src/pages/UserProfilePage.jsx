// UserProfile.jsx
import React from "react";
import { useState } from "react";
import { Box, Button, Container, Grid, Dialog, Stack } from "@mui/material";
import Header from "../themes/Header";
import Footer from "../themes/Footer";
import CatCard from "../components/CatCard";
import CatFactBox from "../components/CatFactBox"; // Assuming you have a separate Cat facts box component
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import AddCat from "../components/AddCat";


const UserProfile = () => {
  const [openAddCat, setOpenAddCat] = useState(false); // State to control the AddCat dialog

  const handleOpenAddCat = () => {
    setOpenAddCat(true);
  };

  const handleCloseAddCat = () => {
    setOpenAddCat(false);
  };

  return (
    <Container>
      <ResponsiveAppBar />
      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Cat Cards */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {/* Here you would map your CatCards from the database */}
            <Grid item>
              <CatCard />
            </Grid>
            <Grid item>
              <CatCard />
            </Grid>

            {/* Add Cat Button */}
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                style={{ width: 150, height: 150 }}
                onClick={handleOpenAddCat} // Open the AddCat dialog when clicked
              >
                Add Cat
              </Button>
              <Dialog open={openAddCat} onClose={handleCloseAddCat}>
              <Stack spacing={4}>
                <AddCat />
              </Stack>
              </Dialog>
            </Grid>
          </Grid>
        </Grid>

        {/* Cat Fact Box */}
        <Grid item xs={12}>
          <CatFactBox />
        </Grid>
      </Grid>

      {/* Footer */}
      <Footer />
    </Container>
  );
};

export default UserProfile;
