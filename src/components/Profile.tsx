import {
  Box,
  Container,
  Paper,
  Grid,
  Typography,
  TextField,
  Avatar,
  Divider,
  Button,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Chip,
  FormControlLabel,
  Radio,
  FormHelperText,
  RadioGroup,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { Link } from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

interface ProfileProps {
  formik?: any;
  handleProfilePicChange?: React.ChangeEventHandler<HTMLInputElement>
  handlePdfChange?: React.ChangeEventHandler<HTMLInputElement>;
  isEditable: boolean;
}

const specializationsList = [
  "Fitness & Nutrition",
  "Strength And Conditioning",
  "Yoga",
  "Zumba",
  "Muscle Building",
  "Injury Rehab",
  "Competition Prep",
  "Pre & Post Natal Training",
  "Diabetes management",
  "Cardio",
  "Nutrition Coaching",
];

const Profile: React.FC<ProfileProps> = ({
  formik,
  isEditable,
  handleProfilePicChange,
  handlePdfChange,
}) => {
  return (
    <Container maxWidth={false} sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          width: "100%",
          marginX: "auto",
        }}
      >
        <Box
          sx={{
            flex: { md: "0 0 30%" },
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              background: "white",
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#01579b",
                  textAlign: "center",
                }}
              >
                Profile Overview
              </Typography>
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                }}
              >
                <Avatar
                  src={formik.values.profilePic || ""}
                  sx={{
                    width: 100,
                    height: 100,
                    mx: "auto",
                    border: "2px solid black",
                  }}
                >
                  {!formik.values.profilePic && (
                    <AccountCircleIcon sx={{ fontSize: 80 }} />
                  )}
                </Avatar>
                <Typography variant="body2" sx={{ color: "#0288d1" }}>
                  <strong>Name:</strong> {formik.values.fname}{" "}
                  {formik.values.lname}
                </Typography>
                <Typography variant="body2" sx={{ color: "#0288d1" }}>
                  <strong>Email:</strong> {formik.values.email}
                </Typography>
                <Typography variant="body2" sx={{ color: "#0288d1" }}>
                  <strong>Phone:</strong> {formik.values.phone || "N/A"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#0288d1" }}>
                  <strong>Date of Birth:</strong>{" "}
                  {formik.values.dateOfBirth || "N/A"}
                </Typography>
                {formik.values.role === "trainer" && (
                  <Typography variant="body2" sx={{ color: "#0288d1" }}>
                    <strong>Experience:</strong>{" "}
                    {formik.values.yearsOfExperience || "N/A"} years
                  </Typography>
                )}
              </Box>
            </Box>
            {isEditable && (
              <Box>
                <Divider sx={{ mb: 2 }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#01579b",
                    textAlign: "center",
                  }}
                >
                  Edit Profile
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<PhotoCamera />}
                    sx={{ borderRadius: 1, backgroundColor: "black" }}
                  >
                    Upload Picture
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleProfilePicChange}
                      id="profilePic-upload"
                    />
                  </Button>
                  {formik.touched.profilePic && formik.errors.profilePic && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ textAlign: "center" }}
                    >
                      {formik.errors.profilePic}
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          </Paper>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 4, borderRadius: 2 }}>
            <form onSubmit={formik.handleSubmit}>
              <Typography variant="h6" gutterBottom>
                PERSONAL DETAILS
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="fname"
                    fullWidth
                    label="First Name"
                    value={formik.values.fname || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    size="small"
                    error={formik.touched.fname && Boolean(formik.errors.fname)}
                    helperText={formik.touched.fname && formik.errors.fname}
                    disabled={!isEditable}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
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
                    size="small"
                    error={formik.touched.lname && Boolean(formik.errors.lname)}
                    helperText={formik.touched.lname && formik.errors.lname}
                    disabled={!isEditable}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    fullWidth
                    label="Email"
                    value={formik.values.email || ""}
                    size="small"
                    disabled
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="phone"
                    fullWidth
                    label="Phone"
                    value={formik.values.phone || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    size="small"
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    disabled={!isEditable}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                </Grid>
                <Grid item xs={12} sm={6}>
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
                {formik.values.role === "trainer" && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="yearsOfExperience"
                      fullWidth
                      type="number"
                      label="Years of Experience"
                      value={formik.values.yearsOfExperience || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      size="small"
                      error={
                        formik.touched.yearsOfExperience &&
                        Boolean(formik.errors.yearsOfExperience)
                      }
                      helperText={
                        formik.touched.yearsOfExperience &&
                        formik.errors.yearsOfExperience
                      }
                      disabled={!isEditable}
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    />
                  </Grid>
                )}
                {formik.values.role === "trainer" && (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        name="aboutMe"
                        fullWidth
                        label="About Me"
                        multiline
                        rows={4}
                        value={formik.values.aboutMe || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Write something about yourself..."
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                        disabled={!isEditable}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <Select
                          labelId="specializations-label"
                          name="specializations"
                          multiple
                          value={formik.values.specializations || []}
                          onChange={formik.handleChange}
                          disabled={!isEditable}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                border: "1px solid",
                                borderColor: "grey.400",
                                borderRadius: 2,
                                mt: 1,
                              },
                              elevation: 1,
                            },
                          }}
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              {selected.map((value: string) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                          sx={{ borderRadius: 2 }}
                        >
                          {specializationsList.map((spec) => (
                            <MenuItem key={spec} value={spec}>
                              {spec}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </>
                )}
              </Grid>
              {isEditable && (
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: "black", color: "white" }}
                    sx={{ height: "48px", borderRadius: 2 }}
                  >
                    Save Changes
                  </Button>
                </Box>
              )}
            </form>
          </Paper>
          {formik.values.role === "trainer" && (
            <Paper sx={{ p: 3, borderRadius: 2, mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Certifications
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {isEditable && (
                  <>
                    <input
                      type="file"
                      accept="application/pdf"
                      multiple
                      onChange={handlePdfChange}
                      style={{
                        marginBottom: 16,
                        border: "1px solid #ddd",
                        borderRadius: 4,
                        padding: "8px 12px",
                      }}
                    />
                    {formik.touched.certifications &&
                      formik.errors.certifications && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ mt: -1 }}
                        >
                          {typeof formik.errors.certifications === "string"
                            ? formik.errors.certifications
                            : "Invalid certification files"}
                        </Typography>
                      )}
                  </>
                )}
                {formik.values.certifications &&
                formik.values.certifications.length > 0 ? (
                  <Grid container spacing={2}>
                    {formik.values.certifications.map(
                      (
                        cert: { fileName: string; url: string },
                        index: number
                      ) => (
                        <Grid item xs={12} key={index}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              padding: "8px",
                              borderRadius: 1,
                              backgroundColor: "#f7f7f7",
                            }}
                          >
                            <ArticleOutlinedIcon sx={{ fontSize: 30 }} />
                            <Typography variant="body2" sx={{ flex: 1 }}>
                              <Link
                                href={cert.url || cert.fileName}
                                target="_blank"
                                sx={{ textDecoration: "none" }}
                              >
                                {cert.fileName}
                              </Link>
                            </Typography>
                            <IconButton
                              component="a"
                              href={cert.url || cert.fileName}
                              target="_blank"
                              download
                              sx={{ color: "black" }}
                            >
                              <DownloadIcon />
                            </IconButton>
                          </Box>
                        </Grid>
                      )
                    )}
                  </Grid>
                ) : (
                  <Typography variant="body2" sx={{ color: "gray" }}>
                    No certificates available
                  </Typography>
                )}
              </Box>
            </Paper>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
