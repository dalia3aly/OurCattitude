import React, { useState, useEffect } from "react";
import {
  Dialog,
  List,
  DialogContent,
  Card,
  CardContent,
  DialogTitle,
  Typography,
  Stack,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";

function ViewDailyLog({ open, handleClose, catID, date }) {
  const [dailyLogData, setDailyLogData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userToken = localStorage.getItem("userToken");
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      try {
        const response = await axios.get(
          `http://localhost:3000/api/dailylogs/${catID}/logs/${date}`,
          config
        );
        setDailyLogData(response.data);
        console.log("Fetched data:", response.data);
      } catch (error) {
        console.error("There was an error fetching the daily log:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [catID, date]);

  const renderFoodData = (foodData) => {
    if (!foodData) return "Data not available";

    try {
      const parsedData = JSON.parse(foodData);
      return (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Full Product Name</TableCell>
                <TableCell>Serving Size</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parsedData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.fullProductName}</TableCell>
                  <TableCell>{item.servingSize}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    } catch (error) {
      console.error("Error parsing food data:", error);
      return "Data not available";
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>View Daily Log</DialogTitle>
      <DialogContent>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : dailyLogData ? (
          <Card elevation={3}>
            <CardContent>
              <List>
                <ListItem>
                  <Typography variant="h6">
                    Activity Level: {dailyLogData.ActivityLevel}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="h6">
                    Hours of Sleep: {dailyLogData.SleepingHours}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="h6">
                    Litter Habits: {dailyLogData.LitterHabits}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="h6">
                    Unusual Behaviours: {dailyLogData.UnusualBehaviours}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="h6">Consumed Food:</Typography>
                  {renderFoodData(dailyLogData.foodData)}
                </ListItem>
              </List>
            </CardContent>
          </Card>
        ) : (
          <Typography>No log stored for this day.</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ViewDailyLog;