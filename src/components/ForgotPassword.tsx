import React from "react";
import { Link } from "react-router-dom";
import { TextField, Box, Button, Typography } from "@mui/material";
import fitnessCouple2 from "../assets/fitnessCouple2.jpg";

interface ForgotPasswordProps {
  formik: any;
}

const styles = {
  root: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "grey.100",
    width: "100%",
    overflow: "hidden",
  },
  container: {
    width: "100%",
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 3,
  },
  imageContainer: {
    width: { xs: "100%", md: "50%" },
    display: { xs: "none", md: "flex" },
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    bgcolor: "black",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  formContainer: {
    width: { xs: "100%", md: "50%" },
    p: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formBox: {
    width: "100%",
    maxWidth: "550px",
    textAlign: "center",
  },
  formFields: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  textField: {
    "& .MuiOutlinedInput-root": { borderRadius: 2 },
  },
  submitButton: {
    mt: 2,
    bgcolor: "black",
    "&:hover": { bgcolor: "grey.800" },
    height: "48px",
    borderRadius: 2,
  },
  backLinkContainer: {
    mt: 2,
    textAlign: "center",
  },
  backLinkText: {
    variant: "body2",
    color: "text.secondary",
  },
  backLink: {
    color: "blue",
    textDecoration: "none",
  },
};

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ formik }) => {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.container}>
        <Box sx={styles.imageContainer}>
          <Box
            component="img"
            src={fitnessCouple2}
            alt="Fitness Couple"
            sx={styles.image}
          />
        </Box>
        <Box sx={styles.formContainer}>
          <Box sx={styles.formBox}>
            <Typography variant="h6" gutterBottom>
              Forgot Password?
            </Typography>

            <form onSubmit={formik.handleSubmit}>
              <Box sx={styles.formFields}>
                <TextField
                  fullWidth
                  name="email"
                  label="Enter your email address"
                  type="email"
                  variant="outlined"
                  size="small"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  sx={styles.textField}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={styles.submitButton}
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Sending Link..." : "Send Link"}
                </Button>
              </Box>
            </form>

            <Box sx={styles.backLinkContainer}>
              <Typography sx={styles.backLinkText}>
                <Link to="/" style={styles.backLink}>
                  Back to website
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
