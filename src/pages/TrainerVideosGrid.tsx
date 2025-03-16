import React from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';

// Dummy video data (unchanged)
const videoData = [
  { id: 1, title: "Strength Basics", duration: "15:32", thumbnail: "https://via.placeholder.com/300x300.png?text=Strength" },
  { id: 2, title: "Cardio Intro", duration: "20:15", thumbnail: "https://via.placeholder.com/300x300.png?text=Cardio" },
  { id: 3, title: "Yoga Starter", duration: "18:40", thumbnail: "https://via.placeholder.com/300x300.png?text=Yoga" },
  { id: 4, title: "HIIT Basics", duration: "22:45", thumbnail: "https://via.placeholder.com/300x300.png?text=HIIT" },
  { id: 5, title: "Core Strength", duration: "25:10", thumbnail: "https://via.placeholder.com/300x300.png?text=Core" },
  { id: 6, title: "Leg Day", duration: "28:20", thumbnail: "https://via.placeholder.com/300x300.png?text=Legs" },
  { id: 7, title: "Arm Workout", duration: "19:55", thumbnail: "https://via.placeholder.com/300x300.png?text=Arms" },
  { id: 8, title: "Power Lifting", duration: "30:00", thumbnail: "https://via.placeholder.com/300x300.png?text=Power" },
];

const TrainerVideosGrid = () => {
  const handleVideoClick = (videoId) => {
    console.log(`Clicked video ${videoId}`);
    // Add your navigation logic here
  };

  return (
    <Box 
      sx={{ 
        p: 2, 
        mx: { xs: 2, sm: 4, md: 10 }, // Responsive margins instead of fixed ml:10, mr:10
        display: 'flex', 
        flexWrap: 'wrap', // Allows items to wrap to the next row
        gap: 2, // Spacing between cards, replacing Grid's spacing
        justifyContent: 'center', // Center the cards for a clean look
      }}
    >
      {videoData.map((video) => (
        <Box
          key={video.id}
          sx={{
            flex: { 
              xs: '1 1 100%', // Full width on extra small screens
              sm: '1 1 48%',  // Two cards per row on small screens
              md: '1 1 31%',  // Three cards per row on medium screens
              lg: '1 1 23%'   // Four cards per row on large screens
            }, 
            maxWidth: { xs: '100%', sm: 300, md: 320 }, // Control card width responsively
          }}
        >
          <Card
            onClick={() => handleVideoClick(video.id)}
            sx={{ 
              '&:hover': { cursor: 'pointer' },
              height: '100%', // Ensure card takes full height of container
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                image={video.thumbnail}
                alt={video.title}
                sx={{ 
                  height: { xs: 150, sm: 180 }, // Slightly smaller on mobile
                  objectFit: 'cover',
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  bgcolor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                }}
              >
                {video.duration}
              </Typography>
            </Box>
            <CardContent sx={{ p: 2 }}>
              <Typography 
                variant="subtitle1" 
                noWrap
                sx={{ 
                  fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive title size
                }}
              >
                {video.title}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default TrainerVideosGrid;