import React from "react";
import WhatWeDo from "../../components/WhatWeDo";
import { useModal } from "../../hooks/useModal";
import useAuthForm from "../../hooks/useAuthForm";
import GetACoachBanner from "../../assets/getACoachBanner.webp";

const TrainerEntrollmentPage: React.FC = () => {
  const { handleOpen, handleClose, open } = useModal();
  const { handleTrainerAuth } = useAuthForm();

  return (
    <>
        <WhatWeDo
         bannerImage={GetACoachBanner}
          handleOpen={handleOpen}
          handleClose={handleClose}
          open={open}
          formik={handleTrainerAuth}
        />
    </>
  );
};

export default TrainerEntrollmentPage;
