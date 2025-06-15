import React from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router";
import { fetchLogin } from "../services/api";
import { useUser } from "../context/UserContext";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("invalid email").required("email is required"),
  password: Yup.string()
    .required("password is required")
    .min(6, "password should be at last 6 character"),
});

function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  // handler
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await fetchLogin(values);
      const userData = response.data.user;
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      navigate("/");
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || "error logging in",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                name="email"
                label="email"
                fullWidth
                margin="normal"
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
              <Field
                as={TextField}
                name="password"
                label="password"
                type="password"
                fullWidth
                margin="normal"
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
              {errors.submit && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {errors.submit}
                </Alert>
              )}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                disabled={isSubmitting}
              >
                Login
              </Button>
              <Typography sx={{ mt: 2 }}>
                don't have account ? <Link to="/signup"> Create Account </Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}

export default Login;
