import {
  Avatar,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useUser } from "../context/UserContext";
import { blue } from "@mui/material/colors";

export default function ProfileCard() {
  const { user } = useUser();
  return (
    <Card sx={{ maxWidth: 400, mx: "auto", p: 2, textAlign: "center" }}>
      <Avatar
        alt={user?.name}
        src="/profile.jpg"
        sx={{ width: 100, height: 100, mx: "auto", mb: 2, bgcolor: blue[500] }}
      />
      <CardContent>
        <Typography variant="h5">{user?.name}</Typography>
        <Typography color="text.secondary"> {user?.email} </Typography>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          <IconButton color="primary">
            <FacebookIcon />
          </IconButton>
          <IconButton color="primary">
            <TwitterIcon />
          </IconButton>
          <IconButton color="primary">
            <InstagramIcon />
          </IconButton>
          <IconButton color="primary">
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
