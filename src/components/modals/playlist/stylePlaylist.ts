export const styles = {
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    maxWidth: "600px",
    width: "100%",
    borderRadius: 3,
    p: 4,
    position: "relative",
    backgroundColor: "#fff",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    color: "#757575",
    "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
  },
  title: {
    fontWeight: 500,
    mb: 2,
    color: "#202124",
  },
  divider: {
    mb: 3,
    borderColor: "rgba(0, 0, 0, 0.12)",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  textField: {
    "& .MuiOutlinedInput-root": { borderRadius: 2 },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    mt: 4,
  },
  cancelButton: {
    mr: 2,
    backgroundColor: "#f1f3f4",
    color: "#202124",
    textTransform: "none",
    borderRadius: 2,
  },
  submitButton: {
    backgroundColor: "#1f2937",
    color: "white",
    textTransform: "none",
    borderRadius: 2,
  },
};