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
import fitnessCouple2 from "../../assets/fitnessCouple2.jpg";

interface TrainerAuthFormProps {
  open: boolean;
  handleClose: () => void;
  formik: any;
}

const modalBoxStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 700, md: 950 },
  maxHeight: "80vh",
  bgcolor: "white",
  borderRadius: 2,
  boxShadow: 24,
  p: { xs: 2, sm: 3, md: 4 },
  display: "flex",
  overflowY: "auto",
};

const imageContainerStyles = {
  flex: "1 1 50%",
  display: { xs: "none", sm: "block" },
  pr: 2,
};

const imageStyles = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "8px",
};

const formSectionStyles = {
  flex: "1 1 50%",
  display: "flex",
  flexDirection: "column",
};

const headerBoxStyles = {
  display: "flex",
  justifyContent: "space-between",
  mb: 2,
};

const titleStyles = {
  fontWeight: 500,
};

const closeButtonStyles = {
  p: 0,
};

const formContainerStyles = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

const rowStyles = {
  display: "flex",
  gap: 2,
  width: "100%",
};

const textFieldBoxStyles = {
  flex: 1,
};

const singleFieldBoxStyles = {
  width: "100%",
};

const buttonContainerStyles = {
  display: "flex",
  gap: 2,
  justifyContent: "flex-end",
  mt: 2,
  flexDirection: { xs: "column", sm: "row" },
};

const cancelButtonStyles = {
  width: { xs: "100%", sm: "auto" },
};

const submitButtonStyles = {
  width: { xs: "100%", sm: "auto" },
  backgroundColor: "#1f2937",
  color: "white",
  "&:hover": { backgroundColor: "#374151" },
  transition: "background-color 0.3s",
};

const TrainerAuthForm: React.FC<TrainerAuthFormProps> = ({
  open,
  handleClose,
  formik,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalBoxStyles}>
        <Box sx={imageContainerStyles}>
          <Box
            component="img"
            src={fitnessCouple2}
            alt="Fitness Couple"
            sx={imageStyles}
          />
        </Box>
        <Box sx={formSectionStyles}>
          <Box sx={headerBoxStyles}>
            <Typography variant="h6" sx={titleStyles}>
              Trainer Enrollment Form
            </Typography>
            <IconButton onClick={handleClose} sx={closeButtonStyles}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={formContainerStyles}>
            <Box sx={rowStyles}>
              <Box sx={textFieldBoxStyles}>
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
              <Box sx={textFieldBoxStyles}>
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
            </Box>
            <Box sx={rowStyles}>
              <Box sx={textFieldBoxStyles}>
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
              <Box sx={textFieldBoxStyles}>
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
            </Box>
            <Box sx={rowStyles}>
              <Box sx={textFieldBoxStyles}>
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
              <Box sx={textFieldBoxStyles}>
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
                />
              </Box>
            </Box>
            <Box sx={singleFieldBoxStyles}>
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
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Box>
            <Box sx={singleFieldBoxStyles}>
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
            <Box sx={buttonContainerStyles}>
              <Button
                variant="outlined"
                onClick={handleClose}
                sx={cancelButtonStyles}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={formik.handleSubmit}
                disabled={formik.isSubmitting}
                sx={submitButtonStyles}
              >
                {formik.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default TrainerAuthForm;
