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

  const [foodProducts, setFoodProducts] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    axios.get("http://localhost:3000/api/foodproducts", config)
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
      { fullProductName: newValue, servingSize: "50gm"  },    // Default serving size is 50gm
    ]);
  };
  

  //Edit selected food products

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
      foodData: JSON.stringify(selectedFoods),    // stringify the array as the corresponding db column DataType is JSON
    };

    const userToken = localStorage.getItem("userToken");
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    // Send form data to the backend
    axios.post("http://localhost:3000/api/dailylogs/:catID/addLog", formData, config)
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
          {/* Existing form fields with added Typography for labels... */}

          <Typography gutterBottom>Activity Level</Typography>
          <Slider
            value={activityLevel}
            min={1}
            max={10}
            step={1}
            onChange={(_, newValue) => setActivityLevel(newValue)}
          />

          <Typography gutterBottom>Food Logs</Typography>
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
                  <MenuItem value="10gm">10gm</MenuItem>
                  <MenuItem value="20gm">20gm</MenuItem>
                  <MenuItem value="30gm">30gm</MenuItem>
                  <MenuItem value="40gm">40gm</MenuItem>
                  <MenuItem value="50gm">50gm</MenuItem>
                  <MenuItem value="60gm">60gm</MenuItem>
                  <MenuItem value="70gm">70gm</MenuItem>
                  <MenuItem value="80gm">80gm</MenuItem>
                  <MenuItem value="90gm">90gm</MenuItem>
                  <MenuItem value="100gm">100gm</MenuItem>
                  <MenuItem value="110gm">110gm</MenuItem>
                  <MenuItem value="120gm">120gm</MenuItem>
                  <MenuItem value="130gm">130gm</MenuItem>
                  <MenuItem value="140gm">140gm</MenuItem>
                  <MenuItem value="150gm">150gm</MenuItem>
                  <MenuItem value="160gm">160gm</MenuItem>
                </Select>
                <IconButton onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>

          <TextField
            label=""
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
          />
          <TextField
            label="Hours of Sleep"
            type="number"
            value={hoursOfSleep}
            onChange={(e) => setHoursOfSleep(e.target.value)}
            fullWidth
          />
          <TextField
            label="Litter Habits"
            value={litterHabits}
            onChange={(e) => setLitterHabits(e.target.value)}
            fullWidth
          />

          <TextField
            label="Unusual Behaviours"
            value={unusualBehaviours}
            onChange={(e) => setUnusualBehaviours(e.target.value)}
            fullWidth
          />
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

export default DailyLogForm
