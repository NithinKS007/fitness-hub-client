import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from '@mui/material';

// Dummy data for the main video and related videos (unchanged)
const mainVideo = {
  id: 1,
  title: "Strength Basics",
  description: "Learn the fundamentals of strength training",
  url: "https://via.placeholder.com/640x360.png?text=Main+Video",
};

const relatedVideos = [
  { id: 2, title: "Cardio Intro", duration: "20:15", thumbnail: "https://via.placeholder.com/120x90.png?text=Cardio" },
  { id: 3, title: "Yoga Starter", duration: "18:40", thumbnail: "https://via.placeholder.com/120x90.png?text=Yoga" },
  { id: 4, title: "HIIT Basics", duration: "22:45", thumbnail: "https://via.placeholder.com/120x90.png?text=HIIT" },
  { id: 5, title: "Core Strength", duration: "25:10", thumbnail: "https://via.placeholder.com/120x90.png?text=Core" },
  { id: 6, title: "Leg Day", duration: "28:20", thumbnail: "https://via.placeholder.com/120x90.png?text=Legs" },
  { id: 7, title: "Arm Workout", duration: "19:55", thumbnail: "https://via.placeholder.com/120x90.png?text=Arms" },
];

const VideoPlayerPage = () => {
  const handleRelatedVideoClick = (videoId) => {
    console.log(`Clicked related video ${videoId}`);
    // Add your navigation logic here, e.g., update main video or navigate
  };

  return (
    <Box 
      sx={{ 
        maxWidth: 1200, 
        mx: 'auto', 
        p: { xs: 1, sm: 2 }, // Responsive padding
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, // Stack on mobile, side-by-side on desktop
        gap: 2, // Space between main video and related videos
      }}
    >
      {/* Main Video Section */}
      <Box
        sx={{
          flex: { xs: '1 1 100%', md: '1 1 66%' }, // Full width on mobile, ~2/3 on desktop
          maxWidth: { xs: '100%', md: '800px' }, // Cap width for larger screens
        }}
      >
        <Card>
          <CardMedia
            component="img" // Replace with video player in real implementation
            image={mainVideo.url}
            alt={mainVideo.title}
            sx={{ 
              height: { xs: 200, sm: 300, md: 400 }, // Responsive height
              objectFit: 'cover',
            }}
          />
          <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} // Responsive title
            >
              {mainVideo.title}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }} // Responsive description
            >
              {mainVideo.description}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Related Videos Section */}
      <Box
        sx={{
          flex: { xs: '1 1 100%', md: '1 1 33%' }, // Full width on mobile, ~1/3 on desktop
          maxWidth: { xs: '100%', md: '400px' }, // Cap width for larger screens
        }}
      >
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} // Responsive header
        >
          Related Videos
        </Typography>
        <List sx={{ p: 0 }}>
          {relatedVideos.map((video, index) => (
            <React.Fragment key={video.id}>
              <ListItem
                onClick={() => handleRelatedVideoClick(video.id)}
                sx={{
                  '&:hover': {
                    bgcolor: '#f0f0f0',
                    cursor: 'pointer',
                  },
                  py: { xs: 1, sm: 1.5 }, // Responsive vertical padding
                }}
              >
                <ListItemAvatar>
                  <Box sx={{ position: 'relative' }}>
                    <Avatar
                      variant="square"
                      src={video.thumbnail}
                      sx={{ 
                        width: { xs: 100, sm: 120 }, // Responsive thumbnail width
                        height: { xs: 75, sm: 90 }, // Responsive thumbnail height
                        mr: { xs: 1, sm: 2 }, // Responsive margin
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        position: 'absolute',
                        bottom: 4,
                        right: 8,
                        bgcolor: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        px: 0.5,
                        borderRadius: 1,
                        fontSize: { xs: '0.7rem', sm: '0.75rem' }, // Responsive duration text
                      }}
                    >
                      {video.duration}
                    </Typography>
                  </Box>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography 
                      variant="subtitle1" 
                      noWrap
                      sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} // Responsive title
                    >
                      {video.title}
                    </Typography>
                  }
                />
              </ListItem>
              {index < relatedVideos.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default VideoPlayerPage;