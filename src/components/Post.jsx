import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Typography,
  TextField,
  Chip,
} from "@mui/material";
import React, { useState } from "react";
import { blue } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
import { usePosts } from "../context/PostsContext";
import { updatePost } from "../services/api";
import { Formik, Form, Field } from "formik";
import { formatDistanceToNow } from "date-fns";

function Post({ posts = [], loading = false }) {
  const { user, users } = useUser();
  const { deleteAndUpdatePosts, fetchPosts } = usePosts();
  const [menuState, setMenuState] = useState({ anchorEl: null, postId: null });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editPost, setEditPost] = useState(null);

  console.log(posts);
  console.log(users);

  // handellers
  const handleMenuOpen = (event, postId) => {
    setMenuState({ anchorEl: event.currentTarget, postId });
  };

  const handleMenuClose = () => {
    // setMenuState({ anchorEl: null, postId: null });
    setMenuState((prev) => ({ ...prev, anchorEl: null }));
  };

  const handleRequestDelete = () => {
    setConfirmOpen(true);
    handleMenuClose();
  };

  const handleEdit = () => {
    const post = posts.find((p) => p._id === menuState.postId);
    console.log(post);
    setEditPost(post);
    setEditOpen(true);
    handleMenuClose();
  };

  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      await updatePost(editPost._id, values);
      toast.success("Post updated successfully!");
      await fetchPosts();
    } catch (error) {
      toast.error("Error updating post", error);
    } finally {
      setEditOpen(false);
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAndUpdatePosts(menuState.postId);
      toast.success("Post deleted successfully!");
      await fetchPosts();
    } catch (error) {
      toast.error("Error deleting post", error);
    } finally {
      setConfirmOpen(false);
      setMenuState({ anchorEl: null, postId: null });
    }
  };
  // const author = users.find((u) => u.id === post.user);

  if (loading) return <div>Loading...</div>;
  return (
    <>
      {posts.map((post) => {
        const author = users.find((u) => u._id === post.user);
        return (
          <Card key={post._id} sx={{ maxWidth: 400, marginBottom: 2, p: 2 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                  {author?.name ? author.name[0].toUpperCase() : "R"}
                </Avatar>
              }
              action={
                <>
                  {user && post.user === user.id && (
                    <>
                      <IconButton
                        aria-label="settings"
                        onClick={(e) => handleMenuOpen(e, post._id)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={menuState.anchorEl}
                        open={Boolean(menuState.anchorEl)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={handleEdit}>
                          <BorderColorOutlinedIcon />
                          <Box sx={{ marginLeft: 2 }}>edit</Box>
                        </MenuItem>
                        <MenuItem onClick={handleRequestDelete}>
                          <DeleteOutlineIcon />
                          <Box sx={{ marginLeft: 2 }}>remove</Box>
                        </MenuItem>
                      </Menu>
                    </>
                  )}
                </>
              }
              title={author.name}
              subheader={
                post.createdAt
                  ? formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })
                  : "No Date"
              }
            />
            {post.Image && (
              <CardMedia
                component="img"
                height="194"
                image={post.Image}
                alt={post.title || "Post image"}
              />
            )}
            <CardContent>
              <Chip
                label={`${post.category}`}
                color="primary"
                variant="outlined"
              />
              <Box component="h5" sx={{ mt: 2 }}>
                {" "}
                {post.title}{" "}
              </Box>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mt: 1 }}
              >
                {post.description || "No Content"}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
      {/* modal confirm delete */}

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)}>
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
            minWidth: 300,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" mb={2}>
            sure to delete post
          </Typography>
          <Button
            variant="contained"
            color="error"
            sx={{ mr: 2 }}
            onClick={handleDelete}
          >
            confirm
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setConfirmOpen(false);
              setMenuState({ anchorEl: null, postId: null });
            }}
          >
            cancel
          </Button>
        </Box>
      </Modal>

      {/* modal edit */}

      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
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
          {editPost && (
            <Formik
              initialValues={{
                title: editPost.title,
                description: editPost.description,
                category: editPost.category,
              }}
              onSubmit={handleUpdate}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field
                    as={TextField}
                    name="title"
                    label="Title"
                    fullWidth
                    margin="normal"
                  />
                  <Field
                    as={TextField}
                    name="description"
                    label="Description"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                  />
                  <Field
                    as={TextField}
                    name="category"
                    label="Category"
                    fullWidth
                    margin="normal"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    Update
                  </Button>
                </Form>
              )}
            </Formik>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default Post;
