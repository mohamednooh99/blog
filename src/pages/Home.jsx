import Post from "../components/Post";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Modal,
  Pagination,
  Stack,
} from "@mui/material";
import { usePosts } from "../context/PostsContext";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import { useUser } from "../context/UserContext";
import SkeletonPost from "../components/SkeletonPost";

function Home({ search }) {
  const { user } = useUser();

  const { posts, loading, categories } = usePosts();

  const [open, setOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const visiblePosts = posts.filter((post) => post.isDeleted !== true);

  // filter
  let filteredPosts = visiblePosts.filter((post) => {
    const matchCategory =
      !selectedCategory || post.category === selectedCategory;
    const matchSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  // pagination
  let numOfPosts = filteredPosts.length;

  const countPostsInPage = 5;

  const numOfPages = Math.ceil(numOfPosts / countPostsInPage);
  // const pages = getArrayOfPages(numOfPages);

  let start = (currentPage - 1) * countPostsInPage;
  let end = start + countPostsInPage;

  filteredPosts = filteredPosts.slice(start, end);

  useEffect(() => {
    if (currentPage > numOfPages) {
      setCurrentPage(numOfPages > 0 ? numOfPages : 1);
    }
  }, [numOfPages, currentPage]);

  return (
    <div>
      <Box
        sx={{
          mt: 5,
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={2} justifyContent="center">
            {/* <Grid
              item
              xs={12}
              sm={3}
              md={3}
              sx={{ order: { xs: 1, sm: 1, md: 1 }, sm: { display: "none" } }}
            ></Grid> */}
            <Grid
              size={{ xs: 12, sm: 8, md: 5 }}
              sx={{ order: { xs: 2, sm: 1 } }}
            >
              {loading ? (
                <>
                  <SkeletonPost />
                  <SkeletonPost />
                  <SkeletonPost />
                </>
              ) : (
                <>
                  <Post posts={filteredPosts} />
                  <Stack>
                    <Pagination
                      count={numOfPages}
                      page={currentPage}
                      onChange={(event, value) => setCurrentPage(value)}
                      variant="outlined"
                      color="primary"
                    />
                  </Stack>
                </>
              )}
            </Grid>
            <Grid
              size={{ xs: 12, sm: 4, md: 3 }}
              sx={{ order: { xs: 1, sm: 2 } }}
            >
              <Box
                sx={{
                  position: "sticky",
                  maxHeight: "70vh",
                  top: 33,
                  zIndex: 10,
                  bgcolor: "background.paper",
                  py: 2,
                  px: 2,
                  sm: { borderRadius: 20 },
                }}
              >
                {["All", ...categories].map((category) => (
                  <Chip
                    key={category}
                    label={`${category}`}
                    color="primary"
                    variant={
                      selectedCategory === category ||
                      (category === "All" && selectedCategory === "")
                        ? "filled"
                        : "outlined"
                    }
                    sx={{ m: 1, cursor: "pointer" }}
                    onClick={() =>
                      setSelectedCategory(category === "All" ? "" : category)
                    }
                  />
                ))}
              </Box>
            </Grid>
          </Grid>

          {user && (
            <>
              <Box>
                <Box sx={{ textAlign: "right" }}>
                  <Button
                    variant="contained"
                    onClick={() => setOpen(true)}
                    sx={{
                      position: "fixed",
                      bottom: 32,
                      right: 32,
                      zIndex: 1200,
                      borderRadius: "50%",
                      minWidth: 56,
                      minHeight: 56,
                      boxShadow: 3,
                      p: 0,
                    }}
                  >
                    <EditNoteOutlinedIcon />
                  </Button>
                </Box>
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
            </>
          )}
        </Container>
      </Box>
    </div>
  );
}

export default Home;
