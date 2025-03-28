import React from "react";
import { Card, CardContent, Box, Grid, Skeleton } from "@mui/material";


const TrainerCardShimmer = () => {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "100%",
        minHeight: "350px",
        borderRadius: "10px",
        boxShadow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            pt: 3,
            px: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Box
            sx={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              overflow: "hidden",
              backgroundColor: "#f5f5f5",
            }}
          >
            <Skeleton variant="circular" width="100%" height="100%" />
          </Box>

          <Skeleton variant="text" width="60%" height={20} sx={{ mt: 2 }} />
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Skeleton variant="rectangular" width={30} height={20} sx={{ marginRight: 1 }} />
            <Skeleton variant="text" width="20%" height={20} sx={{ marginRight: 1 }} />
            <Skeleton variant="text" width="15%" height={20} />
          </Box>

          <Box
            sx={{
              width: "100%",
              bgcolor: "#f8f8f8",
              p: 2,
              borderRadius: "8px",
              mt: 2,
            }}
          >
            <Skeleton variant="text" width="80%" height={16} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
                <Skeleton variant="text" width={30} height={16} sx={{ marginRight: 1 }} />
                <Skeleton variant="text" width={30} height={16} />
              </Box>
              <Box>
                <Skeleton variant="text" width="20%" height={16} />
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "flex", width: "100%", mt: 2 }}>
            <Skeleton variant="circular" width={48} height={48} />
            <Box sx={{ flex: 1, ml: 1 }}>
              <Skeleton variant="rectangular" width="100%" height={48} />
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const TrainerGridShimmer: React.FC= () => {
  return (
    <Grid  container spacing={2} sx={{ justifyContent: { xs: "center", md: "flex-start" } }}>
      {Array.from({ length: 10 }).map((_, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <TrainerCardShimmer />
        </Grid>
      ))}
    </Grid>
  );
};

export default TrainerGridShimmer;
