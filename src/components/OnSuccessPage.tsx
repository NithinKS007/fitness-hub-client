import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../redux/store';
import { getSubscribedDetails, getUserSubscriptionsData} from '../redux/subscription/subscriptionThunk';
import { useSelector } from 'react-redux';

const OnSuccessPage:React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()

  const {isLoading, error } = useSelector((state: any) => state.subscription);

  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get('sessionId');
    console.log("stripe details",sessionId)
    if(sessionId) {
      dispatch(getSubscribedDetails(sessionId)).then(()=>dispatch(getUserSubscriptionsData()))
    } else {
      navigate("/")
    }

  }, [location,dispatch,navigate]);

  if (isLoading) {
    return <div>Loading subscription details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      YOUR PAYMENT HAS BEEN SUCCESSFULL
    </div>
  )
}

export default OnSuccessPage
