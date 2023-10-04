import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Slider,
  Typography,
  Autocomplete,
  Stack,
  IconButton,
  Box,
  InputLabel,
  ListItem,
  List,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Select, MenuItem } from "@mui/material";
import axios from "axios";

function DailyLogForm({ open, handleClose, catID }) {
  const [date, setDate] = useState("");
  const [hoursOfSleep, setHoursOfSleep] = useState(0);
  const [litterHabits, setLitterHabits] = useState("");
  const [activityLevel, setActivityLevel] = useState(1);
  const [unusualBehaviours, setUnusualBehaviours] = useState("");
  const [envChanges, setEnvChanges] = useState("");

  const [foodProducts, setFoodProducts] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);

// to fetch available food products from the backend to select food products consumed by the cat

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    axios
      .get(`http://localhost:3000/api/foodproducts`, config)
      .then((response) => {
        setFoodProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the food products", error);
      });
  }, []);

  const handleAutoComplete = (event, newValue) => {
    setSelectedFoods([
      ...selectedFoods,
      { fullProductName: newValue, servingSize: "50gm" },     // Default serving size is 50gm
    ]);
  };

  //Edit selected food products list

  const handleDelete = (index) => {
    const newSelectedFoods = [...selectedFoods];
    newSelectedFoods.splice(index, 1);
    setSelectedFoods(newSelectedFoods);
  };

  //   const handleEdit = (index) => {
  //     setEditableIndex(index);
  //   };

  const handleSubmit = () => {
    const formData = {
      catID,
      Date: date,
      ActivityLevel: activityLevel,
      SleepingHours: hoursOfSleep,
      LitterHabits: litterHabits,
      UnusualBehaviours: unusualBehaviours,
      EnvChanges: envChanges,
      foodData: JSON.stringify(selectedFoods),  // stringify the array as the corresponding db column DataType is JSON
    };

    const userToken = localStorage.getItem("userToken");
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    // Send form data to the backend
    axios
      .post(
        `http://localhost:3000/api/dailylogs/:catID/addLog`,
        formData,
        config
      )
      .then((response) => {
        console.log("Data submitted successfully:", response);
      })
      .catch((error) => {
        console.error("There was an error submitting the data:", error);
      });

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Daily Log</DialogTitle>
      <DialogContent>
        <Stack spacing={4}>
          <TextField
            label=""
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
          />
          <Typography gutterBottom>Activity Level</Typography>
          <Slider
            value={activityLevel}
            min={1}
            max={10}
            step={1}
            onChange={(_, newValue) => setActivityLevel(newValue)}
          />

          <Typography gutterBottom>Food Consumed</Typography>
          <Autocomplete
            options={foodProducts.map((food) => food.fullProductName)}
            onChange={(event, newValue) => handleAutoComplete(event, newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Search Food Products" />
            )}
          />

          <List>
            {selectedFoods.map((food, index) => (
              <ListItem key={index}>
                <Typography>{food.fullProductName}</Typography>
                <Select
                  value={food.servingSize}
                  onChange={(e) => {
                    const newSelectedFoods = [...selectedFoods];
                    newSelectedFoods[index].servingSize = e.target.value;
                    setSelectedFoods(newSelectedFoods);
                  }}>
                  <MenuItem value="10">10gm</MenuItem>
                  <MenuItem value="20">20gm</MenuItem>
                  <MenuItem value="30">30gm</MenuItem>
                  <MenuItem value="40">40gm</MenuItem>
                  <MenuItem value="50">50gm</MenuItem>
                  <MenuItem value="60">60gm</MenuItem>
                  <MenuItem value="70">70gm</MenuItem>
                  <MenuItem value="80">80gm</MenuItem>
                  <MenuItem value="90">90gm</MenuItem>
                  <MenuItem value="100">100gm</MenuItem>
                  <MenuItem value="110">110gm</MenuItem>
                  <MenuItem value="120">120gm</MenuItem>
                  <MenuItem value="130">130gm</MenuItem>
                  <MenuItem value="140">140gm</MenuItem>
                  <MenuItem value="150">150gm</MenuItem>
                  <MenuItem value="160">160gm</MenuItem>
                </Select>
                <IconButton onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>

          <Box>
        <InputLabel>Hours of Sleep</InputLabel>
        <TextField
          type="number"
          value={hoursOfSleep}
          onChange={(e) => setHoursOfSleep(e.target.value)}
          fullWidth
        />
      </Box>
      <Box>
        <InputLabel>Litterbox Patterns - if normal, leave blank</InputLabel>
        <TextField
          value={litterHabits}
          label="ex: went more often, diarrhea, constipation, ..etc"
          onChange={(e) => setLitterHabits(e.target.value)}
          fullWidth
        />
      </Box>
      <Box>
        <InputLabel>Any Unusual Behaviour? if no, leave blank</InputLabel>
        <TextField
          value={unusualBehaviours}
          label="ex: vomiting, biting, more vocal, ..etc"
          onChange={(e) => setUnusualBehaviours(e.target.value)}
          fullWidth
        />
      </Box>
      <Box>
        <InputLabel>Anything changed in your environment? if no, leave blank</InputLabel>
        <TextField
          value={envChanges}
          label="ex: moved houses, new body spray, ..etc"
          onChange={(e) => setEnvChanges(e.target.value)}
          fullWidth
        />
      </Box>

        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DailyLogForm;
