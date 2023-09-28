import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import DailyLogForm from "../components/DailyLogForm";
import CatDetails from "../components/CatDetails";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import DailyLogDisplay from "../components/DailyLogDisplay";
import DailyLogCalendar from "../components/DailyLogCalendar";
import { useDailyLog } from "../context/DailyLogContext";  
import { DailyLogProvider } from "../context/DailyLogContext";


const CatProfilePage = () => {

  const { catID } = useParams();         // catID is now extracted from the URL for CatDetails
  console.log("Received catID:", catID);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <ResponsiveAppBar />
      <CatDetails catID={catID} />
      <DailyLogProvider>
        <DailyLogDisplay />  
        <DailyLogCalendar /> 
        <Button
          onClick={handleOpen}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          margin="normal">
          Add Log
        </Button>
      </DailyLogProvider>
      <DailyLogForm open={open} handleClose={handleClose} catID={catID} />
      {/* ... other parts of cat profile page */}
    </>
  );
};

export default CatProfilePage;
