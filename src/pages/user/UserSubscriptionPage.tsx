import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { cancelSubscriptionUser, getUserSubscriptionsData } from "../../redux/subscription/subscriptionThunk";
import ReuseTable from "../../components/ReuseTable";
import { IconButton, Menu, MenuItem } from "@mui/material";
import ShimmerTableLoader from "../../components/ShimmerTable";
import SearchBarTable from "../../components/SearchBarTable";
import Filter from "../../components/Filter";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { showErrorToast, showSuccessToast } from "../../utils/toast";

interface TableColumn {
  label: string;
  field: string;
}

interface FilterOption {
  value: string;
}
const columns: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Image", field: "profilePic" },
  { label: "Name", field: "name" },
  { label: "Email", field: "email" },
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

  const { isLoading, error } = useSelector((state: RootState) => state.subscription)

  const handleCancelSubscriptionsUser = async(stripeSubscriptionId: string, action: string,subId:string) => {

    try {
      const response = await dispatch(cancelSubscriptionUser({stripeSubscriptionId,action,subId})).unwrap()
      showSuccessToast(response.message)
    } catch (error) {
      console.error("API Error:", error);
      showErrorToast(`${error}`);
    }

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
          const name = `${sub.subscribedTrainerData?.fname?.charAt(0).toUpperCase() + sub.subscribedTrainerData?.fname?.slice(1).toLowerCase()} ${sub.subscribedTrainerData?.lname?.charAt(0).toUpperCase() + sub.subscribedTrainerData?.lname?.slice(1).toLowerCase()}`;
          const price = `RS ${sub.price.toFixed(2)}`; 
          const subPeriod =
            sub.subPeriod.charAt(0).toUpperCase() +
            sub.subPeriod.slice(1).toLowerCase(); 

            const isSubscriptionActive = sub.isActive==="active"
            const isActive = sub.isActive.charAt(0).toUpperCase() + sub.isActive.slice(1);

          return {
            ...sub,
            slno: index + 1,
            name: name,
            email: sub.subscribedTrainerData.email,
            profilePic: sub.subscribedTrainerData.profilePic,
            price: price,
            startDate: sub.startDate,
            endDate: sub.endDate,
            isActive: isActive,
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
