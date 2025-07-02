import React, { useState } from "react";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // أضف هنا منطق الإرسال (API أو EmailJS أو حتى console.log)
    console.log("Submitted:", form);
    setSubmitted(true);
  };

  return (
    <Box
      component="section"
      sx={{
        py: 8,
        bgcolor: "background.default",
        height: "70vh",
      }}
    >
      <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
        Contact Me
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 600,
          mx: "auto",
          display: "grid",
          gap: 2,
          px: 2,
          mt: 5,
        }}
      >
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          required
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          label="Emailالبريد الإلكتروني"
          name="email"
          type="email"
          variant="outlined"
          required
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          label="message"
          name="message"
          multiline
          rows={4}
          variant="outlined"
          required
          value={form.message}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" size="large" sx={{ mt: 1 }}>
          send
        </Button>
        {submitted && <Alert severity="success"> send successfully </Alert>}
      </Box>
    </Box>
  );
};

export default ContactSection;
