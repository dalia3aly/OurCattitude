import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
  },
  media: {
    height: 140,
  },
});

const CatCard = ({ cat }) => {
    const classes = useStyles();
  
    return (
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={cat?.image || './assets/happycat.png'}
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
                DoB: {cat?.dob || 'Unknown'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Gender: {cat?.gender || 'Unknown'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                Chronic Issues: {cat?.chronicIssues ? cat.chronicIssues : 'None'}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

export default CatCard;