export const styles = {
  modalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: 500, md: 1000 },
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
    mb: 2,
  },
  closeButton: {
    p: 1,
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  select: {
    mb: 1,
  },
  exerciseContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
    mt: 1,
  },
  workoutList: {
    mt: 3,
    mb: 2,
  },
  noWorkouts: {
    mt: 1,
  },
  workoutRow: {
    display: "flex",
    alignItems: "flex-start",
    mb: 2,
    gap: 1,
  },
  exerciseText: {
    flex: 1,
    mt: 1.5,
  },
  kgField: {
    minWidth: 100,
  },
  repsField: {
    minWidth: 100,
  },
  timeField: {
    minWidth: 120,
  },
  addButton: {
    mt: 1,
  },
  deleteButton: {
    mt: 1,
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
  saveButton: {
    width: { xs: "100%", sm: "auto" },
    backgroundColor: "#1f2937",
    color: "white",
  },
  calendarIcon: {
    fontSize: "large",
  },
};
