import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";

const CatFeedingChart = ({ catID }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/api/dailylogs/${catID}/logs/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      const jsonData = await response.json();

      // Process data to compute the sum of 'servingSize'
      const processedData = jsonData.map((entry) => {
        let sum = 0;
        const foodItems = JSON.parse(entry.foodData);
        foodItems.forEach((item) => {
          sum += parseInt(item.servingSize, 10);
        });
        return {
          Date: entry.Date,
          TotalServingSize: sum,
        };
      });

      setData(processedData);
    };

    fetchData();
  }, []);

  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h6" gutterBottom>
        Consumed Food Chart
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="TotalServingSize"
            name=" Serving Size in Grams"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default CatFeedingChart;
