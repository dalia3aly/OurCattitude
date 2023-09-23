import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import footerBackground from '../assets/footerbg.png'; // Adjust the path to the actual image path

const useStyles = makeStyles((theme) => ({
  footer: {
    background: `url(${footerBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: 200,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem'
    },
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Box className={classes.footer}>
      <Container>
        <Typography variant="body2" className={classes.text}>
          © 2023 OurCattitude. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
