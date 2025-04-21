import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import CloseIcon from "@mui/icons-material/Close";

interface VideoUploadProps {
  open: boolean;
  onClose: () => void;
  formik: any;
  isEditMode: boolean;
  playLists: { _id: string; title: string }[];
  handleVideoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleThumbnailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const modalBoxStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 500, md: 700 },
  maxHeight: "80vh",
  bgcolor: "white",
  borderRadius: 2,
  boxShadow: 24,
  p: { xs: 2, sm: 3, md: 4 },
  overflowY: "auto",
};

const headerBoxStyles = {
  display: "flex",
  justifyContent: "space-between",
  mb: 1,
};

const closeButtonStyles = {
  p: 0,
};

const textFieldStyles = {
  mb: 2,
};

const uploadBoxStyles = {
  mb: 2,
};

const uploadButtonStyles = {
  width: { xs: "100%", sm: "auto" },
};

const fileNameStyles = {
  mt: 1,
  wordBreak: "break-word",
};

const errorTextStyles = {
  mt: 1,
};

const formControlStyles = {
  mb: 2,
};

const noPlaylistsStyles = {
  mt: 1,
};

const menuPropsStyles = {
  PaperProps: {
    sx: {
      boxShadow: "none",
      border: "1px solid",
      borderColor: "grey.400",
      borderRadius: 2,
    },
  },
};

const buttonContainerStyles = {
  display: "flex",
  gap: 2,
  justifyContent: "flex-end",
  flexDirection: { xs: "column", sm: "row" },
};

const cancelButtonStyles = {
  width: { xs: "100%", sm: "auto" },
};

const submitButtonStyles = {
  width: { xs: "100%", sm: "auto" },
  backgroundColor: "black",
  color: "white",
};

const VideoUpload = ({
  open,
  onClose,
  isEditMode,
  formik,
  playLists,
  handleVideoChange,
  handleThumbnailChange,
}: VideoUploadProps) => {

  console.log("formik values",formik)
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalBoxStyles}>
        <Box sx={headerBoxStyles}>
          <Typography variant="h6">
            {isEditMode ? "Edit Video Content" : "Upload Video Content"}
          </Typography>
          <IconButton
            onClick={() => {
              onClose();
              formik.resetForm();
            }}
            sx={closeButtonStyles}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          sx={textFieldStyles}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />

        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          multiline
          rows={2}
          sx={textFieldStyles}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />

        <Box sx={uploadBoxStyles}>
          <Button
            variant="outlined"
            component="label"
            startIcon={<VideoCameraBackIcon />}
            sx={uploadButtonStyles}
          >
            {isEditMode ? "Change Video" : "Upload Video"}
            <input
              type="file"
              hidden
              accept="video/*"
              onChange={handleVideoChange}
            />
          </Button>
          <Typography sx={fileNameStyles}>
            {formik.values.video?.name || ""}
          </Typography>
          {formik.touched.video && formik.errors.video && (
            <Typography color="error" sx={errorTextStyles}>
              {formik.errors.video}
            </Typography>
          )}
        </Box>

        <Box sx={uploadBoxStyles}>
          <Button variant="outlined" component="label" sx={uploadButtonStyles}>
            {isEditMode ? "Change Thumbnail" : "Upload Thumbnail"}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleThumbnailChange}
            />
          </Button>
          <Typography sx={fileNameStyles}>
            {formik.values.thumbnail?.name || ""}
          </Typography>
          {formik.touched.thumbnail && formik.errors.thumbnail && (
            <Typography color="error" sx={errorTextStyles}>
              {formik.errors.thumbnail}
            </Typography>
          )}
        </Box>

        <FormControl fullWidth sx={formControlStyles}>
          {playLists.length > 0 ? (
            <Select
              labelId="playlist-select-label"
              id="playlist-select"
              multiple
              name="playLists"
              value={formik.values.playLists || []}
              onChange={(e) => {
                formik.setFieldValue("playLists", e.target.value);
              }}
              renderValue={(selected) =>
                playLists
                  .filter((pl) => selected?.includes(pl?._id))
                  .map((pl) => pl?.title)
                  .join(", ")
              }
              MenuProps={menuPropsStyles}
            >
              {playLists.map((pl) => (
                <MenuItem key={pl._id} value={pl._id}>
                  <Checkbox
                    checked={formik.values.playLists?.includes(pl._id) || false}
                  />
                  <ListItemText primary={pl.title} />
                </MenuItem>
              ))}
            </Select>
          ) : (
            <Typography color="text.secondary" sx={noPlaylistsStyles}>
              No Playlists Available
            </Typography>
          )}
          {formik.touched.playLists && formik.errors.playLists && (
            <Typography color="error" sx={errorTextStyles}>
              {formik.errors.playLists}
            </Typography>
          )}
        </FormControl>

        <Box sx={buttonContainerStyles}>
          <Button
            variant="outlined"
            onClick={() => {
              onClose();
              formik.resetForm();
            }}
            sx={cancelButtonStyles}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting}
            sx={submitButtonStyles}
          >
            {isEditMode ? "Update" : "Upload"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default VideoUpload;
