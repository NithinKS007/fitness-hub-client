import React from "react";
import AppAppBar from "../../components/TopNavBar";
import Footer from "../../components/Footer";
import WhatWeDo from "../../components/WhatWeDo";
import { useModal } from "../../hooks/useModal";
import useAuthForm from "../../hooks/useAuthForm";

const TrainerEntrollmentPage: React.FC = () => {
  const { handleOpen,handleClose,open } = useModal();

  const {handleTrainerAuth} = useAuthForm()

 return (
    <div className="flex flex-col min-h-screen">
      <AppAppBar />
      <WhatWeDo handleOpen={handleOpen} handleClose={handleClose} open={open} formik={handleTrainerAuth} />
      <Footer />
    </div>
  );
};

export default TrainerEntrollmentPage;
