import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import { useDailyLog } from '../context/DailyLogContext';  // Import the hook

const DailyLogDisplay = () => {
    const { filteredLogs, selectedDate } = useDailyLog(); // Use the hook

  // Search for the log corresponding to the selected date
  const log = logs?.find((log) => dayjs(log.Date).isSame(dayjs(selectedDate), 'day'));

  

  return (
    <Card>
      <CardContent>
      {filteredLogs.length ? (
          <>
            <Typography variant="h6">
            // Display logs
            </Typography>
            {/* Render log data here */}
          </>
        ) : (
          <Typography variant="h6">No log for this day</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyLogDisplay;
