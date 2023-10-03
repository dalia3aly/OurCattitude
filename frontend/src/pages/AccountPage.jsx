import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Grid, TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import MainAppBar from '../components/MainAppBar';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AccountPage = () => {
  const [user, setUser] = useState({ username: '', email: '', location: '' });
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const { userID } = useParams();

  const userToken = localStorage.getItem("userToken");
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  useEffect(() => {
    // Fetch user details when the component mounts
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${userID}`, config);
        const user = response.data;
        setUsername(user.username);
        setEmail(user.email);
        setLocation(user.location);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, [userID]);


  const handleUpdate = async () => {
    if (!oldPassword) {
      // Show some message or handle this case
      return;
    }

    if (newPassword) {
      setOpenDialog(true);
      return;
    }

    await updateUser();
  };

  const updateUser = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const payload = {
        ...user,
        password: oldPassword,
      };

      const response = await axios.put(`http://localhost:3000/user/${userID}/update`, payload, config);

      console.log('User updated:', response.data);
      // Handle successful update
    } catch (error) {
      console.log('Update failed:', error);
      // Handle error
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDialog = async () => {
    await updateUser();
    setOpenDialog(false);
  };

  return (
    <Grid container spacing={3}>
      <MainAppBar />
      <Grid item xs={12}>
        <Typography variant="h4">Account Page</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField label="Username" fullWidth value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Email" fullWidth value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Location" fullWidth value={user.location} onChange={(e) => setUser({ ...user, location: e.target.value })} />
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
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Password Change</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To change your password, please enter your old password for confirmation.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Old Password"
            type="password"
            fullWidth
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDialog} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default AccountPage;
