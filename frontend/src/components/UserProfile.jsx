import React, { useEffect, useState } from 'react';
import CatCard from './CatCard';
import Grid from '@mui/material/Grid';

const UserProfileTest = () => {
  const [cats, setCats] = useState([]); // Assume this will hold the data from your DB

  // Simulate fetching data from your database
  useEffect(() => {
    // fetch('/api/cats') or however you get your data
    // .then(response => response.json())
    // .then(data => setCats(data));
    
    // For this example, we'll use some dummy data
    setCats([
      { name: 'Whiskers', breed: 'Tabby', colour: 'Grey', dob: '2020-05-15', gender: 'Male', chronicIssues: 'None', image: '/path/to/image1.jpg' },
      { name: 'Fluffy', breed: 'Persian', colour: 'White', dob: '2019-03-20', gender: 'Female', chronicIssues: 'Hairballs', image: '/path/to/image2.jpg' },
      // add more cats as needed
    ]);
  }, []);

  return (
    < >
    <Grid container spacing={3}>
      {cats.map((cat, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <CatCard cat={cat} />
        </Grid>
      ))}
    </Grid>
    </>
  );
};

export default UserProfileTest;
