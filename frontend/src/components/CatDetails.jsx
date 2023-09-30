import React from 'react';
import { useState, useEffect } from 'react';
import { Paper, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';  // Correct import
import axios from 'axios';


const useStyles = makeStyles({
  root: {
    padding: '20px',
    margin: '20px',
    maxWidth: '80%',
  },
  media: {
    width: 220,
    height: 220,
    margin: 'auto',
  },
  content: {
    flex: '1 0 auto',
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
      <Paper elevation={3} className={classes.root}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <CardMedia
              className={classes.media}
              image={cat?.avatar ? `/Avatars/${cat.avatar}.png` : '/happycat.png'}
              title={cat?.name || 'Cat'}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <CardContent>
              <Typography variant="h4" component="h2">
                {cat?.name || 'Unnamed Cat'}
              </Typography>
              < br />
              <Typography variant="body1" color="textSecondary">Breed: {cat?.breed || 'Unknown'}</Typography>
              <Typography variant="body1" color="textSecondary">Colour: {cat?.colour || 'Unknown'}</Typography>
              <Typography variant="body1" color="textSecondary">Age: {age ? `${age.years} years, ${age.months} months` : 'Unknown'}</Typography>
              <Typography variant="body1" color="textSecondary">Gender: {cat?.gender || 'Unknown'}</Typography>
              <Typography variant="body1" color="textSecondary">Chronic Issues: {cat?.chronic_issues ? cat.chronic_issues : 'None'}</Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Paper>
    );
  };

export default CatDetails;
