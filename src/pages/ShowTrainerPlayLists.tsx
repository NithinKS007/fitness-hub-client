import React from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  Paper,
  Divider
} from '@mui/material';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';

// Dummy playlist data (unchanged)
const playlistsData = [
  { id: 1, title: "Beginner Workouts", videoCount: 5, thumbnail: "https://via.placeholder.com/120x90.png?text=Beginner" },
  { id: 2, title: "Intermediate Training", videoCount: 8, thumbnail: "https://via.placeholder.com/120x90.png?text=Intermediate" },
  { id: 3, title: "Advanced Program", videoCount: 6, thumbnail: "https://via.placeholder.com/120x90.png?text=Advanced" },
  { id: 4, title: "Yoga Sessions", videoCount: 4, thumbnail: "https://via.placeholder.com/120x90.png?text=Yoga" },
  { id: 5, title: "Cardio Blast", videoCount: 7, thumbnail: "https://via.placeholder.com/120x90.png?text=Cardio" },
  { id: 6, title: "Strength Building", videoCount: 5, thumbnail: "https://via.placeholder.com/120x90.png?text=Strength" },
];

const ShowTrainerPlayLists = () => {
  const handlePlaylistClick = (playlistId) => {
    console.log(`Clicked playlist ${playlistId}`);
    // Example: navigate(`/playlist/${playlistId}`);
  };

  return (
    <Box 
      sx={{ 
        mt: 4, 
        mb: 4, 
        mx: { xs: 2, sm: 4, md: 10, lg: 20 }, // Responsive horizontal margins
        width: 'auto', 
      }}
    >
      <Paper elevation={3}>
        {/* Header */}
        <Box 
          sx={{ 
            p: { xs: 1, sm: 2 }, // Smaller padding on mobile
            bgcolor: '#f5f5f5',
          }}
        >
          <Typography 
            variant="h5" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '1.25rem', sm: '1.5rem' }, // Adjust font size for smaller screens
            }}
          >
            Trainer Playlists
          </Typography>
          <Typography 
            variant="subtitle2" 
            color="text.secondary"
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.875rem' }, // Responsive subtitle
            }}
          >
            {playlistsData.length} playlists available
          </Typography>
        </Box>

        {/* Playlist List */}
        <List sx={{ p: 0 }}>
          {playlistsData.map((playlist, index) => (
            <React.Fragment key={playlist.id}>
              <ListItem 
                onClick={() => handlePlaylistClick(playlist.id)}
                sx={{ 
                  '&:hover': { 
                    bgcolor: '#f0f0f0',
                    cursor: 'pointer' 
                  },
                  py: { xs: 1, sm: 2 }, // Adjust vertical padding for smaller screens
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    variant="square"
                    src={playlist.thumbnail}
                    sx={{ 
                      width: { xs: 80, sm: 100, md: 120 }, // Scale thumbnail size
                      height: { xs: 60, sm: 75, md: 90 }, 
                      mr: { xs: 1, sm: 2 }, // Responsive margin
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography 
                      variant="subtitle1"
                      sx={{ 
                        fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive title
                      }}
                    >
                      {playlist.title}
                    </Typography>
                  }
                  secondary={
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }, // Responsive secondary text
                      }}
                    >
                      {playlist.videoCount} videos
                    </Typography>
                  }
                />
                <PlaylistPlayIcon 
                  sx={{ 
                    color: 'grey.500',
                    fontSize: { xs: '1.25rem', sm: '1.5rem' }, // Responsive icon size
                    ml: 1,
                  }} 
                />
              </ListItem>
              {index < playlistsData.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ShowTrainerPlayLists;