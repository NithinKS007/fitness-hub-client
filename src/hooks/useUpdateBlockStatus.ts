import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { updateUserBlockStatus } from "../redux/admin/adminThunk";
import { showErrorToast } from "../utils/toast";
import { updateBlockStatus } from "../redux/admin/adminTypes";

const useUpdateBlockStatus = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleUpdateBlockStatus = async (status:updateBlockStatus) => {

     const {_id,isBlocked} = status
    try {
      const response = await dispatch(updateUserBlockStatus({_id,isBlocked})).unwrap();
      const updatedEntity = response.data; 
      console.log(updatedEntity,"updated entity data")

    } catch (error) {
      console.log(`API Error ${error}`);
      showErrorToast(`${error}`);
    }
  };

  return handleUpdateBlockStatus;
}; 

export default useUpdateBlockStatus;
