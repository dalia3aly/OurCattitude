import React from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';  // Correct import
import axios from 'axios';


const useStyles = makeStyles({
    root: {
      maxWidth: 220,
    },
    media: {
      height: 220,
    },
  });

const CatDetails = ({ catID }) => {
    const classes = useStyles();
    const [cat, setCat] = useState(null);  // State variable to store fetched cat details
  
    useEffect(() => {
      const fetchCatDetails = async () => {
        try {
          const userToken = localStorage.getItem("userToken");
          const config = {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          };
          const response = await axios.get(`http://localhost:3000/cat/user/cat/${catID}`, config);
          if (response.data) {
            setCat(response.data);
          }
        } catch (error) {
          console.error("Error fetching cat details:", error);
        }
      };
      fetchCatDetails();
    }, [catID]);
  
    // Parse age from JSON to object (cat.age is now a JSON string column)
    const age = cat?.age ? JSON.parse(cat.age) : null;
  

  return (
    < >
     <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={cat?.avatar ? `/Avatars/${cat.avatar}.png` : '/happycat.png'}
        title={cat?.name || 'Cat'}
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" component="h2">
              {cat?.name || 'Unnamed Cat'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Breed: {cat?.breed || 'Unknown'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Colour: {cat?.colour || 'Unknown'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Age: {age ? `${age.years} years, ${age.months} months` : 'Unknown'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Gender: {cat?.gender || 'Unknown'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              Chronic Issues: {cat?.chronic_issues ? cat.chronic_issues : 'None'}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
     </Card>
    </>
  );
};

export default CatDetails;
