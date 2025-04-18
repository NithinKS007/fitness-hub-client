import { Box, Modal, Typography, Button } from "@mui/material";

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
    maxWidth: 600,
    maxHeight: "90vh",
    overflowY: "auto",
    p: 4,
    mx: 2,
    position: "relative",
    fontFamily: "'Roboto', sans-serif",
  },
  title: {
    fontWeight: 600,
    color: "#1f2937",
    mb: 3,
    textAlign: "center",
    borderBottom: "1px solid #e5e7eb",
    pb: 2,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  sectionTitle: {
    fontWeight: 500,
    color: "#1f2937",
  },
  detailBox: {
    backgroundColor: "#f9fafb",
    p: 2,
    borderRadius: 1,
  },
  detailRow: {
    display: "flex",
    gap: 2,
    mb: 1,
    "&:last-child": { mb: 0 },
  },
  label: {
    minWidth: 100,
    color: "#4b5563",
  },
  value: {
    color: "#111827",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    mt: 4,
  },
  button: {
    backgroundColor: "#1f2937",
    color: "#ffffff",
    textTransform: "none",
    px: 4,
    py: 1,
    "&:hover": { backgroundColor: "#374151" },
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
        <Typography
          id="commission-details-modal"
          variant="h5"
          sx={styles.title}
        >
          Commission Details
        </Typography>

        {modalData && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {sections.map(
              (section, index) =>
                section.data && (
                  <Box key={index} sx={styles.section}>
                    <Typography variant="h6" sx={styles.sectionTitle}>
                      {section.title}
                    </Typography>
                    <Box sx={styles.detailBox}>
                      {section.data.map((item, idx) => (
                        <Box key={idx} sx={styles.detailRow}>
                          <Typography sx={styles.label}>
                            {item.label}:
                          </Typography>
                          <Typography sx={styles.value}>
                            {item.value}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )
            )}
          </Box>
        )}

        <Box sx={styles.buttonContainer}>
          <Button
            onClick={onClose}
            variant="contained"
            sx={styles.button}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CommissionDetailsModal;