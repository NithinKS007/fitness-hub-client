import React from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

const HomePage: React.FC = () => {
  const steps = [
    {
      title: "Create an Account",
      description: "Sign up and provide your details to get started.",
      icon: <PersonAddIcon fontSize="large" />,
    },
    {
      title: "Find Your Trainer",
      description: "Discover trainers tailored to your fitness goals.",
      icon: <SearchIcon fontSize="large" />,
    },
    {
      title: "Start Training",
      description: "Subscribe, train, and track your progress.",
      icon: <FitnessCenterIcon fontSize="large" />,
    },
  ];

  const programs = [
    {
      title: "Cardio Strength",
      description: "Boost endurance and power with dynamic workouts.",
      bgColor: "bg-white",
    },
    {
      title: "Fat Loss",
      description: "Shed pounds with targeted exercises and diet plans.",
      bgColor: "bg-white",
    },
    {
      title: "Muscle Gain",
      description: "Build strength and mass with expert guidance.",
      bgColor: "bg-white",
    },
    {
      title: "Nutrition",
      description: "Fuel your body with personalized meal plans.",
      bgColor: "bg-white",
    },
  ];

  return (
    <>
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
              Achieve Your <span className="text-gray-800">Dream Physique</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl">
              Join a community of fitness enthusiasts, get expert guidance, and
              track your journey to a healthier you.
            </p>
            <button
              className="bg-black
             text-white font-semibold py-3 px-8 rounded-full
              transition duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 text-black py-20 px-6">
        <div className="container mx-auto">
          <h2
            className="text-4xl md:text-5xl font-bold text-center mb-12 
          animate-fade-in text-black"
          >
            Our <span className="text-gray-800">Programs</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className={`${program.bgColor} p-6 rounded-xl shadow-md 
                hover:shadow-lg transform hover:-translate-y-2 transition 
                duration-300 border border-gray-300`}
              >
                <h3 className="text-2xl font-semibold text-black mb-3">
                  {program.title}
                </h3>
                <p className="text-gray-700">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white text-black py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in text-black">
              How It <span className="text-gray-800">Works</span>
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
              Simple steps to kickstart your fitness journey with us.
            </p>
          </div>

          <div
            className="relative flex flex-col md:flex-row items-center 
          justify-between gap-12"
          >
            {steps.map((step, index) => (
              <div key={index} className="relative flex-1 text-center group">
                <div
                  className="w-20 h-20 mx-auto bg-black rounded-full flex 
                items-center justify-center text-white mb-6 shadow-lg 
                group-hover:scale-110 transition duration-300"
                >
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-700">{step.description}</p>
                {index < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-10 
                  left-1/2 w-full h-1 bg-gray-400 -z-10"
                  >
                    <div
                      className="absolute w-4 h-4 bg-black 
                    rounded-full -left-2 top-1/2 transform -translate-y-1/2"
                    ></div>
                    <div
                      className="absolute w-4 h-4 bg-black 
                    rounded-full -right-2 top-1/2 transform -translate-y-1/2"
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;