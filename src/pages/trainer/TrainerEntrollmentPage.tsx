import React from "react";
import EntrollCoach from "../../components/EntrollCoach";
import { useModal } from "../../hooks/useModal";
import useAuthForm from "../../hooks/useAuthForm";

const TrainerEntrollmentPage: React.FC = () => {
  const { handleOpen, handleClose, open } = useModal();
  const { handleTrainerAuth } = useAuthForm();

  return (
    <>
        <EntrollCoach
          handleOpen={handleOpen}
          handleClose={handleClose}
          open={open}
          formik={handleTrainerAuth}
        />
    </>
  );
};

export default TrainerEntrollmentPage;
