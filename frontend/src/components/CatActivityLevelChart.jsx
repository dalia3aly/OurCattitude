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

const CatActivityLevelChart = ({ logs }) => {
  // Format the logs data to fit the chart's requirements
  const formattedData = logs.map((log) => ({
    Date: log.Date,
    ActivityLevel: log.ActivityLevel,
  }));

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h6" gutterBottom>
        Activity Level Chart
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
          <YAxis domain={[1, 10]}>
            <Label angle={270} value="Level" position="insideLeft" offset={-1} />
          </YAxis>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="ActivityLevel" name="Activity Level" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default CatActivityLevelChart;
