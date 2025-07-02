import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  MenuItem,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { createPost } from "../services/api";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
import { usePosts } from "../context/PostsContext";

const PostSchema = Yup.object().shape({
  title: Yup.string().required("title required").min(2, "  title is low"),
  description: Yup.string().required("description required"),
  category: Yup.string().required("category required "),
});

function CreatePost({ onSuccess }) {
  const { user } = useUser();
  const { fetchPosts } = usePosts();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("category", values.category);
    if (values.image) {
      formData.append("image", values.image);
    }

    try {
      await createPost(formData);
      await fetchPosts();
      toast.success("Post Created successfully!");
      if (onSuccess) onSuccess();
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || "error creating post",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Create Post
        </Typography>
        <Formik
          initialValues={{
            title: "",
            description: "",
            category: "",
            image: null,
          }}
          validationSchema={PostSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting, setFieldValue }) => (
            <Form>
              <Field
                as={TextField}
                name="title"
                label="title"
                fullWidth
                margin="normal"
                error={touched.title && !!errors.title}
                helperText={touched.title && errors.title}
              />
              <Field
                as={TextField}
                name="description"
                label="description"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                error={touched.description && !!errors.description}
                helperText={touched.description && errors.description}
              />
              <Field
                as={TextField}
                select
                name="category"
                label="category"
                fullWidth
                margin="normal"
                error={touched.category && !!errors.category}
                helperText={touched.category && errors.category}
              >
                <MenuItem value=""> select category</MenuItem>
                <MenuItem value="News">News</MenuItem>
                <MenuItem value="Sports">Sports</MenuItem>
                <MenuItem value="Tech">Tech</MenuItem>
                <MenuItem value="Art">Art</MenuItem>
                <MenuItem value="Education">Education</MenuItem>
                <MenuItem value="Health">Health</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
                <MenuItem value="Travel">Travel</MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Fashion">Fashion</MenuItem>
                <MenuItem value="Science">Science</MenuItem>
                <MenuItem value="Movies">Movies</MenuItem>
                <MenuItem value="Music">Music</MenuItem>
                <MenuItem value="Gaming">Gaming</MenuItem>
              </Field>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(event) => {
                  setFieldValue("image", event.currentTarget.files[0]);
                }}
                style={{ margin: "10px 0" }}
              />
              {errors.submit && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {errors.submit}
                </Alert>
              )}
              <Button
                loading={isSubmitting}
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                disabled={isSubmitting}
                loadingPosition="end"
              >
                {isSubmitting ? "Publish..." : "Publish"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}

export default CreatePost;
