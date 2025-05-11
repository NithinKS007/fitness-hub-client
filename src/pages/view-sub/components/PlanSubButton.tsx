import { Button } from "@mui/material";

interface SubscribeButtonProps {
  isLoading: boolean;
  handleSubscription: (event: React.SyntheticEvent<EventTarget>) => void;
}

const PlanSubButton: React.FC<SubscribeButtonProps> = ({handleSubscription,isLoading}) => {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{
        py: 1.5,
        borderRadius: 2,
        textTransform: "none",
        fontSize: "16px",
        fontWeight: 500,
        maxWidth: "300px",
        backgroundColor: "#2d3748",
        color: "#fff",
      }}
      onClick={handleSubscription}
      disabled={isLoading}
    >
      {isLoading ? "Processing..." : "Subscribe Now"}
    </Button>
  );
};

export default PlanSubButton;
