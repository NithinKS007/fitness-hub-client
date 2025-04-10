import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { getSubscribedDetails } from "../redux/subscription/subscriptionThunk";
import OnSuccess from "../components/OnSuccess";
import LoadingSpinner from "../components/LoadingSpinner";
import Error from "../components/Error";

const OnSuccessPage: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state: RootState) => state.subscription);

  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get("sessionId");
    if (sessionId) {
      dispatch(getSubscribedDetails({ sessionId }));
    } else {
      navigate("/");
    }
  }, [location, dispatch, navigate]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Error message={error} />;

  return <OnSuccess />;
};

export default OnSuccessPage;
