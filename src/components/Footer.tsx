import { Box, Container, Typography, Link, Stack } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

const links = {
  sitemap: ["About Us", "Promos", "News & Blog", "Help Center"],
  support: ["FAQ", "Support Center"],
  social: [
    { icon: <InstagramIcon fontSize="small" />, label: "Instagram" },
    { icon: <TwitterIcon fontSize="small" />, label: "Twitter" },
    { icon: <FacebookIcon fontSize="small" />, label: "Facebook" },
  ],
};

const styles = {
  root: { bgcolor: "black", color: "white", py: 7, width: "100%" },
  container: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: 4,
  },
  section: {
    flex: 1,
    minWidth: { xs: "100%", md: "auto" },
  },
  title: { fontWeight: "bold", mb: 2 },
  text: { color: "grey.400" },
  link: {
    color: "grey.400",
    textDecoration: "none",
    "&:hover": { color: "white" },
  },
  bottom: {
    mt: 4,
    pt: 2,
    borderTop: 1,
    borderColor: "grey.800",
    display: "flex",
    justifyContent: "flex-end",
    gap: 2,
  },
};

const Footer = () => {
  return (
    <Box sx={styles.root}>
      <Container maxWidth={false}>
        <Box sx={styles.container}>
          <Box sx={styles.section}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Push Yourself, Because No One Else Will
            </Typography>
            <Typography variant="body2" sx={styles.text}>
              Every step you take brings you closer to your goal every grind
              counts towards your success
            </Typography>
          </Box>
          <Box sx={styles.section}>
            <Typography variant="h6" sx={styles.title}>
              Sitemap
            </Typography>
            <Stack spacing={1}>
              {links.sitemap.map((title) => (
                <Link key={title} sx={styles.link}>
                  {title}
                </Link>
              ))}
            </Stack>
          </Box>
          <Box sx={styles.section}>
            <Typography variant="h6" sx={styles.title}>
              Support
            </Typography>
            <Stack spacing={1}>
              {links.support.map((title) => (
                <Link key={title} sx={styles.link}>
                  {title}
                </Link>
              ))}
            </Stack>
          </Box>
          <Box sx={styles.section}>
            <Typography variant="h6" sx={styles.title}>
              Social Media
            </Typography>
            <Stack direction="row" spacing={2}>
              {links.social.map((link) => (
                <Link key={link.label} aria-label={link.label} sx={styles.link}>
                  {link.icon}
                </Link>
              ))}
            </Stack>
          </Box>
        </Box>
        <Box sx={styles.bottom}>
          <Link sx={styles.link}>Terms of Use</Link>
          <Link sx={styles.link}>Privacy Policy</Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
