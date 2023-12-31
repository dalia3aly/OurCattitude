// irrelevant to UserProfile.jsx 
import React from "react";
import { useState, useEffect } from "react";
import { Box, Button, Container, Grid, Dialog, Stack } from "@mui/material";
import CatCard from "../components/CatCard";
import CatFactBox from "../components/CatFactBox"; 
import AppBar from "../components/MainAppBar";
import AddingCat from "../components/AddingCat";
import axios from "axios";
import MainAppBar from "../components/MainAppBar";


const UserProfile = () => {
  // State for the AddingCat dialog
  const [openAddingCat, setOpenAddingCat] = useState(false);

  // State for storing cats fetched from the server
  const [cats, setCats] = useState([]);

  const fetchCats = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const response = await axios.get(
        `http://localhost:3000/cat/user/cats`,
        config
      );
      if (response.data) {
        setCats(response.data);
      }
    } catch (error) {
      console.log("Error fetching cats:", error.response.data);
    }
  };

  const handleOpenAddingCat = () => {
    setOpenAddingCat(true);
  };

  const handleCloseAddingCat = () => {
    setOpenAddingCat(false);
    fetchCats(); 
  };

  useEffect(() => {
    fetchCats();
  }, []);


  // Fetch cats when the component mounts
  useEffect(() => {
    const fetchCats = async () => {
      try {
        console.log("Before getting token");
        const userToken = localStorage.getItem("userToken");
        console.log("After getting token", userToken);
        const config = {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        };
        console.log(config);
        const response = await axios.get(
          `http://localhost:3000/cat/user/cats`,
          config
        );
        if (response.data) {
          setCats(response.data);
        }
      } catch (error) {
        console.log("Error fetching cats:", error.response.data);
      }
    };

    fetchCats();
  }, []);

  return (
    <Container>
      <MainAppBar />
      <Grid container spacing={3} className = "content-padding">
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
                onClick={handleOpenAddingCat}>
                Add Cat
              </Button>
              <Dialog open={openAddingCat} onClose={handleCloseAddingCat}>
                <Stack spacing={6}>
                  <AddingCat />
                  <Button onClick={handleCloseAddingCat}>Close</Button>
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

    </Container>
  );
};

export default UserProfile;
