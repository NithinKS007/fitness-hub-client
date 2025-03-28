import TrainerAuthForm from "./TrainerAuthForm";

interface EnrollCoachProps {
  handleOpen: () => void;
  handleClose: () => void;
  open: boolean;
  formik: any;
}

const EnrollCoach: React.FC<EnrollCoachProps> = ({
  handleOpen,
  handleClose,
  open,
  formik,
}) => {
  return (
    <section
      className="bg-gray-200 text-black h-140
flex items-center justify-center px-6"
    >
      <div
        className="container mx-auto flex flex-col 
  md:flex-row items-center justify-center gap-12"
      >
        <div className="md:w-1/2 text-center space-y-6 animate-fade-in">
          <h1
            className="text-5xl md:text-6xl lg:text-7xl 
      font-extrabold leading-tight tracking-tight text-black"
          >
            Become a <span className="text-gray-800">Transformative Coach</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Join our elite team of fitness experts, inspire others to reach their goals, 
            and grow your coaching career with a supportive community and cutting-edge tools.
          </p>
          <button
            className="bg-black
       text-white font-semibold py-3 px-8 rounded-full
        transition duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            onClick={handleOpen}
          >
            ENROLL AS A COACH
          </button>
        </div>
      </div>
      <TrainerAuthForm handleClose={handleClose} open={open} formik={formik} />
    </section>
  );
};

export default EnrollCoach;