import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { useFormik } from "formik";
import { subscriptionValidationSchema } from "../utils/validationSchema";
import {
  addSubscription,
  getTrainerSubscriptions,
} from "../redux/subscription/subscriptionThunk";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { useModal } from "./useModal";
import { useSelector } from "react-redux";

const useSubscription = () => {
  const planTypes = ["premium", "silver", "gold"];
  const subPeriods = ["monthly", "yearly", "quarterly", "halfYearly"];
  const { handleClose } = useModal();

  const dispatch = useDispatch<AppDispatch>();

  const calculateDurationInWeeks = (period: string) => {
    switch (period) {
      case "monthly":
        return 4;
      case "quarterly":
        return 12;
      case "halfYearly":
        return 26;
      case "yearly":
        return 52;
      default:
        return 0;
    }
  };

  const formik = useFormik({
    initialValues: {
      planType: "",
      subPeriod: "",
      price: 0,
      durationInWeeks: 0,
      sessionsPerWeek: 0,
      totalSessions: 0,
    },
    validationSchema: subscriptionValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const durationInWeeks = calculateDurationInWeeks(values.subPeriod);
        const totalSessions = durationInWeeks * values.sessionsPerWeek;

        const subscriptionData = {
          planType: values.planType,
          subPeriod: values.subPeriod,
          price: Number(values.price),
          durationInWeeks,
          sessionsPerWeek: values.sessionsPerWeek,
          totalSessions,
        };

        const response = await dispatch(
          addSubscription(subscriptionData)
        ).unwrap();
        handleClose();
        console.log("Subscription added:", response);
        formik.resetForm();
        showSuccessToast(`${response.message}`);
      } catch (error) {
        console.error("API Error:", error);
        showErrorToast(`${error}`);
      }
    },
  });

  useEffect(() => {
    const durationInWeeks = calculateDurationInWeeks(formik.values.subPeriod);
    const totalSessions = durationInWeeks * formik.values.sessionsPerWeek;

    formik.setFieldValue("durationInWeeks", durationInWeeks);
    formik.setFieldValue("totalSessions", totalSessions);
  }, [formik.values.subPeriod, formik.values.sessionsPerWeek]);

  //fetch subscriptions data
  const fetchTrainerSubscriptions = async () => {
    await dispatch(getTrainerSubscriptions());
  };

  useEffect(() => {
    fetchTrainerSubscriptions();
  }, [dispatch]);

  const { subscriptions, isLoading, error } = useSelector(
    (state: RootState) => state.subscription
  );


  const UpdateSubsBlockstatus = async () => {

  };

  const deleteSubscription = async (_id: string) => {

  };

  const editSubscription = async (_id: string) => {
    
  };


  return {
    UpdateSubsBlockstatus,
    deleteSubscription,
    editSubscription,

    subscriptions,
    isLoading, 
    error, 

    planTypes, 
    subPeriods, 
    formik, 
  };
};

export default useSubscription;
