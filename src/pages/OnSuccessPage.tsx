import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../redux/store';
import { getSubscribedDetails} from '../redux/subscription/subscriptionThunk';
import OnSuccess from '../components/OnSuccess';

const OnSuccessPage: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state: any) => state.subscription);

  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get('sessionId');
    if (sessionId) {
      dispatch(getSubscribedDetails({ sessionId }))
    } else {
      navigate("/");
    }
  }, [location, dispatch, navigate]);

  return <OnSuccess isLoading={isLoading} error={error} />;
};

export default OnSuccessPage;