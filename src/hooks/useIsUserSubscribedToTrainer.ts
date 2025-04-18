import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const useIsUserSubscribedToTrainer = (trainerId: string): boolean => {
  return useSelector(
    (state: RootState) =>
      state.subscription.isSubscribedToTheTrainer?.[trainerId]?.isSubscribed ??
      false
  );
};
export default useIsUserSubscribedToTrainer;