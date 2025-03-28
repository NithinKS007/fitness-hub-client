import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  cancelSubscriptionUser,
  getUserSubscriptionsData,
} from "../../redux/subscription/subscriptionThunk";
import ReuseTable from "../../components/ReuseTable";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import ShimmerTableLoader from "../../components/ShimmerTable";
import SearchBarTable from "../../components/SearchBarTable";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import TableFilter from "../../components/TableFilter";
import useSearchFilter from "../../hooks/useSearchFilter";
import PaginationTable from "../../components/PaginationTable";
import { useModal } from "../../hooks/useModal";
import ConfirmationModalDialog from "../../components/ConfirmationModalDialog";

interface TableColumn {
  label: string;
  field: string;
}

interface FilterOption {
  value: string;
}
const columns: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Profile", field: "profilePic" },
  { label: "Name", field: "name" },
  { label: "Email", field: "email" },
  { label: "Amount", field: "price" },
  { label: "Start Date", field: "startDate" },
  { label: "Expiry Date", field: "endDate" },
  { label: "Subscription status", field: "isActive" },
  { label: "Subscription Period", field: "subPeriod" },
  { label: "Duration in Weeks", field: "durationInWeeks" },
  { label: "Sessions Per Week", field: "sessionsPerWeek" },
  { label: "Total Sessions", field: "totalSessions" },
  { label: "More", field: "actions" },
];

const filter: FilterOption[] = [
  { value: "Active" },
  { value: "Canceled" },
  { value: "Incomplete" },
  { value: "Incomplete expired" },
  { value: "Trialing" },
  { value: "Past due" },
  { value: "Unpaid" },
  { value: "Paused" },
  { value: "Monthly" },
  { value: "Quarterly" },
  { value: "Yearly" },
  { value: "HalfYearly" },
];

const UserSubscriptionsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<
    string | null
  >(null);
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null);
  const {
    open: confirmationModalOpen,
    handleOpen: handleConfirmationModalOpen,
    handleClose: handleConfirmationModalClose,
  } = useModal();

  const {
    handlePageChange,
    searchTerm,
    handleSearchChange,
    selectedFilter,
    handleFilterChange,
    getQueryParams,
  } = useSearchFilter();

  useEffect(() => {
    dispatch(getUserSubscriptionsData(getQueryParams()));
  }, [
    dispatch,
    getQueryParams().page,
    getQueryParams().search,
    getQueryParams().filters,
  ]);

  const userSubscribedPlans = useSelector(
    (state: RootState) => state.subscription.userSubscribedTrainerPlans
  );

  const { isLoading, error } = useSelector(
    (state: RootState) => state.subscription
  );

  const handleCancelSubscriptionsUser = async (
    stripeSubscriptionId: string,
    action: string,
    subId: string
  ) => {
    try {
      const response = await dispatch(
        cancelSubscriptionUser({ stripeSubscriptionId, action, subId })
      ).unwrap();
      showSuccessToast(response.message);
    } catch (error) {
      console.error("API Error:", error);
      showErrorToast(`${error}`);
    }
  };
  const { totalPages, currentPage } = useSelector(
    (state: RootState) => state.subscription.pagination
  );

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    subscriptionId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedSubscriptionId(subscriptionId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSubscriptionId(null);
  };

  const handleCancelAction = (subscription: any) => {
    setSelectedSubscription(subscription);
    handleConfirmationModalOpen();
    handleMenuClose();
  };

  const handleConfirmCancel = () => {
    if (selectedSubscription) {
      handleCancelSubscriptionsUser(
        selectedSubscription.stripeSubscriptionId,
        "cancelImmediately",
        selectedSubscription._id
      );
      handleConfirmationModalClose();
      handleMenuClose();
    }
  };

  const fetchedUserSubscriptionsData =
    userSubscribedPlans.length > 0
      ? userSubscribedPlans.map((sub, index) => {
          console.log(
            "hello fname",
            sub.subscribedTrainerData.fname,
            sub.subscribedTrainerData
          );
          const name = `${sub.subscribedTrainerData?.fname?.charAt(0).toUpperCase() + sub.subscribedTrainerData?.fname?.slice(1).toLowerCase()} ${sub.subscribedTrainerData?.lname?.charAt(0).toUpperCase() + sub.subscribedTrainerData?.lname?.slice(1).toLowerCase()}`;
          const price = `$${sub.price.toFixed(2)}`;
          const subPeriod =
            sub.subPeriod.charAt(0).toUpperCase() +
            sub.subPeriod.slice(1).toLowerCase();

          const isSubscriptionActive = sub.isActive === "active";
          const isActive =
            sub.isActive.charAt(0).toUpperCase() + sub.isActive.slice(1);

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
                  onClick={(event) =>
                    handleMenuClick(event, sub.stripeSubscriptionId)
                  }
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
                      borderColor: "grey.400",
                      borderRadius: 2,
                    },
                  }}
                  open={
                    Boolean(anchorEl) &&
                    selectedSubscriptionId === sub.stripeSubscriptionId
                  }
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    disabled={!isSubscriptionActive}
                    onClick={() => handleCancelAction(sub)}
                  >
                    Cancel
                  </MenuItem>
                </Menu>
              </>
            ),
          };
        })
      : [];

  console.log("fetched one", fetchedUserSubscriptionsData);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <SearchBarTable
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
        <TableFilter
          filter={filter}
          selectedFilter={selectedFilter}
          handleFilterChange={handleFilterChange}
        />
      </Box>

      {isLoading ? (
        <ShimmerTableLoader columns={columns} />
      ) : error ? (
        <Box>{error}</Box>
      ) : (
        <>
          <ReuseTable columns={columns} data={fetchedUserSubscriptionsData} />
          <PaginationTable
            handlePageChange={handlePageChange}
            page={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
      <ConfirmationModalDialog
        open={confirmationModalOpen}
        // title="Cancel Subscription"
        content={
          selectedSubscription &&
          `Are you sure you want to cancel your ${selectedSubscription.subPeriod.toLowerCase()} subscription with ${selectedSubscription.subscribedTrainerData.fname} ${selectedSubscription.subscribedTrainerData.lname}?`
        }
        onConfirm={handleConfirmCancel}
        onCancel={handleConfirmationModalClose}
        confirmText="Yes"
        cancelText="No"
        confirmColor="error"
        cancelColor="primary"
      />
    </>
  );
};

export default UserSubscriptionsPage;
