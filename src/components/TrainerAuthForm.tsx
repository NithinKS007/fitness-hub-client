import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Paper,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

interface TrainerAuthFormProps {
  open: boolean;
  handleClose: () => void;
  formik: any;
}

const 
TrainerAuthForm: React.FC<TrainerAuthFormProps> = ({
  open,
  handleClose,
  formik,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="trainer-enrollment-modal"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "85%",
          maxWidth: 600,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          p: 4,
          backgroundColor: "#fff",
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            color: "#757575",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 500,
            mb: 3,
            color: "#202124",
          }}
        >
          Trainer Enrollment Form
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              size="small"
              required
              value={formik.values.fname}
              onChange={formik.handleChange}
              name="fname"
              error={formik.touched.fname && Boolean(formik.errors.fname)}
              helperText={formik.touched.fname && formik.errors.fname}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              size="small"
              required
              value={formik.values.lname}
              onChange={formik.handleChange}
              name="lname"
              error={formik.touched.lname && Boolean(formik.errors.lname)}
              helperText={formik.touched.lname && formik.errors.lname}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Years of Experience"
              variant="outlined"
              fullWidth
              size="small"
              type="number"
              required
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
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              size="small"
              required
              value={formik.values.phone}
              onChange={formik.handleChange}
              name="phone"
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              size="small"
              type="email"
              required
              value={formik.values.email}
              onChange={formik.handleChange}
              name="email"
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date of Birth"
              variant="outlined"
              fullWidth
              size="small"
              type="date"
              InputLabelProps={{ shrink: true }}
              required
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
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              size="small"
              type="password"
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              size="small"
              type="password"
              required
              value={formik.values.cPassword}
              onChange={formik.handleChange}
              name="cPassword"
              error={
                formik.touched.cPassword && Boolean(formik.errors.cPassword)
              }
              helperText={formik.touched.cPassword && formik.errors.cPassword}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 3,
              }}
            >
              <Button
                variant="contained"
                onClick={handleClose}
                sx={{
                  backgroundColor: "#f1f3f4",
                  color: "#202124",
                  "&:hover": { backgroundColor: "#e8eaed" },
                  textTransform: "none",
                  borderRadius: 2,
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={formik.handleSubmit}
                sx={{
                  backgroundColor: "#1a73e8",
                  color: "white",
                  "&:hover": { backgroundColor: "#1557b0" },
                  textTransform: "none",
                  borderRadius: 2,
                }}
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default TrainerAuthForm;