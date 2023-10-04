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
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { parseISO } from "date-fns";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

// Avatar images to choose from
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

const AddingCat = ({ closeForm }) => {
  const [catInfo, setCatInfo] = useState({
    name: "",
    breed: "",
    colour: "",
    ageYears: "",       // will be stringified to fill "age" JSON column in MySQL 
    ageMonths: "",       // will be stringified to fill "age" JSON column in MySQL
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
    //stackoverflow.com/questions/66015330/how-to-use-mui-x-date-pickers-datepickers-in-react



 // This handles the age dropdown changes
  const handleAgeChange = (e) => {
    const { name, value } = e.target;
    setCatInfo({
      ...catInfo,
      [name]: value,
    });
  };

  const handleAvatarChange = (e) => {
    setCatInfo({
      ...catInfo,
      avatar: e.target.value,
    });
  };

  // form submission handling

  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleSubmit = (e) => {
    e.preventDefault();

    const userToken = localStorage.getItem("userToken");
    // Fetching token from local storage

    // Submit to the server below

    axios.post(`http://localhost:3000/cat/addCat`, catInfo, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate("/userprofile"); // Navigate to the user profile page
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };



  return (
    <Container component="main" maxWidth="xs" style={{ padding: "20px", alignContent: "center"}}>
      <Typography component="h1" variant="h5">
        Add Cat Details
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
        <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Age - Years</InputLabel>
        <Select
          label="Age - Years"
          name="ageYears"                        // new
          value={catInfo.ageYears}              // new
          onChange={handleAgeChange}             // new
        >
          {/* perhaps 0-30 years? */}
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={11}>11</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={13}>13</MenuItem>
          <MenuItem value={14}>14</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={16}>16</MenuItem>
          <MenuItem value={17}>17</MenuItem>
          <MenuItem value={18}>18</MenuItem>
          <MenuItem value={19}>19</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={21}>21</MenuItem>
          <MenuItem value={22}>22</MenuItem>
          <MenuItem value={23}>23</MenuItem>
          <MenuItem value={24}>24</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={26}>26</MenuItem>
          <MenuItem value={27}>27</MenuItem>
          <MenuItem value={28}>28</MenuItem>
          <MenuItem value={29}>29</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Age - Months</InputLabel>
        <Select
          label="Age - Months"
          name="ageMonths" // new
          value={catInfo.ageMonths} // new
          onChange={handleAgeChange} // new
        >
          {/*  0-11 months */}
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={11}>11</MenuItem>
        </Select>
      </FormControl>

        <FormControl component="fieldset" margin="normal" alignContent="center">
          <RadioGroup style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}
            aria-label="avatar"
            name="avatar"     
            value={catInfo.avatar}           
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


