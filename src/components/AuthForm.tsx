import type React from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import type { SignState } from "../types/authTypes";
import GoogleAuth from "./GoogleAuth";
import { Link } from "react-router-dom";
import fitnessCouple from "../assets/fitnessCouple.png";

interface AuthFormProps {
  signState: SignState;
  setSignState: React.Dispatch<React.SetStateAction<SignState>>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  formik: any;
  handleGoogleAuthSuccess: (res: any) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  signState,
  setSignState,
  showPassword,
  setShowPassword,
  formik,
  handleGoogleAuthSuccess,
}) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            bgcolor: "grey.300",
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            backgroundColor: "black",
          }}
        >
          <img
            src={fitnessCouple}
            style={{
              maxWidth: "100%",
              maxHeight: "75vh",
              objectFit: "cover",
              display: "block",
            }}
          />
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            p: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: "550px", textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>
              {signState === "sign in"
                ? "Sign in to your account"
                : "Create your account"}
            </Typography>

            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {signState === "sign up" && (
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField
                      fullWidth
                      name="fname"
                      label="First Name"
                      variant="outlined"
                      size="small" 
                      value={formik.values.fname}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.fname && Boolean(formik.errors.fname)
                      }
                      helperText={formik.touched.fname && formik.errors.fname}
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} 
                    />
                    <TextField
                      fullWidth
                      name="lname"
                      label="Last Name"
                      variant="outlined"
                      size="small" 
                      value={formik.values.lname}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.lname && Boolean(formik.errors.lname)
                      }
                      helperText={formik.touched.lname && formik.errors.lname}
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} 
                    />
                  </Box>
                )}

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
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} 
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
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} 
                />

                {signState === "sign up" && (
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
                      formik.touched.cPassword &&
                      Boolean(formik.errors.cPassword)
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
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} 
                  />
                )}

                {signState === "sign in" && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Remember Me"
                    />
                    <Link
                      to="/forgot-password"
                      style={{ color: "blue", textDecoration: "none" }}
                    >
                      Forgot Password?
                    </Link>
                  </Box>
                )}

                <GoogleAuth handleGoogleAuthSuccess={handleGoogleAuthSuccess} />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    bgcolor: "black",
                    "&:hover": {
                      bgcolor: "grey.800",
                    },
                    height: "48px",
                    borderRadius: 2, 
                  }}
                >
                  {formik.isSubmitting
                    ? signState === "sign in"
                      ? "Signing In..."
                      : "Signing Up..."
                    : signState === "sign in"
                      ? "Sign In"
                      : "Sign Up"}
                </Button>
              </Box>
            </form>

            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                {signState === "sign up"
                  ? "Already have an account?"
                  : "Don't have an account?"}
                <Box
                  component="span"
                  onClick={() =>
                    setSignState(
                      signState === "sign up" ? "sign in" : "sign up"
                    )
                  }
                  sx={{
                    ml: 1,
                    color: "primary.main",
                    fontWeight: "medium",
                    cursor: "pointer",
                  }}
                >
                  {signState === "sign up" ? "Sign In" : "Sign Up"}
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

export default AuthForm;
