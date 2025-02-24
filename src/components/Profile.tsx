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
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { Link } from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";

interface ProfileProps {
  formik?: any;
  handleProfilePicChange?: React.ChangeEventHandler<HTMLInputElement>;
  handlePdfChange?: React.ChangeEventHandler<HTMLInputElement>;
  isEditable: boolean;
}

const Profile: React.FC<ProfileProps> = ({
  formik,
  isEditable,
  handleProfilePicChange,
  handlePdfChange,
}) => {
  return (
    <Container maxWidth={false} sx={{ py: 4 }}>
      <Paper
        sx={{
          p: 4,
          borderRadius: 2,
          width: "95%",
          maxWidth: "1400px",
          marginX: "auto",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h6"  sx={{ fontWeight: 500 }}>
                MY ACCOUNT
              </Typography>
              <Divider sx={{ my: 2 }} />
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  height: "100%",
                  gap: 2,
                  pt: 2,
                }}
              >
                <label htmlFor="profilePic-upload">
                  <Avatar
                    src={formik.values.profilePic || ""}
                    sx={{
                      width: 150,
                      height: 150,
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
                  style={{
                    display: "none",
                  }}
                  id="profilePic-upload"
                  disabled={!isEditable}
                />
                <Typography
                  sx={{
                    fontSize: "20px",
                    color: isEditable ? "black" : "gray",
                    pointerEvents: isEditable ? "auto" : "none",
                  }}
                >
                  {formik.values.fname} {formik.values.lname}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="fname"
                    fullWidth
                    label="First Name"
                    value={formik.values.fname || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    size="small" // Already small, kept as is
                    error={formik.touched.fname && Boolean(formik.errors.fname)}
                    helperText={formik.touched.fname && formik.errors.fname}
                    disabled={!isEditable}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} // Rounded corners
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
                    size="small" // Already small, kept as is
                    error={formik.touched.lname && Boolean(formik.errors.lname)}
                    helperText={formik.touched.lname && formik.errors.lname}
                    disabled={!isEditable}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} // Rounded corners
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    fullWidth
                    label="Email"
                    value={formik.values.email || ""}
                    size="small" // Already small, kept as is
                    disabled
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} // Rounded corners
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
                    size="small" // Already small, kept as is
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    disabled={!isEditable}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} // Rounded corners
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
                    size="small" // Already small, kept as is
                    error={
                      formik.touched.dateOfBirth &&
                      Boolean(formik.errors.dateOfBirth)
                    }
                    helperText={
                      formik.touched.dateOfBirth && formik.errors.dateOfBirth
                    }
                    disabled={!isEditable}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} // Rounded corners
                  />
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
                      size="small" // Already small, kept as is
                      error={
                        formik.touched.yearsOfExperience &&
                        Boolean(formik.errors.yearsOfExperience)
                      }
                      helperText={
                        formik.touched.yearsOfExperience &&
                        formik.errors.yearsOfExperience
                      }
                      disabled={!isEditable}
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} // Rounded corners
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              {formik.values.role === "trainer" && (
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
                  sx={{ mt: 2, "& .MuiOutlinedInput-root": { borderRadius: 2 } }} // Rounded corners
                  disabled={!isEditable}
                />
              )}
            </Grid>
          </Grid>
        </form>
      </Paper>
      {formik.values.role === "trainer" && (
        <Box
          sx={{
            backgroundColor: "white",
            p: 3,
            borderRadius: 2,
            boxShadow: 1,
            mt: 4,
            width: "95%",
          maxWidth: "1400px",
            marginX: "auto",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Certifications
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {isEditable && (
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
            )}

            {formik.values.certifications &&
            formik.values.certifications.length > 0 ? (
              <Grid container spacing={2}>
                {formik.values.certifications.map(
                  (cert: { fileName: string; url: string }, index: number) => (
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

            <Grid item xs={12}>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                {isEditable && (
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: "black", color: "white" }}
                    onClick={formik.handleSubmit}
                    sx={{
                      height: "48px", // Adjusted height for better proportions
                      borderRadius: 2, // Rounded corners
                    }}
                  >
                    Save Changes
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Profile;