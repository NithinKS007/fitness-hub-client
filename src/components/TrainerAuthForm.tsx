import { Modal, Box, Typography, TextField, Grid } from "@mui/material";

interface TrainerAuthFormProps {
  open: boolean;
  handleClose: () => void;
  formik: any;
}

const TrainerAuthForm: React.FC<TrainerAuthFormProps> = ({
  open,
  handleClose,
  formik
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="trainer-enrollment-modal"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "85%",
          maxWidth: 600,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Trainer Enrollment Form
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              variant="standard"
              fullWidth
              required
              value={formik.values.fname}
              onChange={formik.handleChange}
              name="fname"
              error={formik.touched.fname && Boolean(formik.errors.fname)}
              helperText={formik.touched.fname && formik.errors.fname}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              variant="standard"
              fullWidth
              required
              value={formik.values.lname}
              onChange={formik.handleChange}
              name="lname"
              error={formik.touched.lname && Boolean(formik.errors.lname)}
              helperText={formik.touched.lname && formik.errors.lname}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Years of Experience"
              variant="standard"
              fullWidth
              type="number"
              required
              value={formik.values.yearsOfExperience}
              onChange={formik.handleChange}
              name="yearsOfExperience"
              error={formik.touched.yearsOfExperience && Boolean(formik.errors.yearsOfExperience)}
              helperText={formik.touched.yearsOfExperience && formik.errors.yearsOfExperience}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              variant="standard"
              fullWidth
              required
              value={formik.values.phone}
              onChange={formik.handleChange}
              name="phone"
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              variant="standard"
              fullWidth
              type="email"
              required
              value={formik.values.email}
              onChange={formik.handleChange}
              name="email"
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date of Birth"
              variant="standard"
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
              required
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              name="dateOfBirth"
              error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
              helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Password"
              variant="standard"
              fullWidth
              type="password"
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Confirm Password"
              variant="standard"
              fullWidth
              type="password"
              required
              value={formik.values.cPassword}
              onChange={formik.handleChange}
              name="cPassword"
              error={formik.touched.cPassword && Boolean(formik.errors.cPassword)}
              helperText={formik.touched.cPassword && formik.errors.cPassword}
            />
          </Grid>
          <Grid item xs={12}>
            <button
              type="button"
              className="w-full py-2 mt-4 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={formik.handleSubmit}
            >
              SUBMIT
            </button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default TrainerAuthForm;
