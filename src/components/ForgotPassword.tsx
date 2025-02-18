import React from "react"
import { Link } from "react-router-dom"
import { TextField, Box, Button, Typography } from "@mui/material"

interface ForgotPasswordProps {
  formik: any
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ formik }) => {
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
            bgcolor: "grey.300",
            display: { xs: "none", md: "flex" }, 
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <Typography variant="h4" color="text.secondary">
            Image Placeholder
          </Typography>
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
            <Typography variant="h4" gutterBottom>
              Forgot Password?
            </Typography>

            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  fullWidth
                  name="email"
                  label="Enter your email address"
                  type="email"
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
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
                    height: "50px",
                  }}
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Sending Link..." : "Send Link"}
                </Button>
              </Box>
            </form>

            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                <Link to="/" style={{ color: "blue", textDecoration: "none" }}>
                  Back to website
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ForgotPassword
