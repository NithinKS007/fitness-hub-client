import React, { useEffect } from "react";
import ReuseTable from "../../components/ReuseTable";
import { useDispatch } from "react-redux";
import {
  getApprovalPendingList,
  updatedApprovalStatus,
} from "../../redux/admin/adminThunk";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Trainer } from "../../redux/auth/authTypes";
import Button from "@mui/material/Button";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import ShimmerTableLoader from "../../components/ShimmerTable";
import MailIcon from "@mui/icons-material/Mail";
import { Box, Typography } from "@mui/material";
import SearchBarTable from "../../components/SearchBarTable";
import useSearchFilter from "../../hooks/useSearchFilterTable";
import DateFilter from "../../components/DateAndTimeFilter";
import PaginationTable from "../../components/PaginationTable";
import { useModal } from "../../hooks/useModal";
import ConfirmationModalDialog from "../../components/modals/ConfirmationModalDialog";
import { TableColumn } from "../../types/tableTypes";
import { Dayjs } from "dayjs";

const columns: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Profile", field: "profilePic" },
  { label: "Name", field: "name" },
  { label: "Email", field: "email" },
  { label: "Application Date", field: "createdAt" },
  { label: "Verification Status", field: "verified" },
  { label: "More", field: "actions" },
];

const InboxPage: React.FC = () => {
  const [selectedTrainer, setSelectedTrainer] = React.useState<Trainer | null>(
    null
  );
  const [actionType, setActionType] = React.useState<
    "approved" | "rejected" | null
  >(null);
  const dispatch = useDispatch<AppDispatch>();
  const {
    trainers,
    isLoading,
    pagination: { totalPages, currentPage },
  } = useSelector((state: RootState) => state.admin);

  const {
    handlePageChange,
    searchTerm,
    handleSearchChange,
    getQueryParams,
    fromDate,
    toDate,
    handleFromDateChange,
    handleToDateChange,
    handleResetDates,
  } = useSearchFilter();

  useEffect(() => {
    dispatch(getApprovalPendingList(getQueryParams()));
  }, [
    dispatch,
    getQueryParams().page,
    getQueryParams().search,
    getQueryParams().fromDate,
    getQueryParams().toDate,
  ]);
  const {
    open: confirmationModalOpen,
    handleOpen: handleConfirmationModalOpen,
    handleClose: handleConfirmationModalClose,
  } = useModal();

  const handleTrainerAction = (
    trainer: Trainer,
    action: "approved" | "rejected"
  ) => {
    setSelectedTrainer(trainer);
    setActionType(action);
    handleConfirmationModalOpen();
  };

  const handleConfirmAction = async () => {
    if (selectedTrainer && actionType) {
      try {
        const response = await dispatch(
          updatedApprovalStatus({
            _id: selectedTrainer._id,
            action: actionType,
          })
        ).unwrap();
        showSuccessToast(`${response.message}`);
        handleConfirmationModalClose();
      } catch (error) {
        showErrorToast(`${error}`);
      }
    }
  };

  const fetchedTrainersData =
    trainers.length > 0
      ? trainers.map((trainer: Trainer, index: number) => {
          const dateObj = new Date(trainer.createdAt as string);
          const formattedDate = dateObj.toLocaleDateString("en-GB");
          const formattedTime = dateObj.toLocaleTimeString("en-GB");
          return {
            ...trainer,
            name: `${trainer.fname} ${trainer.lname}`,
            slno: index + 1 + (currentPage - 1) * 9,
            createdAt: `${formattedDate} ${formattedTime}`,
            verified: trainer.otpVerified || trainer.googleVerified,
            actions: (
              <>
                <Box sx={{ display: "flex", gap: "8px" }}>
                  <Button
                    size="small"
                    onClick={() => handleTrainerAction(trainer, "approved")}
                    sx={{
                      fontSize: "14px",
                      backgroundColor: "green",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "darkgreen",
                      },
                    }}
                    variant="contained"
                  >
                    Approve
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleTrainerAction(trainer, "rejected")}
                    sx={{
                      fontSize: "14px",
                      color: "white",
                      borderColor: "red",
                      backgroundColor: "red",
                      "&:hover": {
                        backgroundColor: "darkred",
                      },
                    }}
                    variant="contained"
                  >
                    Reject
                  </Button>
                </Box>
              </>
            ),
          };
        })
      : [];
  return (
    <>
      <Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
        <SearchBarTable
          searchTerm={searchTerm as string}
          handleSearchChange={handleSearchChange}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }} gap={1}>
          <DateFilter
            fromDate={fromDate as Dayjs |null}
            toDate={toDate as Dayjs | null}
            onFromDateChange={handleFromDateChange}
            onToDateChange={handleToDateChange}
            onReset={handleResetDates}
          />
        </Box>
      </Box>

      {isLoading ? (
        <ShimmerTableLoader columns={columns} />
      ) : fetchedTrainersData.length > 0 ? (
        <>
          <ReuseTable columns={columns} data={fetchedTrainersData} />
          <PaginationTable
            handlePageChange={handlePageChange}
            page={currentPage}
            totalPages={totalPages}
          />
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "85%",
            textAlign: "center",
            border: 1,
            borderColor: "grey.400",
            borderRadius: 2,
          }}
        >
          <MailIcon sx={{ fontSize: 150, color: "gray" }} />
          <Typography variant="h6" sx={{ mt: 2, color: "gray" }}>
            Your inbox is empty
          </Typography>
        </Box>
      )}
      <ConfirmationModalDialog
        open={confirmationModalOpen as boolean}
        content={
          (selectedTrainer &&
            `Are you sure you want to ${actionType} ${selectedTrainer.fname} ${selectedTrainer.lname}'s application?`) as string
        }
        onConfirm={handleConfirmAction}
        onCancel={handleConfirmationModalClose}
        confirmText="Yes"
        cancelText="No"
        confirmColor={actionType === "approved" ? "success" : "error"}
        cancelColor="primary"
      />
    </>
  );
};

export default InboxPage;
