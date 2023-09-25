// UserProfile.jsx
import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Box, Button, Container, Grid, Dialog, Stack } from "@mui/material";
import Header from "../themes/Header";
import Footer from "../themes/Footer";
import CatCard from "../components/CatCard";
import CatFactBox from "../components/CatFactBox"; // Assuming you have a separate Cat facts box component
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import AddingCat from "../components/AddingCat";
import axios from "axios";


const UserProfile = () => {
  // State for the AddingCat dialog
  const [openAddingCat, setOpenAddingCat] = useState(false);
  
  // State for storing cats fetched from the server
  const [cats, setCats] = useState([]);

  const handleOpenAddingCat = () => {
    setOpenAddingCat(true);
  };

  const handleCloseAddingCat = () => {
    setOpenAddingCat(false);
  };

  // Fetch cats when the component mounts
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const token = localStorage.getItem('token');  // Assuming you have saved your token in localStorage
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        console.log(config);
        const response = await axios.get('http://localhost:3000/cat/user/cats', config);
        if (response.data) {
          setCats(response.data);
        }
      } catch (error) {
        console.log("Error fetching cats:", error);
      }
    };
    
    fetchCats();
  }, []);

  return (
  <Container>
  <ResponsiveAppBar />
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <Grid container spacing={2}>
        {cats.map((cat, index) => (
          <Grid item key={index}>
            <CatCard cat={cat} />
          </Grid>
        ))}
        
        {/* Add Cat Button */}
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            style={{ width: 150, height: 150 }}
            onClick={handleOpenAddingCat}
          >
            Add Cat
          </Button>
          <Dialog open={openAddingCat} onClose={handleCloseAddingCat}>
            <Stack spacing={4}>
              <AddingCat />
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
