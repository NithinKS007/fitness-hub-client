import { Box, Typography, Container } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

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
        minHeight: "400px",
        backgroundColor: "#e2f5e9",
        pt: 6,
        pb: 6,
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ textAlign: "center", md: "left" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#1a1a1a",
                mb: 2,
                textTransform: "uppercase",
              }}
            >
              Strength & Conditioning Coach
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#1a1a1a",
                mb: 3,
                fontSize: { xs: "32px", md: "38px" },
              }}
            >
              Transform your body with expert coaching
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
              {[
                "Online classes at your convenience",
                "All skill levels welcome",
                "Trained and certified experts",
              ].map((text, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <CheckCircleOutlineIcon sx={{ color: "#1a1a1a" }} />
                  <Typography variant="body1" sx={{ color: "#1a1a1a" }}>
                    {text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "block" },
              width: "300px",
              height: "300px",
            }}
          >
            <Box
              component="img"
              src={getACoachBanner}
              alt="Strength Coach"
              sx={{
                objectFit: "contain",
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default GetACoachBanner;
