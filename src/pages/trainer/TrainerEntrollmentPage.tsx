import React from "react";
import Footer from "../../components/Footer";
import WhatWeDo from "../../components/WhatWeDo";
import { useModal } from "../../hooks/useModal";
import useAuthForm from "../../hooks/useAuthForm";
import UserLayouts from "../../layouts/ULwithNavFooter";

const TrainerEntrollmentPage: React.FC = () => {
  const { handleOpen, handleClose, open } = useModal();
  const { handleTrainerAuth } = useAuthForm();

  return (
    <>
      <UserLayouts>
        <WhatWeDo
          handleOpen={handleOpen}
          handleClose={handleClose}
          open={open}
          formik={handleTrainerAuth}
        />
      </UserLayouts>
    </>
  );
};

export default TrainerEntrollmentPage;
