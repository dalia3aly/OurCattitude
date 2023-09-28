import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, TextField, List, ListItem, ListItemText, Typography } from "@mui/material";
import DailyLogForm from "../components/DailyLogForm";
import CatDetails from "../components/CatDetails";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import ViewDailyLog from "../components/ViewDailyLog";

const CatProfilePage = () => {
  const { catID } = useParams(); // catID is now extracted from the URL for CatDetails
  const [open, setOpen] = useState(false);
  const [viewLogOpen, setViewLogOpen] = useState(false);
  const [searchDate, setSearchDate] = useState("");
  const [logs, setLogs] = useState([]); // Initialize logs as an empty array

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const userToken = localStorage.getItem("userToken");
        const config = {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        };
        const response = await axios.get(`http://localhost:3000/api/dailylogs/${catID}/logs`, config);
        if (response.data) {
          setLogs(response.data);
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };
    fetchLogs();
  }, [catID]);

  const filteredLogs = logs.filter((log) => log.date === searchDate);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleViewLogOpen = () => {  
    setViewLogOpen(true);
  };

  const handleViewLogClose = () => {  
    setViewLogOpen(false);
  };

  return (
    <>
      <ResponsiveAppBar />
      <CatDetails catID={catID} />
      <ViewDailyLog open={viewLogOpen} handleClose={handleViewLogClose} catID={catID} date={searchDate} /> 

      <Typography variant="h6" component="h2" gutterBottom>
        Select a Date to see what happened that day!
      </Typography>

      <TextField
        id="date"
        label="Search by date"
        type="date"
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
      />
      <List>
        {filteredLogs.map((log, index) => (
          <ListItem key={index}>
            <ListItemText primary={log.message} secondary={log.date} />
          </ListItem>
        ))}
      </List>
      <Button
        onClick={handleViewLogOpen}  // New Button
        type="button"
        fullWidth
        variant="contained"
        color="secondary"
        margin="normal">
        View Log
      </Button>
      <br />
      <Button
        onClick={handleOpen}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        margin="normal">
        Add Log
      </Button>
      <DailyLogForm open={open} handleClose={handleClose} catID={catID} />
    </>
  );
};

export default CatProfilePage;
