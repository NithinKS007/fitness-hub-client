import { ReactNode } from "react";

interface DashBoardBoxProps {
  content: string;
  number: number;
  icon: ReactNode; 
}

const DashBoardBox: React.FC<DashBoardBoxProps> = ({ content, number, icon }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md flex flex-col justify-between items-start w-full">
    <div>
      <p className="text-gray-600 font-medium mb-1">{content}</p>
    </div>
    <div className="flex justify-between items-center w-full mt-2"> 
      <p className="text-2xl font-bold">{number}</p>
      {icon} 
    </div>
  </div>
  
  );
};

export default DashBoardBox;
