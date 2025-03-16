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
import Filter from "../../components/Filter";
import SearchBarTable from "../../components/SearchBarTable";
import Button from "@mui/material/Button";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import ShimmerTableLoader from "../../components/ShimmerTable";

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

interface DirectionOption {
  value: string;
}

const columns: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Image", field: "profilePic" },
  { label: "First Name", field: "fname" },
  { label: "Last Name", field: "lname" },
  { label: "Email", field: "email" },
  { label: "Status", field: "isBlocked" },
  { label: "Join Date", field: "createdAt" },
  { label: "Verified", field: "verified" },
  { label: "Approved", field: "isApproved" },
  { label: "Actions", field: "actions" },
];

const sort: SortOption[] = [
  { value: "First Name" },
  { value: "Last Name" },
  { value: "Email" },
  { value: "Join Date" },
];
const filter: FilterOption[] = [
  { value: "All" },
  { value: "Block" },
  { value: "Unblock" },
  { value: "Approved" },
  { value: "Not Approved" },
];
const direction: DirectionOption[] = [{ value: "A to Z" }, { value: "Z to A" }];
const InboxPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { trainers, isLoading, error } = useSelector(
    (state: RootState) => state.admin
  );

  const fetchTrainers = async () => {
    await dispatch(getApprovalPendingList());
  };

  useEffect(() => {
    fetchTrainers();
  }, [dispatch]);

  if (error) return <div>{error}</div>;

  const handleTrainerApproveOrReject = async (_id: string, action: string) => {
    try {
      const response = await dispatch(
        updatedApprovalStatus({ _id, action })
      ).unwrap();
      console.log("Response", response);
      showSuccessToast(`${response.message}`);
    } catch (error) {
      console.log(`API Error ${error}`);
      showErrorToast(`${error}`);
    }
  };

  const fetchedTrainersData =
    trainers.length > 0
      ? trainers.map((trainer: Trainer, index: number) => {
          const dateObj = new Date(trainer.createdAt as string);
          const formattedDate = dateObj.toLocaleDateString("en-GB");
          const formattedTime = dateObj.toLocaleTimeString("en-GB");

          console.log("this is the trainers id", trainer._id);
          return {
            ...trainer,
            slno: index + 1,
            createdAt: `${formattedDate} ${formattedTime}`,
            verified: trainer.otpVerified || trainer.googleVerified,
            isApproved: trainer?.isApproved,
            actions: (
              <>
                <Button
                  size="small"
                  onClick={() =>
                    handleTrainerApproveOrReject(
                      trainer?._id as string,
                      "approved"
                    )
                  }
                  sx={{ fontSize: "14px", marginRight: "8px" }}
                  variant="text"
                >
                  Approve
                </Button>
                <Button
                  size="small"
                  onClick={() =>
                    handleTrainerApproveOrReject(
                      trainer?._id as string,
                      "rejected"
                    )
                  }
                  sx={{ fontSize: "14px", color: "red", borderColor: "red" }}
                  variant="text"
                >
                  Reject
                </Button>
              </>
            ),
          };
        })
      : [];
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SearchBarTable />
        <Filter sort={sort} filter={filter} direction={direction} />
      </div>
      {isLoading ? (
        <ShimmerTableLoader columns={columns} />
      ) : fetchedTrainersData.length > 0 ? (
        <ReuseTable
          columns={columns}
          data={fetchedTrainersData}
        />
      ) : (
        <div>Your inbox is empty</div>
      )}
    </>
  );
};

export default InboxPage;
