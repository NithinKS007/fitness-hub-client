import { People } from "@mui/icons-material";
interface DashBoardBoxProps {
  content: string;
  number: number;
}
const DashBoardBox: React.FC<DashBoardBoxProps> = ({ content, number }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md 
    flex justify-between items-center w-full">
      <div>
        <p className="text-gray-600 font-medium mb-1">{content}</p>
        <p className="text-2xl font-bold">{number}</p>
      </div>
      <div className="text-right">
        <div className="flex items-center justify-end">
          <People className="text-gray-600 mr-1" />
        </div>
      </div>
    </div>
  );
};

export default DashBoardBox;
