import React, { useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';  



const UserUpdateInfo = () => {
    const [oldEmail, setOldEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState(null);
    const { login, userID } = useAuth();  

    const userToken = localStorage.getItem("userToken");
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };


  const handleUpdate = async () => {
    console.log("UserID in UserUpdateInfo:", userID);       // Debugging line

    if (!oldEmail || !newEmail || !oldPassword || !newPassword) {
        setMessage('All fields are required.');
        return;
      }
      console.log(userID);
    try {
      const response = await axios.put(`http://localhost:3000/user/update/${userID}`, { 
        oldEmail,
        newEmail,
        oldPassword,
        newPassword,
    },  config
        
      );

      console.log('Response:', response.data);
      login(response.data.token, response.data.userID);  
      setMessage('Update successful!');
    } catch (error) {
        setMessage('Error updating info. Please try again.');
        console.error('Error updating user info:', error);
    }

    console.log("UserID in UserUpdateInfo:", userID);       // Debugging line
  };

  return (
    <Grid container spacing={2}>
    <Grid item xs={12}>
      <Typography variant="h6">Update Email and Password</Typography>
    </Grid>
    <Grid item xs={12}>
      <TextField label="Old Email" fullWidth value={oldEmail} onChange={(e) => setOldEmail(e.target.value)} />
    </Grid>
    <Grid item xs={12}>
      <TextField label="New Email" fullWidth value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
    </Grid>
    <Grid item xs={12}>
      <TextField label="Old Password" fullWidth type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
    </Grid>
    <Grid item xs={12}>
      <TextField label="New Password" fullWidth type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
    </Grid>
    <Grid item xs={12}>
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update
      </Button>
    </Grid>
    {message && (
      <Grid item xs={12}>
        <Typography variant="body2">{message}</Typography>
      </Grid>
    )}
  </Grid>
);
};

export default UserUpdateInfo;
