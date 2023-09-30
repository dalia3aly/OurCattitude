import React from 'react';
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
import { Paper, Typography } from '@mui/material';

const CatSleepChart = ({ logs }) => {
  // Format the logs data to fit the chart's requirements
  const formattedData = logs.map((log) => ({
    Date: log.Date,
    SleepingHours: log.SleepingHours,
  }));

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}className="paper-print">
      <Typography variant="h6" gutterBottom>
        Sleeping Chart
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={formattedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 15,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" name=" ">
            <Label offset={0} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label angle={270} value="Hours" position="insideLeft" offset={-1} />
          </YAxis>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="SleepingHours" name= "Hours of Sleep" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default CatSleepChart;
