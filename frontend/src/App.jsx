import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import ButtonRip from "./themes/ButtonRip.jsx";
import { Box, Button, Container, Grid } from '@mui/material';
import { Link } from "react-router-dom";
import { Add } from "@mui/icons-material";
import CatFactBox from "./components/CatFactBox";
import { ThemeProvider } from "@mui/material/styles";
import GuestAppBar from "./components/GuestAppBar";
import CatProfilePage from "./components/CatProfile";
import AddingCat from "./components/AddingCat";

function App() {

  return (
    < >
      <GuestAppBar />
      

      <div>
        <Link to="/signup">
          <ButtonRip label="Sign Up" />
        </Link>

        <Link to="/login">
          <ButtonRip label="Log In" />
        </Link>
        <AddingCat />
        {/* <AddCat /> */}
        <Grid item md={8}>
   <CatFactBox />
  </Grid>
    
<CatProfilePage />

      </div>

    </>
  );
}

{
  /* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */
}

export default App;
