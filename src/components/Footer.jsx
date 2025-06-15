import {
  Box,
  Typography,
  Link,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { blue } from "@mui/material/colors";

function Footer() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      setMsg("Please enter your email.");
      return;
    }
    setMsg("Thank you for subscribing!");
    setEmail("");
  };
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 3,
        mt: 5,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "space-evenly",
          flexDirection: { xs: "column", sm: "row" },
          flexWrap: "wrap",
          rowGap: 2,
          maxWidth: 900,
          mx: "auto",
          px: 2,
        }}
      >
        {/* List */}
        <Box sx={{}}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Quick List
          </Typography>
          <List dense sx={{ color: "white" }}>
            <ListItem disablePadding>
              <ListItemText primary="Privacy Policy" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Terms of Service" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Support" />
            </ListItem>
          </List>
        </Box>

        {/* Social */}
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Follow Us
          </Typography>
          <Box>
            <IconButton
              href="https://facebook.com"
              target="_blank"
              rel="noopener"
              color="inherit"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              href="https://twitter.com"
              target="_blank"
              rel="noopener"
              color="inherit"
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              href="https://instagram.com"
              target="_blank"
              rel="noopener"
              color="inherit"
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              href="https://github.com"
              target="_blank"
              rel="noopener"
              color="inherit"
            >
              <GitHubIcon />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ minWidth: 220 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Subscribe
          </Typography>
          <form onSubmit={handleSubscribe}>
            <TextField
              size="small"
              variant="outlined"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                bgcolor: "white",
                borderRadius: 1,
                mb: 1,
                width: "100%",
                input: { color: "black" },
              }}
              InputProps={{
                sx: { fontSize: 14 },
              }}
            />
            <Button
              type="submit"
              variant="outlined"
              sx={{
                width: "100%",
                color: "white",
                border: 1,
                bgcolor: blue[500],
                borderColor: blue[500],
              }}
            >
              Subscribe
            </Button>
          </form>
          {msg && (
            <Typography
              variant="caption"
              sx={{ color: "yellow", mt: 1, display: "block" }}
            >
              {msg}
            </Typography>
          )}
        </Box>
      </Box>
      <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
        &copy; {new Date().getFullYear()} Blog App Made with Love by M_Nooh.
      </Typography>
    </Box>
  );
}

export default Footer;
