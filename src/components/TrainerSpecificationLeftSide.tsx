import { Box, Typography } from "@mui/material";

interface TrainerSpecificationLeftSideProps {
  certifications: { fileName: string; url: string }[];
  specializations: string[];
}

const styles = {
  outerBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: 1,
    borderRadius: 2,
    padding: "16px",
    width: { xs: "100%", md: "25%" },
    marginLeft: { xs: 0, md: 20 },
    marginBottom: { xs: 2, md: 0 },
  },
  listBox: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  specializationItem: {
    backgroundColor: "grey.100",
    padding: 1,
    marginBottom: 0.5,
    borderRadius: 1,
  },
  certificationItem: {
    marginBottom: 0.5,
  },
  certificationsBox: {
    mt: 2,
  },
};

const TrainerSpecificationLeftSide: React.FC<
  TrainerSpecificationLeftSideProps
> = ({ certifications, specializations }) => {
  return (
    <Box sx={styles.outerBox}>
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Interested in
        </Typography>
        <Box component="ul" sx={styles.listBox}>
          {specializations.length > 0 ? (
            specializations.map((item, index) => (
              <Box key={index} component="li" sx={styles.specializationItem}>
                {item}
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No specializations available
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={styles.certificationsBox}>
        <Typography variant="subtitle1" gutterBottom>
          Certifications
        </Typography>
        <Box component="ul" sx={styles.listBox}>
          {certifications.length > 0 ? (
            certifications.map((cert, index) => (
              <Box key={index} component="li" sx={styles.certificationItem}>
                <a href={cert.url} target="_blank" rel="noopener noreferrer">
                  <Typography variant="body2" color="text.primary">
                    🔹 {cert.fileName}
                  </Typography>
                </a>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No certifications available
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TrainerSpecificationLeftSide;
