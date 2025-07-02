import React, { useState } from "react";
import { Box, Button, Container, Grid, Modal, Typography } from "@mui/material";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { useUser } from "../context/UserContext";
import { usePosts } from "../context/PostsContext";
import ProfileCard from "../components/ProfileCard";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";
import SkeletonPost from "../components/SkeletonPost";
import { blue } from "@mui/material/colors";

function Profile() {
  const { user } = useUser();
  const { posts, loading } = usePosts();
  const [open, setOpen] = useState(false);

  if (!user)
    return (
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Container>plz login first!</Container>
      </Box>
    );

  // filter user posts
  const userPosts = posts.filter(
    (post) => post.user === user.id && post.isDeleted !== true
  );

  return (
    <Box
      sx={{
        mt: 5,
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container>
        <Grid container spacing={2} direction={{ xs: "column", md: "row" }}>
          <Grid>
            <ProfileCard />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Box>
              <Box sx={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  sx={{
                    my: 2,
                    color: "white",
                    border: 1,
                    bgcolor: blue[500],
                    borderColor: blue[500],
                  }}
                  onClick={() => setOpen(true)}
                >
                  <EditNoteOutlinedIcon /> Create Post
                </Button>
              </Box>
            </Box>
            <Box>
              {loading ? (
                <>
                  <SkeletonPost />
                  <SkeletonPost />
                </>
              ) : userPosts.length > 0 ? (
                <Post posts={userPosts} />
              ) : (
                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <Typography variant="h6" color="text.primary">
                    you havn't posts yet!
                  </Typography>
                  <Typography variant="h6" color="primary.main" sx={{ mt: 2 }}>
                    publish your first post
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}></Grid>
        </Grid>
      </Container>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            minWidth: 350,
          }}
        >
          <CreatePost onSuccess={() => setOpen(false)} />
        </Box>
      </Modal>
    </Box>
  );
}

export default Profile;
