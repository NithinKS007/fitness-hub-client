import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  cancelSubscriptionUser,
  getUserSubscriptionsData,
} from "../../../redux/subscription/subscriptionThunk";
import ReuseTable from "../../../components/table/ReuseTable";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import ShimmerTableLoader from "../../../components/table/ShimmerTable";
import SearchBarTable from "../../../components/table/SearchBarTable";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import TableFilter from "../../../components/table/TableFilter";
import useSearchFilter from "../../../hooks/useSearchFilter";
import PaginationTable from "../../../components/Pagination";
import { useModal } from "../../../hooks/useModal";
import ConfirmationModalDialog from "../../../components/modals/ConfirmationModalDialog";
import { TableColumn, Filter } from "../../../types/tableTypes";
import { GetProfilePic } from "../../../components/icons/IconIndex";

const columns: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Profile", field: "profilePic" },
  { label: "Name", field: "name" },
  { label: "Email", field: "email" },
  { label: "Amount", field: "price" },
  { label: "Start Date", field: "startDate" },
  { label: "Expiry Date", field: "endDate" },
  { label: "status", field: "isActive" },
  { label: "Period", field: "subPeriod" },
  { label: "Duration (Weeks)", field: "durationInWeeks" },
  { label: "Sessions/Week", field: "sessionsPerWeek" },
  { label: "Total Sessions", field: "totalSessions" },
  { label: "More", field: "actions" },
];

const filter: Filter[] = [
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

interface MySubscriptionsProp {
  isActive: boolean;
}

const MySubscriptions: React.FC<MySubscriptionsProp> = ({ isActive }) => {
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
    if (isActive) {
      dispatch(getUserSubscriptionsData(getQueryParams()));
    }
  }, [
    dispatch,
    isActive,
    getQueryParams().page,
    getQueryParams().search,
    getQueryParams().filters,
  ]);

  const {
    isLoading,
    error,
    userSubscribedTrainerPlans: userSubscribedPlans,
    pagination: { totalPages, currentPage },
  } = useSelector((state: RootState) => state.subscription);

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
            slno: index + 1 + (currentPage - 1) * 9,
            name: name,
            email: sub.subscribedTrainerData.email,

            profilePic: GetProfilePic(sub.subscribedTrainerData.profilePic),
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
                  sx={{
                    padding: "30",
                    minWidth: "0",
                    width: "25px",
                    height: "25px",
                  }}
                >
                  <MoreVertIcon sx={{ fontSize: "20px" }} />
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

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt:2 }}>
        <SearchBarTable
          searchTerm={searchTerm as string}
          handleSearchChange={handleSearchChange}
        />
        <TableFilter
          filter={filter}
          selectedFilter={selectedFilter as string[]}
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
        open={confirmationModalOpen as boolean}
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

export default MySubscriptions;
