export const styles = {
  modalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: 500, md: 650 },
    maxHeight: "80vh",
    bgcolor: "white",
    borderRadius: 2,
    boxShadow: 24,
    p: { xs: 2, sm: 3, md: 4 },
    overflowY: "auto",
  },
  headerBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
  },
  typography: {
    display: "flex",
    alignItems: "center",
    font: "message-box",
  },
  closeButton: {
    p: 0,
  },
  textField: {
    mb: 2,
  },
  selectBox: {
    mb: 2,
  },
  menuProps: {
    PaperProps: {
      sx: {
        boxShadow: "none",
        border: "1px solid",
        borderColor: "grey.400",
        borderRadius: 2,
        maxHeight: "200px",
        marginTop: 1,
      },
    },
  },
  menuItem: {
    height: "36px",
  },
  helperText: {
    m: 0,
    ml: "14px",
    mt: "3px",
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
