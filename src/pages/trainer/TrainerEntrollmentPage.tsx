import React from "react";
import WhatWeDo from "../../components/WhatWeDo";
import { useModal } from "../../hooks/useModal";
import useAuthForm from "../../hooks/useAuthForm";

const TrainerEntrollmentPage: React.FC = () => {
  const { handleOpen, handleClose, open } = useModal();
  const { handleTrainerAuth } = useAuthForm();

  return (
    <>
        <WhatWeDo
          handleOpen={handleOpen}
          handleClose={handleClose}
          open={open}
          formik={handleTrainerAuth}
        />
    </>
  );
};

export default TrainerEntrollmentPage;
