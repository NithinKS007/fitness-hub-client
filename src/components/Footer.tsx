import { Box, Container, Typography, Link, Stack, Grid } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
  const sitemapLinks = [
    { title: 'About Us'},
    { title: 'Promos'},
    { title: 'News & Blog'},
    { title: 'Help Center'}
  ];

  const supportLinks = [
    { title: 'FAQ'},
    { title: 'Support Center'}
  ];

  const socialLinks = [
    { icon: <InstagramIcon fontSize="small" />, label: 'Instagram' },
    { icon: <TwitterIcon fontSize="small" />, label: 'Twitter' },
    { icon: <FacebookIcon fontSize="small" />, label: 'Facebook' }
  ];

  return (
    <Box sx={{ bgcolor: 'black', color: 'white', py: 7 }}>
      <Container maxWidth={false}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              Push Yourself, Because No One Else Will
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.400' }}>
              Every step you take brings you closer to your goal every grind counts towards your success
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Sitemap
            </Typography>
            <Stack spacing={1}>
              {sitemapLinks.map((link) => (
                <Link
                  key={link.title}
                  sx={{
                    color: 'grey.400',
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'white'
                    }
                  }}
                >
                  {link.title}
                </Link>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Support
            </Typography>
            <Stack spacing={1}>
              {supportLinks.map((link) => (
                <Link
                  key={link.title}
                  sx={{
                    color: 'grey.400',
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'white'
                    }
                  }}
                >
                  {link.title}
                </Link>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Social Media
            </Typography>
            <Stack direction="row" spacing={2}>
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  aria-label={link.label}
                  sx={{
                    color: 'grey.400',
                    '&:hover': {
                      color: 'white'
                    }
                  }}
                >
                  {link.icon}
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: 4,
            pt: 2,
            borderTop: 1,
            borderColor: 'grey.800',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2
          }}
        >
          <Link
            sx={{
              color: 'grey.400',
              textDecoration: 'none',
              fontSize: '0.875rem',
              '&:hover': {
                color: 'white'
              }
            }}
          >
            Terms of Use
          </Link>
          <Link
            sx={{
              color: 'grey.400',
              textDecoration: 'none',
              fontSize: '0.875rem',
              '&:hover': {
                color: 'white'
              }
            }}
          >
            Privacy Policy
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
