import { Box, Typography, Container, Stack } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";

interface GetACoachBannerProps {
  getACoachBanner: string;
}
const GetACoachBanner: React.FC<GetACoachBannerProps> = ({
  getACoachBanner,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "500px",
        background: `linear-gradient(to top, #fafafa 0%, #e2f5e9 80%, #e8f5e9 100%)`,
        pt: 8,
        pb: 8,
        mb: 1,
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                color: "#1a1a1a",
                fontWeight: 600,
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              STRENGTH & CONDITIONING COACH
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "32px", md: "38px" },
                fontWeight: 700,
                color: "#1a1a1a",
                mb: 4,
                lineHeight: 1.2,
              }}
            >
              Transform your body with Strength & Conditioning
            </Typography>
            <Stack spacing={2} sx={{ mb: 4 }}>
              {[
                "Online classes at your convenience",
                "Beginner, Intermediate & Advanced batches",
                "Train with qualified experts",
              ].map((text, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", gap: 2 }}
                >
                  <CheckCircleOutlineIcon sx={{ color: "#1a1a1a" }} />
                  <Typography
                    variant="body1"
                    sx={{ color: "#1a1a1a", fontSize: "18px" }}
                  >
                    {text}
                  </Typography>
                </Box>
              ))}
            </Stack>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Box
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.7)",
                  px: 2,
                  py: 1,
                  borderRadius: "100px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1" sx={{ color: "#1a1a1a" }}>
                  200+ coaches
                </Typography>
              </Box>
              <Box
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.7)",
                  px: 2,
                  py: 1,
                  borderRadius: "100px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <StarIcon sx={{ color: "#FFB400" }} />
                <Typography variant="body1" sx={{ color: "#1a1a1a" }}>
                  20,000+ 5 star reviews
                </Typography>
              </Box>
              <Box
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.7)",
                  px: 2,
                  py: 1,
                  borderRadius: "100px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <VerifiedIcon sx={{ color: "#2196f3" }} />
                <Typography variant="body1" sx={{ color: "#1a1a1a" }}>
                  Certified Coaches
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              width: "500px",
              height: "500px",
              position: "relative",
            }}
          >
            <Box
              component="img"
              src={getACoachBanner}
              alt="Strength Coach"
              sx={{
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default GetACoachBanner;
