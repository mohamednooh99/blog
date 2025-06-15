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
import { fetchSignup } from "../services/api";
import { toast } from "react-toastify";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("name is required ").min(2, "name is small"),
  email: Yup.string().email("email is invalid").required("email is required"),
  password: Yup.string()
    .required("password is invalid")
    .min(6, "assword should be at last 6 character"),
});

function Signup() {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await fetchSignup(values);
      navigate("/login");
      toast.success("account created successfully!");
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || "error created account",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          textAlign: "center",
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Create Account
        </Typography>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                name="name"
                label="Name"
                fullWidth
                margin="normal"
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
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
                Register
              </Button>
              <Typography sx={{ mt: 2 }}>
                have an account ? <Link to="/login">Login</Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}

export default Signup;
