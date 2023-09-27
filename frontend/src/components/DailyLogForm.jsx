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
import axios from "axios";



export default function DailyLogForm({ open, handleClose }) {
  const [date, setDate] = useState("");
  const [hoursOfSleep, setHoursOfSleep] = useState(0);
  const [litterHabits, setLitterHabits] = useState("");
  const [activityLevel, setActivityLevel] = useState(1);
  const [unusualBehaviours, setUnusualBehaviours] = useState("");

  const [foodProducts, setFoodProducts] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);



useEffect(() => {
    axios
      .get('/api/foodproducts')
      .then(response => {
        setFoodProducts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the food products", error);
      });
  }, []);


  const handleAutoComplete = (event, newValue) => {
    setSelectedFoods([...selectedFoods, newValue]);
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
      date,
      hoursOfSleep,
      litterHabits,
      activityLevel,
      unusualBehaviours,
      foods: selectedFoods,
    };

    // Send form data to the backend
    axios
      .post('/api/dailylog', formData)
      .then(response => {
        console.log("Data submitted successfully:", response);
      })
      .catch(error => {
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
      options={foodProducts.map(food => food.product)} 
      onInputChange={handleAutoComplete}
      renderInput={(params) => (
        <TextField {...params} label="Search Food Products" />
      )}
    />

          <List>
            {selectedFoods.map((food, index) => (
              <ListItem key={index}>
                {editableIndex === index ? (
                  <TextField
                    autoFocus
                    value={food}
                    onChange={(e) => {
                      const newSelectedFoods = [...selectedFoods];
                      newSelectedFoods[index] = e.target.value;
                      setSelectedFoods(newSelectedFoods);
                    }}
                  />
                ) : (
                  <Typography>{food}</Typography>
                )}
                {/* <IconButton onClick={() => handleEdit(index)}>
                  <EditIcon />
                </IconButton> */}
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
