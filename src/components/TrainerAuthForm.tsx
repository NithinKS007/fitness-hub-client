import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface TrainerAuthFormProps {
  open: boolean;
  handleClose: () => void;
  formik: any;
}

const TrainerAuthForm: React.FC<TrainerAuthFormProps> = ({
  open,
  handleClose,
  formik,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 500, md: 700 },
          maxHeight: "80vh",
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 24,
          p: { xs: 2, sm: 3, md: 4 },
          overflowY: "auto",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Trainer Enrollment Form
          </Typography>
          <IconButton onClick={handleClose} sx={{ p: 0 }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Box sx={{ flex: "1 1 45%", mb: 2 }}>
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
            />
          </Box>
          <Box sx={{ flex: "1 1 45%", mb: 2 }}>
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
            />
          </Box>
          <Box sx={{ flex: "1 1 45%", mb: 2 }}>
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
            />
          </Box>
          <Box sx={{ flex: "1 1 45%", mb: 2 }}>
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
            />
          </Box>
          <Box sx={{ flex: "1 1 45%", mb: 2 }}>
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
            />
          </Box>
          <Box sx={{ flex: "1 1 45%", mb: 2 }}>
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
                formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)
              }
              helperText={
                formik.touched.dateOfBirth && formik.errors.dateOfBirth
              }
            />
          </Box>
          <Box sx={{ flex: "1 1 45%", mb: 2 }}>
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
            />
          </Box>
          <Box sx={{ flex: "1 1 45%", mb: 2 }}>
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
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
              flexDirection: { xs: "column", sm: "row" },
              width: "100%",
            }}
          >
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={formik.handleSubmit}
              disabled={formik.isSubmitting}
              sx={{
                width: { xs: "100%", sm: "auto" },
                backgroundColor: "black",
                color: "white",
              }}
            >
              {formik.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default TrainerAuthForm;
