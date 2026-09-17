import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { updateUserBlockStatus } from "../redux/admin/adminThunk";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { updateBlockStatus } from "../redux/admin/adminTypes";

const useUpdateBlockStatus = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleUpdateBlockStatus = async (status: updateBlockStatus) => {
    const { id, isBlocked } = status;
    try {
      const response = await dispatch(
        updateUserBlockStatus({ id, isBlocked })
      ).unwrap();

      showSuccessToast(
        response.data.isBlocked
          ? "You have successfully blocked the account."
          : "The account remains active and has not been blocked."
      );
    } catch (error) {
      console.log(`API Error ${error}`);
      showErrorToast(`${error}`);
    }
  };

  return { handleUpdateBlockStatus };
};

export default useUpdateBlockStatus;
