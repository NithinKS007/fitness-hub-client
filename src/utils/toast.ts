import { toast } from "react-toastify";

export const showSuccessToast = (message: string): void => {
  toast.success(message);
};

export const showErrorToast = (message: string): void => {
  toast.error(message);
};
