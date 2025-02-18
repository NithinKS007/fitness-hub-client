import React from "react";
import UserLayouts from "../layouts/ULwithNavFooter";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <UserLayouts><div className=" min-h-screen">Home page for user</div></UserLayouts>
    </div>
  );
};

export default HomePage;
