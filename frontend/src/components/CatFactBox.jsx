import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const CatFactBox = () => {
  const [fact, setFact] = useState('');

  useEffect(() => {
    // Fetch cat fact when the component mounts
    const fetchFact = async () => {
      const response = await fetch('https://catfact.ninja/fact?max_length=300');
      const data = await response.json();
      setFact(data.fact);
    };
    
    fetchFact();
  }, []);  // The empty dependency array means this useEffect runs once when the component mounts

  return (
    <Box p={3} boxShadow={3} bgcolor="background.paper" borderRadius="borderRadius">
      <Typography variant="h6">
        💡🐈 Did you know?
      </Typography>
      <Typography variant="body1">
        {fact}
      </Typography>
    </Box>
  );
};

export default CatFactBox;
