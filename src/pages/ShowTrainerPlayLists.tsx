import React from "react";
import { List, ListItem, ListItemText, Avatar, Box } from "@mui/material";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import { PlayList } from "../redux/content/contentTypes";
import { useNavigate } from "react-router-dom";

interface ShowTrainerPlayListProps {
  playListsData: PlayList[];
}

const ShowTrainerPlayLists: React.FC<ShowTrainerPlayListProps> = ({
  playListsData,
}) => {
  
  const navigate = useNavigate();
  const handlePlaylistClick = async (playListId: string, trainerId: string) => {
    navigate(`/video/${playListId}/${trainerId}`);
  };

  return (
    <Box
      sx={{
        padding: "15px",
        width: { xs: "100%", md: "79%" },
        margin: "0 auto",
        boxShadow: 1,
        borderRadius: 2,
      }}
    >
      <List sx={{ p: "1%" }}>
        {playListsData.map((playlist) => (
          <ListItem
            key={playlist._id}
            onClick={() =>
              handlePlaylistClick(playlist._id, playlist.trainerId)
            }
            sx={{
              py: 1,
              "&:hover": { bgcolor: "grey.100", cursor: "pointer" },
            }}
          >
            <Avatar variant="square" sx={{ width: 60, mr: 3 }} />
            <ListItemText
              primary={playlist.title}
              secondary={`${playlist.videoCount} videos`}
            />
            <PlaylistPlayIcon color="action" />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ShowTrainerPlayLists;
