import React, { useState } from "react";
import {
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { parseISO } from "date-fns";

import axios from "axios";

export const Avatar1 = () => (
  <img src="/Avatars/avatar1.png" alt="Avatar 1" width="100" height="100" />
);

export const Avatar2 = () => (
  <img src="/Avatars/avatar2.png" alt="Avatar 2" width="100" height="100" />
);

export const Avatar3 = () => (
  <img src="/Avatars/avatar3.png" alt="Avatar 3" width="100" height="100" />
);

export const Avatar4 = () => (
  <img src="/Avatars/avatar4.png" alt="Avatar 4" width="100" height="100" />
);

const AddingCat = () => {
  const [catInfo, setCatInfo] = useState({
    name: "",
    breed: "",
    colour: "",
    dob: "",
    gender: "",
    chronic_issues: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCatInfo({
      ...catInfo,
      [name]: value,
    });
  };

    // MUI new date & LocalizationProvider headache:
    
  const handleDateChange = (newDate) => {
    setCatInfo({
      ...catInfo,
      dob: parseISO(newDate),
    });
  };

  const handleAvatarChange = (e) => {
    setCatInfo({
      ...catInfo,
      avatar: e.target.value,
    });
  };



  

  const handleSubmit = (e) => {
    e.preventDefault();

    const userToken = localStorage.getItem("userToken");
    // Fetching token from local storage
    // Submit to the server
    axios
      .post("http://localhost:3000/cat/addCat", catInfo, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Add Cat
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Cat Name"
          name="name"
          autoFocus
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Breed"
          name="breed"
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Colour"
          name="colour"
          onChange={handleChange}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date of Birth"
            value={catInfo.dob}
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField {...params} fullWidth variant="outlined" />
            )}
          />
        </LocalizationProvider>
        <FormControl component="fieldset" margin="normal">
          <RadioGroup
            aria-label="avatar"
            name="avatar" // Should be avatar to match your state
            value={catInfo.avatar} // Should be avatar to match your state
            onChange={handleAvatarChange}
            row>
            <FormControlLabel
              value="avatar1"
              control={<Radio />}
              label={<Avatar1 />}
            />
            <FormControlLabel
              value="avatar2"
              control={<Radio />}
              label={<Avatar2 />}
            />
            <FormControlLabel
              value="avatar3"
              control={<Radio />}
              label={<Avatar3 />}
            />
            <FormControlLabel
              value="avatar4"
              control={<Radio />}
              label={<Avatar4 />}
            />
          </RadioGroup>
        </FormControl>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select
            label="Gender"
            name="gender"
            value={catInfo.gender}
            onChange={handleChange}>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Chronic Issues (if applicable)"
          name="chronic_issues"
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          margin="normal">
          Add Cat
        </Button>
      </Box>
    </Container>
  );
};

export default AddingCat;


