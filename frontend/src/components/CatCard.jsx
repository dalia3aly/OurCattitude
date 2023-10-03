import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
  },
  media: {
    height: 160,
  },
});

const CatCard = ({ cat }) => {
  const classes = useStyles();

  // Parse age from JSON to object (cat.age is now a JSON string column)
  const age = cat?.age ? JSON.parse(cat.age) : null;

  // for CatDetailsPage
  const navigate = useNavigate();  // <-- Add this line

  const handleCardClick = () => {
    navigate(`/cat/${cat.catID}`);  // <-- Update this line
  };

  return (
    <div onClick={handleCardClick}>
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={cat?.avatar ? `/Avatars/${cat.avatar}.png` : '/catitRainbow.png'}
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
          {/* <Grid item xs={6}>
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
          </Grid> */}
        </Grid>
      </CardContent>
    </Card>
    </div>
  );
};

export default CatCard;
