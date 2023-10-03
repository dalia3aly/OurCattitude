import React from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from "axios";
import Alert from '@mui/material/Alert';

const UserLogIn = ({ onLogin }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);            // Reset any previous error messages
    const username = e.target.username.value;
    const password = e.target.password.value;
  
    try {
      const response = await axios.post('http://localhost:3000/api/user/login', {
        username,
        password,
      });
  
      if (response.data.token) {
        login(response.data.token, response.data.userID);          // Using AuthContext to manage token AFTER the async call
        navigate('/userprofile');          // Redirect to user profile
      }
  
    } catch (error) {
      // Handle error: set error message and log error to console
      setErrorMessage("Wrong username or password. Please try again.");
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
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
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
