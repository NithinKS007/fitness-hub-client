import type React from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleAuth from "./GoogleAuth";

interface SignUpFormProps {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  formik: any;
  handleGoogleAuthSuccess: (res: any) => void;
  handleAuthClick: () => void;
}

const styles = {
  root: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  nameFieldsContainer: {
    display: "flex",
    gap: 2,
  },
  textField: {
    "& .MuiOutlinedInput-root": { borderRadius: 2 },
  },
  rememberMeContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgotPasswordLink: {
    color: "blue",
    textDecoration: "none",
  },
  submitButton: {
    mt: 2,
    bgcolor: "black",
    "&:hover": { bgcolor: "grey.800" },
    height: "48px",
    borderRadius: 2,
  },
  toggleSignBox: {
    mt: 2,
    textAlign: "center",
  },
  toggleSignText: {
    variant: "body2",
    color: "text.secondary",
  },
  toggleSignLink: {
    ml: 1,
    color: "primary.main",
    fontWeight: "medium",
    cursor: "pointer",
  },
};
const authImage = import.meta.env.VITE_AUTHENTICATION_PAGE_IMAGE;

const SignUpForm: React.FC<SignUpFormProps> = ({
  showPassword,
  setShowPassword,
  formik,
  handleGoogleAuthSuccess,
  handleAuthClick,
}) => {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.container}>
        <Box sx={styles.imageContainer}>
          <Box
            component="img"
            src={authImage}
            alt="Fitness Couple"
            sx={styles.image}
          />
        </Box>
        <Box sx={styles.formContainer}>
          <Box sx={styles.formBox}>
            <Typography variant="h5" gutterBottom>
              Create your account
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Box sx={styles.formFields}>
                <Box sx={styles.nameFieldsContainer}>
                  <TextField
                    fullWidth
                    name="fname"
                    label="First Name"
                    variant="outlined"
                    size="small"
                    value={formik.values.fname}
                    onChange={formik.handleChange}
                    error={formik.touched.fname && Boolean(formik.errors.fname)}
                    helperText={formik.touched.fname && formik.errors.fname}
                    sx={styles.textField}
                  />
                  <TextField
                    fullWidth
                    name="lname"
                    label="Last Name"
                    variant="outlined"
                    size="small"
                    value={formik.values.lname}
                    onChange={formik.handleChange}
                    error={formik.touched.lname && Boolean(formik.errors.lname)}
                    helperText={formik.touched.lname && formik.errors.lname}
                    sx={styles.textField}
                  />
                </Box>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  size="small"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  sx={styles.textField}
                />

                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  size="small"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={styles.textField}
                />
                <TextField
                  fullWidth
                  name="cPassword"
                  label="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  size="small"
                  value={formik.values.cPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.cPassword && Boolean(formik.errors.cPassword)
                  }
                  helperText={
                    formik.touched.cPassword && formik.errors.cPassword
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={styles.textField}
                />

                <GoogleAuth handleGoogleAuthSuccess={handleGoogleAuthSuccess} />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={styles.submitButton}
                >
                  {formik.isSubmitting ? "Signing Up..." : "Sign Up"}
                </Button>
              </Box>
            </form>

            <Box sx={styles.toggleSignBox}>
              <Typography sx={styles.toggleSignText}>
                Already have an account?
                <Box
                  component="span"
                  onClick={handleAuthClick}
                  sx={styles.toggleSignLink}
                >
                  Sign In
                </Box>
              </Typography>
            </Box>
            <p>2unni468N@</p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpForm;
