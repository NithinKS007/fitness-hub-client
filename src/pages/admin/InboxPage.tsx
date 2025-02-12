import React, { useEffect } from "react";
import ReuseTable from "../../components/ReuseTable";
import { useDispatch } from "react-redux";
import { getTrainersApprovalRejectionList, getUsers } from "../../redux/admin/adminThunk";
import { useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { Trainer } from "../../redux/auth/authTypes";
import Filter from "../../components/Filter";
import SearchBarTable from "../../components/SearchBarTable";
import ShimmerTableLoader from "../../components/ShimmerTable";
import useUpdateBlockStatus from "../../hooks/useUpdateBlockStatus";
import Button from "@mui/material/Button"; // For the Approve and Reject buttons

import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";

import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import VerifiedIcon from "@mui/icons-material/Verified";

import HowToRegIcon from "@mui/icons-material/HowToReg";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { RequestTrainerVerification } from "../../redux/admin/adminTypes";

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
  const { trainers, loading, error } = useSelector((state: any) => state.admin);

  const handleUpdateBlockStatus = useUpdateBlockStatus();

  const fetchTrainers = async () => {
    await dispatch(getUsers("trainer"))
  };

  useEffect(() => {
    fetchTrainers();
  }, [dispatch]);

  if (loading) return <ShimmerTableLoader columns={columns} />;
  if (error) return <div>{error}</div>;

  if (trainers?.length === 0) {
    return <div>Your inbox is empty</div>;
  }

  const handleTrainerApproveOrReject = async (_id:string,action:string) => {

    console.log("id for approval",_id,action)
    //  await dispatch()
  };


  console.log("b",trainers);
  

  const fetchedTrainersData =
  trainers.length > 0
    ? trainers
        .filter((trainer: Trainer) => {
          return (
            trainer?.role === "trainer" &&
            trainer?.trainerData?.isApproved === false &&
            (trainer?.otpVerified === true || trainer?.googleVerified === true)
          );
        })
        .map((trainer: Trainer, index: number) => {
          const dateObj = new Date(trainer.createdAt as string);
          const formattedDate = dateObj.toLocaleDateString("en-GB");
          const formattedTime = dateObj.toLocaleTimeString("en-GB");

          return {
            ...trainer,
            slno: index + 1,
            createdAt: `${formattedDate} ${formattedTime}`,
            verified: trainer.otpVerified || trainer.googleVerified,
            isApproved: trainer.trainerData?.isApproved,
            actions: (
              <div>
                <Button
                  size="small"
                  onClick={() => handleTrainerApproveOrReject(trainer?._id as string,"approved")}
                  sx={{ fontSize: "14px", marginRight: "8px" }}
                  variant="outlined"
                >
                  Approve
                </Button>
                <Button
                  size="small"
                  onClick={() => handleTrainerApproveOrReject(trainer?._id as string,"rejected")}
                  sx={{ fontSize: "14px", color: "red", borderColor: "red" }}
                  variant="outlined"
                >
                  Reject
                </Button>
              </div>
            ),
          };
        })
    : [];

    console.log("f",fetchedTrainersData)
    return (
      <>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <SearchBarTable />
          <Filter sort={sort} filter={filter} direction={direction} />
        </div>
        {fetchedTrainersData.length > 0 ? (
          <ReuseTable
            columns={columns}
            data={fetchedTrainersData}
            handleUpdateBlockStatus={handleUpdateBlockStatus}
          />
        ) : (
          <div>Your inbox is empty</div>
        )}
      </>
    );
  };

export default InboxPage;
