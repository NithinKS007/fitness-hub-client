import React from "react";
import { Box, Button, IconButton } from "@mui/material";
import TrainerSubscriptionForm from "../../components/SubscriptionSetting";
import useSubscription from "../../hooks/useSubscription";
import ReuseTable from "../../components/ReuseTable";
import Filter from "../../components/Filter";
import SearchBarTable from "../../components/SearchBarTable";
import DeleteIcon from "@mui/icons-material/Delete";
import { BiSolidEdit } from "react-icons/bi";

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

const SubscriptionSettingPage: React.FC = () => {
  const {
    subPeriods,
    formik,
    subscriptions,
    UpdateSubsBlockstatus,
    editSubscription,
    deleteSubs,
    isEditMode,
    open,
    handleClose,
    handleOpen,
  } = useSubscription();

  const columns: TableColumn[] = [
    { label: "Sl No", field: "slno" },
    { label: "Subscription Period", field: "subPeriod" },
    { label: "Price", field: "price" },
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

  const fetchedTrainerSubscriptionData =
    subscriptions && subscriptions.length > 0
      ? subscriptions.map((sub, index) => {
          return {
            ...sub,
            slno: index + 1,
            subPeriod:
              sub.subPeriod.charAt(0).toUpperCase() + sub.subPeriod.slice(1),
            actions: (
              <>
                <IconButton
                  onClick={() => deleteSubs(sub?._id as string)}
                  sx={{
                    color: "gray",
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  onClick={() => editSubscription(sub?._id as string)}
                  sx={{
                    color: "gray",
                  }}
                >
                  <BiSolidEdit />
                </IconButton>
              </>
            ),
          };
        })
      : [];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          marginBottom: "10px",
          marginTop: "10px",
        }}
      >
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            backgroundColor: "#1d4ed8",
            color: "white",
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          ADD NEW PLAN
        </Button>
      </Box>

      <TrainerSubscriptionForm
        open={open}
        onClose={handleClose}
        subPeriods={subPeriods}
        formik={formik}
        isEditMode={isEditMode}
      />
      <div className="flex justify-between">
        <SearchBarTable />
        <Filter sort={sort} filter={filter} />
      </div>
      <ReuseTable
        columns={columns}
        data={fetchedTrainerSubscriptionData}
        handleUpdateBlockStatus={UpdateSubsBlockstatus}
      />
    </>
  );
};

export default SubscriptionSettingPage;
