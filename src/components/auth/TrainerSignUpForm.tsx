import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormikProps } from "formik";
import { TrainerSignUpFormik } from "../../pages/auth/AuthPage";
const authImage = import.meta.env.VITE_AUTHENTICATION_PAGE_IMAGE;

interface TrainerSignUpFormProps {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  formik: FormikProps<TrainerSignUpFormik>;
  handleAuthClick: (state: string) => void;
}

const styles = {
  main: {
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

const TrainerSignUpForm: React.FC<TrainerSignUpFormProps> = ({
  showPassword,
  setShowPassword,
  formik,
  handleAuthClick,
}) => {
  return (
    <Box sx={styles.main}>
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
            <Typography variant="h5" gutterBottom sx={{ marginBottom: "20px" }}>
              Join as a Trainer
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Box sx={styles.formFields}>
                <Box sx={styles.nameFieldsContainer}>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={formik.values.fname}
                    onChange={formik.handleChange}
                    name="fname"
                    error={formik.touched.fname && Boolean(formik.errors.fname)}
                    helperText={formik.touched.fname && formik.errors.fname}
                  />
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={formik.values.lname}
                    onChange={formik.handleChange}
                    name="lname"
                    error={formik.touched.lname && Boolean(formik.errors.lname)}
                    helperText={formik.touched.lname && formik.errors.lname}
                  />
                </Box>
                <Box sx={styles.nameFieldsContainer}>
                  <TextField
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    name="phone"
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                  />
                  <TextField
                    label="Years of Experience"
                    variant="outlined"
                    fullWidth
                    size="small"
                    type="number"
                    value={formik.values.yearsOfExperience}
                    onChange={formik.handleChange}
                    name="yearsOfExperience"
                    error={
                      formik.touched.yearsOfExperience &&
                      Boolean(formik.errors.yearsOfExperience)
                    }
                    helperText={
                      formik.touched.yearsOfExperience &&
                      formik.errors.yearsOfExperience
                    }
                  />
                </Box>
                <Box sx={styles.nameFieldsContainer}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    size="small"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    name="email"
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                  <TextField
                    label="Date of Birth"
                    variant="outlined"
                    fullWidth
                    size="small"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={formik.values.dateOfBirth}
                    onChange={formik.handleChange}
                    name="dateOfBirth"
                    error={
                      formik.touched.dateOfBirth &&
                      Boolean(formik.errors.dateOfBirth)
                    }
                    helperText={
                      formik.touched.dateOfBirth && formik.errors.dateOfBirth
                    }
                  />
                </Box>
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
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={formik.isSubmitting}
                  sx={styles.submitButton}
                >
                  {formik.isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </Box>
            </form>
            <Box sx={styles.toggleSignBox}>
              <Typography sx={styles.toggleSignText}>
                Already have an account?
                <Box
                  component="span"
                  onClick={() => handleAuthClick("sign in")}
                  sx={styles.toggleSignLink}
                >
                  Sign In
                </Box>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TrainerSignUpForm;
