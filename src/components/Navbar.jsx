import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link as RouterLink, useNavigate } from "react-router";
import {
  Button,
  Container,
  Link,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  MenuItem,
  Menu,
} from "@mui/material";
import { useState } from "react";
import { useUser } from "../context/UserContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar({ search, setSearch }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const { user, setUser } = useUser();
  const isAuthenticated = !!localStorage.getItem("token");

  const isMenuOpen = anchorEl;
  const isMobileMenuOpen = mobileMoreAnchorEl;

  // handlers
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    handleMenuClose();
    navigate("/login");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Typography sx={{ p: 2, fontWeight: 600 }}>{user?.name}</Typography>
      <MenuItem component={RouterLink} to="/profile" onClick={handleMenuClose}>
        Profile
      </MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>user</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Container>
          <Toolbar>
            <Box
              sx={{
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                padding: 1,
                marginRight: { xs: 2 },
              }}
            >
              <Box
                component="img"
                src="/blog/logo.png"
                alt="Logo"
                sx={{ height: { sc: 25, sm: 30 }, width: { xs: 25, sm: 30 } }}
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <Link
                component={RouterLink}
                to="/"
                color="inherit"
                underline="hover"
                sx={{
                  mx: 1,
                  fontWeight: 500,
                  fontSize: 16,
                  "&:hover": { color: "darkblue" },
                  transition: "color 0.2s",
                }}
              >
                Home
              </Link>
              <Link
                component={RouterLink}
                to="/"
                color="inherit"
                underline="hover"
                sx={{
                  mx: 1,
                  fontWeight: 500,
                  fontSize: 16,
                  "&:hover": { color: "darkblue" },
                  transition: "color 0.2s",
                }}
              >
                About
              </Link>
              <Link
                component={RouterLink}
                to="/"
                color="inherit"
                underline="hover"
                sx={{
                  mx: 1,
                  fontWeight: 500,
                  fontSize: 16,
                  "&:hover": { color: "darkblue" },
                  transition: "color 0.2s",
                }}
              >
                Contact
              </Link>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {isAuthenticated ? (
              <>
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                  }}
                >
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ "aria-label": "search" }}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      sx={{ width: { xs: 100, sm: 250, md: 300 } }}
                    />
                  </Search>
                  <Box>
                    <Typography sx={{ fontWeight: 500 }}>
                      {user?.name}
                    </Typography>
                    {/* <Typography sx={{ fontSize: 13 }}>{email}</Typography> */}
                  </Box>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </Box>
                <Box sx={{ display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </Box>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={{ color: "#fff", mr: 2 }}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/signup"
                  sx={{ color: "#fff" }}
                >
                  Signup
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
