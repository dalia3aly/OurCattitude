import React from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";

const UserLogIn = ({ onLogin }) => {

  const handleSubmit = async (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;
  try {
    const response = await axios.post('http://localhost:3000/api/user/login', {
      username,
      password,
    });

     if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        // navigate to user profile page
        if (typeof onLogin === 'function') {
          onLogin(); // This will only be executed if onLogin is indeed a function
        } else {
          console.log("`onLogin` is not a function or not passed as a prop.");
        }
      };
    } catch (error) {
      // Handle error: API call unsuccessful
      console.log("There was an error logging in:", error);
    }
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Log In
        </Typography>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField name="username" label="Username" variant="outlined" fullWidth margin="normal" />
          </div>
          <div>
            <TextField name="password" label="Password" type="password" variant="outlined" fullWidth margin="normal" />
          </div>
          <div>
            <Button type="submit" variant="contained" color="primary">
              Log In
            </Button>
          </div>
        </form>
      </Box>
    </Container>
  );
};

export default UserLogIn;
