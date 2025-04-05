import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";

interface ConfirmationModalDialogProps {
  open: boolean;
  content: string 
  onConfirm: () => void;
  onCancel: () => void;
  confirmText: string;
  cancelText: string;
  confirmColor:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  cancelColor:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
}

const ConfirmationModalDialog: React.FC<ConfirmationModalDialogProps> = ({
  open,
  content,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  confirmColor,
  cancelColor,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="confirmation-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color={cancelColor}>
          {cancelText}
        </Button>
        <Button onClick={onConfirm} color={confirmColor}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModalDialog;
