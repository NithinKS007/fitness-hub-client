import React from "react";
import { Link } from "react-router-dom";
import { TextField, Box, Button, Typography } from "@mui/material";
import fitnessCouple2 from "../assets/fitnessCouple2.jpg";

interface ResetPasswordProps {
  formik: any;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ formik }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.100",
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
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh", 
            bgcolor: "black", 
            overflow: "hidden", 
          }}
        >
          <Box
            component="img"
            src={fitnessCouple2}
            alt="Fitness Couple"
            sx={{
              width: "100%",
              height: "100%",
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
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
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
                    formik.touched.cPassword &&
                    Boolean(formik.errors.cPassword)
                  }
                  helperText={
                    formik.touched.cPassword && formik.errors.cPassword
                  }
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />

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
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Resetting..." : "Reset Password"}
                </Button>
              </Box>
            </form>

            <Box sx={{ mt: 2, textAlign: "center" }}>
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