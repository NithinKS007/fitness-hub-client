import type React from "react";
import {
  Box,
  Paper,
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
  formik?: any;
  isEditable?: boolean;
  handleProfilePicChange?: React.ChangeEventHandler<HTMLInputElement>;
  changePasswordFormik?: any;
}

const UserProfile: React.FC<ProfileDetailsProps> = ({
  isEditable,
  formik,
  handleProfilePicChange,
  changePasswordFormik,
}) => {
  return (
    <>
      <Box
        sx={{
          width: "80%",
          maxWidth: "1000px",
          marginX: "auto",
          marginBottom: "15px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
           ACCOUNT INFORMATION
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: { md: "0 0 25%" },
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
            </Box>

            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 2,
                }}
              >
                <TextField
                  name="fname"
                  fullWidth
                  label="First Name"
                  value={formik.values.fname || ""}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={formik.touched.fname && Boolean(formik.errors.fname)}
                  helperText={formik.touched.fname && formik.errors.fname}
                  disabled={!isEditable}
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
                <TextField
                  name="lname"
                  fullWidth
                  label="Last Name"
                  value={formik.values.lname || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.lname && Boolean(formik.errors.lname)}
                  helperText={formik.touched.lname && formik.errors.lname}
                  disabled={!isEditable}
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formik.values.email || ""}
                  disabled
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formik.values.phone || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={!isEditable}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
                <FormControl
                  fullWidth
                  size="small"
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
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
                        label={gender.charAt(0).toUpperCase() + gender.slice(1)}
                      />
                    ))}
                  </RadioGroup>
                  {formik.touched.gender && formik.errors.gender && (
                    <FormHelperText>{formik.errors.gender}</FormHelperText>
                  )}
                </FormControl>
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
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
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
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
                <TextField
                  fullWidth
                  label="Height (cm)"
                  name="height"
                  type="number"
                  value={formik.values.height || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={!isEditable}
                  error={formik.touched.height && Boolean(formik.errors.height)}
                  helperText={formik.touched.height && formik.errors.height}
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
                <TextField
                  fullWidth
                  label="Weight (kg)"
                  name="weight"
                  type="number"
                  value={formik.values.weight || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={!isEditable}
                  error={formik.touched.weight && Boolean(formik.errors.weight)}
                  helperText={formik.touched.weight && formik.errors.weight}
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Box>
            </Box>
          </Box>
        </Paper>

        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
           HEALTH DETAILS
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              fullWidth
              label="Blood Group"
              name="bloodGroup"
              value={formik.values.bloodGroup || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={!isEditable}
              error={
                formik.touched.bloodGroup && Boolean(formik.errors.bloodGroup)
              }
              helperText={formik.touched.bloodGroup && formik.errors.bloodGroup}
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />

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
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />

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
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Box>

          {isEditable ? (
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", mt: "20px" }}
            >
              <Button
                variant="contained"
                style={{ backgroundColor: "#1d4ed8" }}
                onClick={() => formik.handleSubmit()}
                disabled={!isEditable}
                sx={{
                  height: "48px",
                  borderRadius: 2,
                }}
              >
                Save Changes
              </Button>
            </Box>
          ) : (
            ""
          )}
        </Paper>
      </Box>

      {isEditable ? (
        <Box
          sx={{
            width: "80%",
            maxWidth: "1000px",
            marginX: "auto",
            marginBottom: "15px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
             CHANGE PASSWORD
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                fullWidth
                name="password"
                value={changePasswordFormik.values.password}
                onChange={changePasswordFormik.handleChange}
                onBlur={changePasswordFormik.handleBlur}
                error={
                  changePasswordFormik.touched.password &&
                  Boolean(changePasswordFormik.errors.password)
                }
                helperText={
                  changePasswordFormik.touched.password &&
                  changePasswordFormik.errors.password
                }
                label="Current Password"
                type="password"
                size="small"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
              <TextField
                fullWidth
                name="newPassword"
                value={changePasswordFormik.values.newPassword}
                onChange={changePasswordFormik.handleChange}
                onBlur={changePasswordFormik.handleBlur}
                error={
                  changePasswordFormik.touched.newPassword &&
                  Boolean(changePasswordFormik.errors.newPassword)
                }
                helperText={
                  changePasswordFormik.touched.newPassword &&
                  changePasswordFormik.errors.newPassword
                }
                label="New Password"
                type="password"
                size="small"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
              <TextField
                fullWidth
                name="cPassword"
                value={changePasswordFormik.values.cPassword}
                onChange={changePasswordFormik.handleChange}
                onBlur={changePasswordFormik.handleBlur}
                error={
                  changePasswordFormik.touched.cPassword &&
                  Boolean(changePasswordFormik.errors.cPassword)
                }
                helperText={
                  changePasswordFormik?.touched.cPassword &&
                  changePasswordFormik.errors.cPassword
                }
                label="Confirm New Password"
                type="password"
                size="small"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "flex-end", mt: "20px" }}
            >
              <Button
                variant="contained"
                style={{ backgroundColor: "#1d4ed8" }}
                onClick={() => changePasswordFormik?.handleSubmit()}
                disabled={!isEditable}
                sx={{
                  height: "48px",
                  borderRadius: 2,
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Paper>
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default UserProfile;
