import {
  AppBar,
  Toolbar,
  Button,
  Container,
  useMediaQuery,
  useTheme,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const MainAppBar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { isAuthenticated, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    logout();
    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" style={{ marginTop: "1px" }}>
      <Container maxWidth="lg">
        <Toolbar>
          <Box component={Link} to="/">
            <img src="/Logo2.png" alt="Our Cattitude Logo" width={isSmallScreen ? "150px" : "250px"} />
          </Box>
          <Box flexGrow={1}></Box>
          {!isSmallScreen && (
            <>
              {isAuthenticated ? [
                <>
                  <Button color="inherit" component={Link} to="/userprofile">
                    My Cats
                  </Button>
                  <Button color="inherit" component={Link} to="/user/:userID">
                    Account
                  </Button>
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
               ] : [
                <>
                  <Button color="inherit" component={Link} to="/login">
                    Log In
                  </Button>
                  <Button color="inherit" component={Link} to="/signup">
                    Sign Up
                  </Button>
                </>
              ]}
              <Button color="inherit" component={Link} to="/about">
                About Us
              </Button>
            </>
          )}
          {isSmallScreen && [
            <>
              <Button color="inherit" onClick={handleClick}>
                <MenuIcon />
              </Button>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                {isAuthenticated ? [
                  <>
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to="/account">
                      Account Settings
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to="/userprofile">
                      My Cats
                    </MenuItem>
                  </>
           ] : [
                  <>
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to="/login">
                      Log In
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to="/signup">
                      Sign Up
                    </MenuItem>
                  </>
                ]}
                <MenuItem onClick={handleClose} component={Link} to="/about">
                  About Us
                </MenuItem>
              </Menu>
            </>
          ]}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MainAppBar;
