import toast from "react-hot-toast";

const toastOptions = {
  duration: 4000,
  style: {
    maxWidth: "400px",
    width: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    color: "#fff",
    padding: "12px 16px",
    borderRadius: "24px",
    fontSize: "14px",
    fontFamily: "Roboto, sans-serif",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    letterSpacing: "0.5px",
    opacity: 1,
    transition: "opacity 0.3s ease",
  },
};

export const showSuccessToast = (message: string): void => {
  toast.success(message, toastOptions);
};

export const showErrorToast = (message: string): void => {
  toast.error(message, toastOptions);
};
