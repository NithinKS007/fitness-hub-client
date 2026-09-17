export const styles = {
  modalContainer: {
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
  },

  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    mb: 1,
  },

  closeButtonContainer: {
    p: 0,
  },

  textField: {
    mb: 2,
  },

  uploadSection: {
    mb: 2,
  },

  uploadButton: {
    width: { xs: "100%", sm: "auto" },
  },

  fileName: {
    mt: 1,
    wordBreak: "break-word",
  },

  errorText: {
    mt: 1,
  },

  formControl: {
    mb: 2,
  },

  menuProps: {
    PaperProps: {
      sx: {
        boxShadow: "none",
        border: "1px solid",
        borderColor: "grey.400",
        borderRadius: 2,
      },
    },
  },

  buttonContainer: {
    display: "flex",
    gap: 2,
    justifyContent: "flex-end",
    flexDirection: { xs: "column", sm: "row" },
  },

  cancelButton: {
    width: { xs: "100%", sm: "auto" },
  },

  submitButton: {
    width: { xs: "100%", sm: "auto" },
    backgroundColor: "#1f2937",
    color: "white",
  },
};
