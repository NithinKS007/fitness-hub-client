import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Typography,
} from "@mui/material";

const styles = {
  label: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#030303",
  },
  selectInput: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: 500,
    color: "#030303",
    padding: "10px 14px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
  },
  menu: {
    backgroundColor: "#fff",
    borderRadius: "4px",
    maxHeight: 200,
    mt: 1,
  },
  noPlaylistsText: {
    textAlign: "center",
    padding: "10px",
    fontSize: "14px",
    color: "#606060",
  },
  formControl: {
    minWidth: 200,
    maxWidth: 300,
    width: "100%",
  },
};
interface FilterItem {
  playListId: string;
  value: string;
}

interface VideoFilterProps {
  filter: FilterItem[];
  selectedFilter: string[];
  handleFilterChange: (value: string[]) => void;
}

const VideoFilter: React.FC<VideoFilterProps> = ({
  filter,
  selectedFilter,
  handleFilterChange,
}) => {
  return (
    <FormControl sx={styles.formControl}>
      <InputLabel sx={styles.label}>Filter by</InputLabel>
      <Select
        multiple
        label="Filter by"
        value={selectedFilter}
        onChange={(e) => handleFilterChange(e.target.value as string[])}
        input={<OutlinedInput label="Filter by" sx={styles.selectInput} />}
        renderValue={(selected) =>
          selected.length > 0
          ? selected
              .map((id) => filter.find((item) => item.playListId === id)?.value)
              .filter(Boolean)
              .join(", ")
          : "Select filters"
        }
        MenuProps={{ PaperProps: { sx: styles.menu } }}
      >
        {filter.length === 0 ? (
          <MenuItem disabled>
            <Typography sx={styles.noPlaylistsText}>
              No playlists available
            </Typography>
          </MenuItem>
        ) : (
          filter.map((option) => (
            <MenuItem key={option.playListId} value={option.playListId}>
              <Checkbox checked={selectedFilter.includes(option.playListId)} />
              <ListItemText primary={option.value} sx={styles.label} />
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
};

export default VideoFilter;
