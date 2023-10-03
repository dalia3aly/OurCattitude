import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import DailyLogForm from "../components/DailyLogForm";
import CatDetails from "../components/CatDetails";
import MainAppBar from "../components/MainAppBar";
import ViewDailyLog from "../components/ViewDailyLog";
import CatSleepChart from "../components/CatSleepChart";
import CatFeedingChart from "../components/CatFeedingChart";
import CatActivityLevelChart from "../components/CatActivityLevelChart";
import CatLitterHabitsChart from "../components/CatLitterHabitsChart";
import CatUnusualBehavioursChart from "../components/CatUnusualBehavioursChart";
import CatReportGenerator from "../components/CatReportGenerator";

const CatProfilePage = () => {
  const { catID } = useParams(); // catID is now extracted from the URL for CatDetails
  const [open, setOpen] = useState(false);
  const [viewLogOpen, setViewLogOpen] = useState(false);
  const [searchDate, setSearchDate] = useState("");
  const [logs, setLogs] = useState([]); // Initialize logs as an empty array

  // Report Generator state variables:

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const userToken = localStorage.getItem("userToken");
        const config = {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        };
        const response = await axios.get(
          `http://localhost:3000/api/dailylogs/${catID}/logs`,
          config
        );
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

  // Define the handleOpenReportDialog function
  const handleOpenReportDialog = () => {
    // Open the report generation dialog
    setOpen(true);
  };

  return (
    <>
      <MainAppBar />
      <Grid item xs={12}
        className="content-padding"
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}>
        {/* First Row */}

        <Grid item xs={12} lg={6}>
          {/* Nested Grid for CatDetails and related components */}
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <CatDetails catID={catID} />
            </Grid>

            <Grid item>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                style={{ textAlign: "center" }}>
                Select a Date to see what happened that day!
              </Typography>
            </Grid>

            <Grid item>
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
            </Grid>

            <Grid item>
              <List>
                {filteredLogs.map((log, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={log.message} secondary={log.date} />
                  </ListItem>
                ))}
              </List>
              <Button
                onClick={handleViewLogOpen}
                type="button"
                fullWidth
                variant="contained"
                color="secondary"
                margin="normal">
                View Log
              </Button>
            </Grid>

            <Grid item>
              <Button
                onClick={handleOpen}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                margin="normal">
                Add Log
              </Button>
            </Grid>

            <Grid item>
              <DailyLogForm
                open={open}
                handleClose={handleClose}
                catID={catID}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <ViewDailyLog
                open={viewLogOpen}
                handleClose={handleViewLogClose}
                catID={catID}
                date={searchDate}
              />
            </Grid>

            <Grid item xs={12} lg={6} className="button">

              <CatReportGenerator 
                catID={catID}
                startDate={startDate}
                endDate={endDate}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} lg={6}>
          <CatSleepChart logs={logs} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <CatFeedingChart catID={catID} />
        </Grid>

        <Grid item xs={12} lg={6}>
          <CatActivityLevelChart logs={logs} />
        </Grid>

        <Grid item xs={12} lg={6}>
          <CatLitterHabitsChart logs={logs} />
        </Grid>

        <Grid item xs={12} lg={6}>
          <CatUnusualBehavioursChart logs={logs} />
        </Grid>
      </Grid>
    </>
  );
};

export default CatProfilePage;
