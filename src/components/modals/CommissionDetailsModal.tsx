import { Box, Modal, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ModalData {
  providedBy: { label: string; value: string }[];
  takenBy: { label: string; value: string }[];
  financial: { label: string; value: string }[];
}

interface CommissionDetailsModalProps {
  open: boolean;
  onClose: () => void;
  modalData: ModalData | null;
}

const styles = {
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 2,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
    width: "100%",
    maxWidth: 1000,
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px",
    overflowY: "auto",
    position: "relative",
  },
  title: {
    fontWeight: 600,
    color: "#1f2937",
    marginBottom: "16px",
    textAlign: "center",
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: "8px",
  },
  sectionWrapper: {
    display: "flex",
    gap: "32px",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-between",
  },
  section: {
    flex: "1",
    minWidth: "250px",
    maxWidth: "300px",
    backgroundColor: "#f9fafb",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  sectionTitle: {
    fontWeight: 500,
    color: "#1f2937",
    marginBottom: "8px",
  },
  detailRow: {
    display: "flex",
    gap: "12px",
    marginBottom: "8px",
  },
  label: {
    color: "#4b5563",
    minWidth: "100px",
  },
  value: {
    color: "#111827",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "24px",
  },
  button: {
    backgroundColor: "#1f2937",
    color: "#ffffff",
    textTransform: "none",
    padding: "8px 16px",
    "&:hover": { backgroundColor: "#374151" },
  },
  closeButton: {
    position: "absolute",
    top: "16px",
    right: "16px",
    color: "#1f2937",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
};

const CommissionDetailsModal = ({
  open,
  onClose,
  modalData,
}: CommissionDetailsModalProps) => {
  const sections = [
    { title: "Trainer Details", data: modalData?.providedBy },
    { title: "User Details", data: modalData?.takenBy },
    { title: "Financial Details", data: modalData?.financial },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="commission-details-modal"
      sx={styles.modal}
    >
      <Box sx={styles.container}>
        <IconButton onClick={onClose} sx={styles.closeButton}>
          <CloseIcon />
        </IconButton>

        <Typography
          id="commission-details-modal"
          variant="h5"
          sx={styles.title}
        >
          Commission Details
        </Typography>

        {modalData && (
          <Box sx={styles.sectionWrapper}>
            {sections.map(
              (section, index) =>
                section.data && (
                  <Box key={index} sx={styles.section}>
                    <Typography variant="h6" sx={styles.sectionTitle}>
                      {section.title}
                    </Typography>
                    {section.data.map((item, idx) => (
                      <Box key={idx} sx={styles.detailRow}>
                        <Typography sx={styles.label}>{item.label}:</Typography>
                        <Typography sx={styles.value}>{item.value}</Typography>
                      </Box>
                    ))}
                  </Box>
                )
            )}
          </Box>
        )}

        <Box sx={styles.buttonContainer}>
          <Button onClick={onClose} variant="contained" sx={styles.button}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CommissionDetailsModal;
