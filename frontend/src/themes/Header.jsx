import React from 'react';
import { makeStyles } from '@mui/styles';
import headerImage from '../assets/Headerbg.png'; // Adjust the path to your actual image

const useStyles = makeStyles((theme) => ({
  header: {
    background: `url(${headerImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '200px',
    width: '100%',
    position: 'relative' // This will allow us to position NavBar absolutely relative to this header
  }
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      {/* May include the NavBar component here if I'm going for combining them*/}
    </div>
  );
};

export default Header;
