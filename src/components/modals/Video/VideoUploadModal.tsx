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
import { FormHelperText } from "@mui/material";
import { styles } from "./styleVideo";

interface VideoUploadProps {
  open: boolean;
  onClose: () => void;
  formik: any;
  isEditMode: boolean;
  playLists: { id: string; title: string }[];
  handleVideoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleThumbnailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const VideoUpload = ({
  open,
  onClose,
  isEditMode,
  formik,
  playLists,
  handleVideoChange,
  handleThumbnailChange,
}: VideoUploadProps) => {
  console.log("formik values", formik);
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.modalContainer}>
        <Box sx={styles.headerContainer}>
          <Typography variant="h6">
            {isEditMode ? "EDIT VIDEO" : "ADD VIDEO"}
          </Typography>
          <IconButton onClick={onClose} sx={styles.closeButtonContainer}>
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
          sx={styles.textField}
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
          sx={styles.textField}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />

        <Box sx={styles.uploadSection}>
          <Button
            variant="outlined"
            component="label"
            startIcon={<VideoCameraBackIcon />}
            sx={styles.uploadButton}
          >
            {isEditMode ? "Change Video" : "Upload Video"}
            <input
              type="file"
              hidden
              accept="video/*"
              onChange={handleVideoChange}
            />
          </Button>
          <Typography sx={styles.fileName}>
            {formik.values.video?.name || ""}
          </Typography>
          {formik.errors.video && (
            <FormHelperText error sx={styles.errorText}>
              {formik.errors.video}
            </FormHelperText>
          )}
        </Box>

        <Box sx={styles.uploadSection}>
          <Button variant="outlined" component="label" sx={styles.uploadButton}>
            {isEditMode ? "Change Thumbnail" : "Upload Thumbnail"}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleThumbnailChange}
            />
          </Button>
          <Typography sx={styles.fileName}>
            {formik.values.thumbnail?.name || ""}
          </Typography>
          {formik.errors.thumbnail && (
            <FormHelperText error sx={styles.errorText}>
              {formik.errors.thumbnail}
            </FormHelperText>
          )}
        </Box>

        <FormControl
          fullWidth
          sx={styles.formControl}
          error={formik.touched.playLists && Boolean(formik.errors.playLists)}
        >
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
                  .filter((pl) => selected?.includes(pl?.id))
                  .map((pl) => pl?.title)
                  .join(", ")
              }
              MenuProps={styles.menuProps}
            >
              {playLists.map((pl) => (
                <MenuItem key={pl.id} value={pl.id}>
                  <Checkbox
                    checked={formik.values.playLists?.includes(pl.id)}
                  />
                  <ListItemText primary={pl.title} />
                </MenuItem>
              ))}
            </Select>
          ) : (
            <Typography color="text.secondary">
              No Playlists Available
            </Typography>
          )}
          {formik.touched.playLists && formik.errors.playLists && (
            <FormHelperText error>{formik.errors.playLists}</FormHelperText>
          )}
        </FormControl>

        <Box sx={styles.buttonContainer}>
          <Button variant="outlined" onClick={onClose} sx={styles.cancelButton}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting}
            sx={styles.submitButton}
          >
            {isEditMode ? "UPDATE" : "ADD"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default VideoUpload;
