import React from "react";
import {
  Box,
  Paper,
  Grid,
  Typography,
  TextField,
  Avatar,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface ProfileDetailsProps {
  formik: any;
  isEditable?: boolean;
  handleProfilePicChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const UserProfile: React.FC<ProfileDetailsProps> = ({
  isEditable,
  formik,
  handleProfilePicChange,
}) => {
  return (
    <Box
      sx={{
        width: "85%",
        maxWidth: "1500px",
        marginX: "auto",
        marginBottom:"15px"
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                md={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: { xs: 3, md: 0 },
                }}
              >
                <label htmlFor="profilePic-upload">
                  <Avatar
                    src={formik.values.profilePic || ""}
                    sx={{
                      width: { xs: 120, sm: 140 },
                      height: { xs: 120, sm: 140 },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    {!formik.values.profilePic && (
                      <AccountCircleIcon sx={{ fontSize: 90 }} />
                    )}
                  </Avatar>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  style={{ display: "none" }}
                  id="profilePic-upload"
                />
              </Grid>
              <Grid item xs={12} md={9}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="fname"
                      fullWidth
                      label="First Name"
                      value={formik.values.fname || ""}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.fname && Boolean(formik.errors.fname)
                      }
                      helperText={formik.touched.fname && formik.errors.fname}
                      disabled={!isEditable}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="lname"
                      fullWidth
                      label="Last Name"
                      value={formik.values.lname || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.lname && Boolean(formik.errors.lname)
                      }
                      helperText={formik.touched.lname && formik.errors.lname}
                      disabled={!isEditable}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={formik.values.email || ""}
                      disabled
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={formik.values.phone || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={!isEditable}
                      error={
                        formik.touched.phone && Boolean(formik.errors.phone)
                      }
                      helperText={formik.touched.phone && formik.errors.phone}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      fullWidth
                      size="small"
                      error={
                        formik.touched.gender && Boolean(formik.errors.gender)
                      }
                    >
                      <RadioGroup
                        name="gender"
                        value={formik.values.gender || ""}
                        onChange={formik.handleChange}
                        row
                      >
                        {["male", "female"].map((gender) => (
                          <FormControlLabel
                            key={gender}
                            value={gender}
                            control={<Radio />}
                            label={
                              gender.charAt(0).toUpperCase() + gender.slice(1)
                            }
                          />
                        ))}
                      </RadioGroup>
                      {formik.touched.gender && formik.errors.gender && (
                        <FormHelperText>{formik.errors.gender}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Age"
                      name="age"
                      type="number"
                      value={formik.values.age || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.age && Boolean(formik.errors.age)}
                      helperText={formik.touched.age && formik.errors.age}
                      disabled={!isEditable}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      name="dateOfBirth"
                      fullWidth
                      type="date"
                      value={formik?.values?.dateOfBirth || ""}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      size="small"
                      error={
                        formik.touched.dateOfBirth &&
                        Boolean(formik.errors.dateOfBirth)
                      }
                      helperText={
                        formik.touched.dateOfBirth && formik.errors.dateOfBirth
                      }
                      disabled={!isEditable}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Height (cm)"
                      name="height"
                      type="number"
                      value={formik.values.height || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={!isEditable}
                      error={
                        formik.touched.height && Boolean(formik.errors.height)
                      }
                      helperText={formik.touched.height && formik.errors.height}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Weight (kg)"
                      name="weight"
                      type="number"
                      value={formik.values.weight || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={!isEditable}
                      error={
                        formik.touched.weight && Boolean(formik.errors.weight)
                      }
                      helperText={formik.touched.weight && formik.errors.weight}
                      size="small"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Health Related Details
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Blood Group"
                  name="bloodGroup"
                  value={formik.values.bloodGroup || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={!isEditable}
                  error={
                    formik.touched.bloodGroup &&
                    Boolean(formik.errors.bloodGroup)
                  }
                  helperText={
                    formik.touched.bloodGroup && formik.errors.bloodGroup
                  }
                  size="small"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Medical Conditions"
                  name="medicalConditions"
                  value={formik.values.medicalConditions || ""}
                  onChange={formik.handleChange}
                  disabled={!isEditable}
                  error={
                    formik.touched.medicalConditions &&
                    Boolean(formik.errors.medicalConditions)
                  }
                  helperText={
                    formik.touched.medicalConditions &&
                    formik.errors.medicalConditions
                  }
                  multiline
                  rows={2}
                  size="small"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Other concerns"
                  name="otherConcerns"
                  value={formik.values.otherConcerns || ""}
                  onChange={formik.handleChange}
                  disabled={!isEditable}
                  error={
                    formik.touched.otherConcerns &&
                    Boolean(formik.errors.otherConcerns)
                  }
                  helperText={
                    formik.touched.otherConcerns && formik.errors.otherConcerns
                  }
                  multiline
                  rows={2}
                  size="small"
                />
              </Grid>
            </Grid>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", mt: "20px" }}
            >
              <Button
                variant="contained"
                style={{ backgroundColor: "black" }}
                onClick={() => formik.handleSubmit()}
                disabled={!isEditable}
              >
                Save Changes
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
