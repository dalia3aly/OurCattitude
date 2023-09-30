import React, { useState, useEffect } from "react";
import '../../report.css';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
} from "@mui/material";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from 'recharts';
import CatSleepChart from './CatSleepChart';
import CatFeedingChart from './CatFeedingChart';
import CatActivityLevelChart from './CatActivityLevelChart';
import CatLitterHabitsChart from './CatLitterHabitsChart';
import CatUnusualBehavioursChart from './CatUnusualBehavioursChart';


const CatReportGenerator = ({ catID }) => {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [logs, setLogs] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchLogs = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const config = { headers: { Authorization: `Bearer ${userToken}` } };
      const response = await axios.get(
        `http://localhost:3000/api/dailyLogs/${catID}/logs/${startDate}/${endDate}`,
        config
      );

      const sortedLogs = response.data.sort((a, b) => {
        return new Date(a.Date) - new Date(b.Date);
      });

      setLogs(sortedLogs);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchLogs();
    }
  }, [catID, startDate, endDate]);

  const printTable = () => {
    window.print();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        Generate Report
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>Select Dates to Generate a Report</DialogTitle>
        <DialogContent>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Activity Level</TableCell>
                <TableCell>Hours of Sleep</TableCell>
                <TableCell>Litter Habits</TableCell>
                <TableCell>Unusual Behaviours</TableCell>
                <TableCell>Food Consumed</TableCell>
                <TableCell>Servig Size</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>{log.Date}</TableCell>
                  <TableCell>{log.ActivityLevel}</TableCell>
                  <TableCell>{log.SleepingHours}</TableCell>
                  <TableCell>{log.LitterHabits}</TableCell>
                  <TableCell>{log.UnusualBehaviours}</TableCell>
                  <TableCell>
                    {log.foodData &&
                      JSON.parse(log.foodData).map((food, foodIndex) => (
                        <div key={foodIndex}>{`* ${food.fullProductName}`}</div>
                      ))}
                  </TableCell>
                  <TableCell>
                    {log.foodData &&
                      JSON.parse(log.foodData).map((food, foodIndex) => (
                        <div key={foodIndex}>{`* ${food.servingSize}`}</div>
                      ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="chart-container">
          <CatSleepChart logs={logs} />
          </div>

          <div className="chart-container">
          <CatActivityLevelChart logs={logs} />
          </div>
          <div className="chart-container">
          <CatLitterHabitsChart logs={logs} />
          </div>
          <div className="chart-container">
          <CatUnusualBehavioursChart logs={logs} />
          </div>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={printTable} color="primary">
            Print Report
          </Button>
          {/* <Button onClick={handleClose} color="primary">
            Close
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CatReportGenerator;
