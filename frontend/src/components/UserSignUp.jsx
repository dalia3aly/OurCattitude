import React, { useState } from "react";
import { Button, TextField, Container, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const UserSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    location: "",
    password: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // check if user email is already in in the database
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //handling the Sign Up form submit and related validations and error messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for username, email and password length

    if (formData.username.length < 6) {
      setErrorMessage('Username must be at least 5 characters long.');
      return;           // Stop here and don't make API request
    }

    if (!formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    
  if (formData.password.length < 6) {
    setErrorMessage('Password must be at least 6 characters long.');
    return;  
  }
    try {
      const response = await axios.post('http://localhost:3000/user/signup', formData);
      
      // Reset any previous error messages
      setErrorMessage('');
  
      console.log('User created:', response.data);
      
      // Redirecting the user to the login page
      navigate('/login');
    } catch (error) {
      console.error('There was an error signing up:', error);
  
      // Here is to set an error message based on the response from the server
      if (error.response && error.response.data) {

        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    }
  };
  

  return (
    <Container>
      <Typography variant="h4">User Sign Up</Typography>
      {isSubmitted ? (
        <div>
          <Typography variant="h5">Thank you for signing up!</Typography>
          <img src="/happycat.png" alt="Confirmation" />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            name="username"
            label="Username"
            variant="outlined"
            onChange={handleChange}
            value={formData.username}
          />
          <TextField
            fullWidth
            margin="normal"
            name="email"
            label="Email"
            variant="outlined"
            type="email"
            onChange={handleChange}
            value={formData.email}
          />
          <TextField
            fullWidth
            margin="normal"
            name="location"
            label="Location"
            variant="outlined"
            onChange={handleChange}
            value={formData.location}
          />
          <TextField
            fullWidth
            margin="normal"
            name="password"
            label="Password"
            variant="outlined"
            type="password"
            onChange={handleChange}
            value={formData.password}
          />
          <Button variant="contained" color="primary" type="submit">
            Sign Up
          </Button>
        </form>
      )}
      {errorMessage && (
        <Typography variant="body2" color="error">
          {errorMessage}
        </Typography>
      )}

    </Container>
  );
};

export default UserSignUp;
