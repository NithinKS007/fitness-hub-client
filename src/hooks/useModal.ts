import { useState } from 'react';

export const useModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    console.log("handleOpen called");
    setOpen(true);
   console.log("opening",open) 
  };

  const handleClose = () => {
    console.log("handleClose called");
    setOpen(false);
  };

  return {
    open,
    handleOpen,
    handleClose
  };
};
