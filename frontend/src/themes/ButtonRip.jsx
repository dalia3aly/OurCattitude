// src/components/Button.js
import React from 'react';
import MuiButton from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  customButton: {
    backgroundColor: 'black',
    color: 'white',
    // Add other styles here
  },
}));

const ButtonRip = ({ label, onClick, disabled }) => {
  const classes = useStyles();
  
  return (
    <MuiButton className={classes.customButton} onClick={onClick} disabled={disabled}>
      {label}
    </MuiButton>
  );
};

export default ButtonRip;
