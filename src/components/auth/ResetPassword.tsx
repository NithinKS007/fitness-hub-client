import React from "react";
import { Link } from "react-router-dom";
import { TextField, Box, Button, Typography } from "@mui/material";
import { FormikProps } from "formik";
import { ResetPasswordFormik } from "../../pages/auth/ResetPasswordPage";

const authImage = import.meta.env.VITE_AUTHENTICATION_PAGE_IMAGE;

interface ResetPasswordProps {
  formik: FormikProps<ResetPasswordFormik>;
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "grey.100",
    width: "100%",
    overflow: "hidden",
  },
  box: {
    width: "100%",
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 3,
  },
  imageBox: {
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
  formBox: {
    width: { xs: "100%", md: "50%" },
    p: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "100%",
    maxWidth: "550px",
    textAlign: "center",
  },
  inputBox: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  textField: {
    "& .MuiOutlinedInput-root": { borderRadius: 2 },
  },
  button: {
    mt: 2,
    bgcolor: "black",
    "&:hover": {
      bgcolor: "grey.800",
    },
    height: "48px",
    borderRadius: 2,
  },
  linkBox: {
    mt: 2,
    textAlign: "center",
  },
};

const ResetPassword: React.FC<ResetPasswordProps> = ({ formik }) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.box}>
        <Box sx={styles.imageBox}>
          <Box
            component="img"
            src={authImage}
            alt="Fitness Couple"
            sx={styles.image}
          />
        </Box>
        <Box sx={styles.formBox}>
          <Box sx={styles.formContainer}>
            <form onSubmit={formik.handleSubmit}>
              <Box sx={styles.inputBox}>
                <TextField
                  fullWidth
                  name="password"
                  size="small"
                  label="New Password"
                  type="password"
                  variant="outlined"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  sx={styles.textField}
                />

                <TextField
                  fullWidth
                  name="cPassword"
                  size="small"
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  value={formik.values.cPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.cPassword && Boolean(formik.errors.cPassword)
                  }
                  helperText={formik.touched.cPassword && formik.errors.cPassword}
                  sx={styles.textField}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={styles.button}
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Resetting..." : "Reset Password"}
                </Button>
              </Box>
            </form>

            <Box sx={styles.linkBox}>
              <Typography variant="body2" color="text.secondary">
                <Link
                  to="/sign-in"
                  style={{ color: "blue", textDecoration: "none" }}
                >
                  Back to Sign In
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;
