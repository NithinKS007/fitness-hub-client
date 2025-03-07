import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { cancelSubscriptionUser, getUserSubscriptionsData } from "../../redux/subscription/subscriptionThunk";
import ReuseTable from "../../components/ReuseTable";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import ShimmerTableLoader from "../../components/ShimmerTable";
import SearchBarTable from "../../components/SearchBarTable";
import Filter from "../../components/Filter";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface TableColumn {
  label: string;
  field: string;
}
interface SortOption {
  value: string;
}

interface FilterOption {
  value: string;
}
const columns: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Image", field: "profilePic" },
  { label: "Name", field: "name" },
  { label: "Email", field: "email" },
  { label: "Availability", field: "isBlocked" },
  { label: "Price", field: "price" },
  { label: "Start Date", field: "startDate" },
  { label: "Expiry Date", field: "endDate" },
  { label: "Subscription status", field: "isActive" },
  { label: "Subscription Period", field: "subPeriod" },
  { label: "Duration in Weeks", field: "durationInWeeks" },
  { label: "Sessions Per Week", field: "sessionsPerWeek" },
  { label: "Total Sessions", field: "totalSessions" },
  { label: "Action", field: "actions" },
];

const sort: SortOption[] = [
  { value: "10000 - 25000" },
  { value: "25000 - 50000" },
  { value: "50000 - 75000" },
  { value: "75000 - 100000" },
  { value: "above - 100000" },
];
const filter: FilterOption[] = [
  { value: "All" },
  { value: "Active" },
  { value: "Inactive" },
  { value: "Monthly" },
  { value: "Quarterly" },
  { value: "Yearly" },
  { value: "Half Yearly" },
];

const UserSubscriptionsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<string | null>(null);

  const fetchUserSubscriptionsData = async () => {
    dispatch(getUserSubscriptionsData());
  };

  useEffect(() => {
    fetchUserSubscriptionsData();
  }, [dispatch]);

  const userSubscribedPlans = useSelector(
    (state: RootState) => state.subscription.userSubscribedTrainerPlans
  );

  const { isLoading, error } = useSelector(
    (state: RootState) => state.subscription
  );
  console.log("my plans", userSubscribedPlans);

  const handleCancelSubscriptionsUser = async(stripeSubscriptionId: string, action: string,userSubCollectionId:string) => {
    console.log("Cancel action:", action, "for subscription", stripeSubscriptionId);

    const response = await dispatch(cancelSubscriptionUser({stripeSubscriptionId,action,userSubCollectionId})).unwrap()

    console.log("response received for cancellation",response)
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, subscriptionId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedSubscriptionId(subscriptionId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSubscriptionId(null);
  };

  const fetchedUserSubscriptionsData =
    userSubscribedPlans.length > 0
      ? userSubscribedPlans.map((sub, index) => {
          const name = `${sub.subscribedTrainerDetails?.fname?.charAt(0).toUpperCase() + sub.subscribedTrainerDetails?.fname?.slice(1).toLowerCase()} ${sub.subscribedTrainerDetails?.lname?.charAt(0).toUpperCase() + sub.subscribedTrainerDetails?.lname?.slice(1).toLowerCase()}`;
          const price = `RS ${sub.price.toFixed(2)}`; 
          const subPeriod =
            sub.subPeriod.charAt(0).toUpperCase() +
            sub.subPeriod.slice(1).toLowerCase(); 

            const isSubscriptionActive = sub.isActive==="active"
          return {
            ...sub,
            slno: index + 1,
            name: name,
            email: sub.subscribedTrainerDetails.email,
            isBlocked: sub.subscribedTrainerDetails.isBlocked,
            profilePic: sub.subscribedTrainerDetails.profilePic,
            price: price,
            startDate: sub.startDate,
            endDate: sub.endDate,
            isActive: sub.isActive,
            subPeriod: subPeriod,
            durationInWeeks: sub.durationInWeeks,
            sessionsPerWeek: sub.sessionsPerWeek,
            totalSessions: sub.totalSessions,
            actions: (
              <>
                <IconButton
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  disabled={!isSubscriptionActive} 
                  onClick={(event) => handleMenuClick(event, sub.stripeSubscriptionId)}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  
                  sx={{
                    "& .MuiPaper-root": {
                      boxShadow: "none",
                      border: "1px solid",
                    },
                  }}
                  open={Boolean(anchorEl) && selectedSubscriptionId === sub.stripeSubscriptionId}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                     disabled={!isSubscriptionActive} 
                    onClick={() => {
                      handleCancelSubscriptionsUser(sub.stripeSubscriptionId, "cancelImmediately",sub._id);
                      handleMenuClose();
                    }}
                  >
                    Cancel
                  </MenuItem>
                </Menu>
              </>
            ),
          };
        })
      : [];

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SearchBarTable />
        <Filter filter={filter} />
      </div>

      {isLoading ? (
        <ShimmerTableLoader columns={columns} />
      ) : (
        <ReuseTable columns={columns} data={fetchedUserSubscriptionsData} />
      )}
    </>
  );
};

export default UserSubscriptionsPage;
