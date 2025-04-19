import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { subscriptionValidationSchema } from "../utils/validationSchema";
import {
  addSubscription,
  deleteSubscription,
  getTrainerSubscriptions,
  updateSubscription,
  updateSubscriptionBlockStatus,
} from "../redux/subscription/subscriptionThunk";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { useModal } from "./useModal";
import { useSelector } from "react-redux";
import { updateBlockStatus } from "../redux/admin/adminTypes";

const useSubscription = () => {
  const { subscriptions, isLoading, error } = useSelector(
    (state: RootState) => state.subscription
  );

  const allSubPeriods = ["monthly", "yearly", "quarterly", "halfYearly"];
  const subscriptionPeriods = subscriptions.map((sub) => sub.subPeriod);

  const newSubs = allSubPeriods.filter(
    (sub) => !subscriptionPeriods.includes(sub)
  );

  const { handleClose: modalHandleClose, handleOpen, open } = useModal();

  const dispatch = useDispatch<AppDispatch>();
  const [isEditMode, setIsEditMode] = useState(false);

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
          _id: isEditMode ? editId : undefined,
          subPeriod: values.subPeriod,
          price: Number(values.price),
          durationInWeeks,
          sessionsPerWeek: values.sessionsPerWeek,
          totalSessions,
        };

        if (isEditMode && editId) {
          const response = await dispatch(
            updateSubscription({ subscriptionData })
          ).unwrap();
          showSuccessToast(`${response.message}`);
        } else {
          const response = await dispatch(
            addSubscription(subscriptionData)
          ).unwrap();
          showSuccessToast(`${response.message}`);
        }
        handleClose();
      } catch (error) {
        console.error("API Error:", error);
        showErrorToast(`${error}`);
      }
    },
  });
  const [currentSubPeriod, setCurrentSubPeriod] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    const durationInWeeks = calculateDurationInWeeks(formik.values.subPeriod);
    const totalSessions = durationInWeeks * formik.values.sessionsPerWeek;

    formik.setFieldValue("durationInWeeks", durationInWeeks);
    formik.setFieldValue("totalSessions", totalSessions);
  }, [formik.values.subPeriod, formik.values.sessionsPerWeek]);

  const fetchTrainerSubscriptions = async () => {
    await dispatch(getTrainerSubscriptions());
  };

  useEffect(() => {
    fetchTrainerSubscriptions();
  }, [dispatch]);

  const UpdateSubsBlockstatus = async (status: updateBlockStatus) => {
    const { _id, isBlocked } = status;
    try {
      const response = await dispatch(
        updateSubscriptionBlockStatus({ _id, isBlocked })
      ).unwrap();
      showSuccessToast(
        response.data.isBlocked
          ? "The subscription plan is not available to the user."
          : "The subscription plan is available."
      );
    } catch (error) {
      console.error("API Error:", error);
      showErrorToast(`${error}`);
    }
  };

  const deleteSubs = async (_id: string) => {
    try {
      const response = await dispatch(deleteSubscription({ _id })).unwrap();
      showSuccessToast(`${response.message}`);
    } catch (error) {
      console.error("API Error:", error);
      showErrorToast(`${error}`);
    }
  };

  const editSubscription = async (_id: string) => {
    const subscriptionToEdit = subscriptions.find((sub) => sub._id === _id);
    if (subscriptionToEdit) {
      setEditId(_id);
      setIsEditMode(true);
      setCurrentSubPeriod(subscriptionToEdit.subPeriod);
      formik.setValues({
        subPeriod: subscriptionToEdit.subPeriod,
        price: subscriptionToEdit.price,
        durationInWeeks: subscriptionToEdit.durationInWeeks,
        sessionsPerWeek: subscriptionToEdit.sessionsPerWeek,
        totalSessions: subscriptionToEdit.totalSessions,
      });
      handleOpen();
    }
  };
  const handleClose = () => {
    modalHandleClose();
    formik.resetForm();
    setIsEditMode(false);
    setEditId(null);
  };

  const subPeriodsForForm =
    isEditMode && currentSubPeriod ? [...allSubPeriods] : newSubs;

  return {
    UpdateSubsBlockstatus,
    deleteSubs,
    editSubscription,

    subscriptions,
    isLoading,
    error,

    subPeriods: subPeriodsForForm,
    formik,
    isEditMode,

    handleOpen,
    handleClose,
    open,
  };
};

export default useSubscription;
