import React, { useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import TrainerSubscriptionForm from "../../components/SubscriptionSetting";
import { useModal } from "../../hooks/useModal";
import NavigationTabs from "../../components/Tabs";
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
  const [value, setValue] = useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabItems = [
    { label: "Profile", path: "/trainer/profile" },
    { label: "Subscription", path: "/trainer/subscription" },
    { label: "Add video & Docs for clients", path: "/trainer/add-video" },
  ];

  const { open, handleClose, handleOpen } = useModal();

  const {
    planTypes,
    subPeriods,
    formik,
    subscriptions,
    UpdateSubsBlockstatus,
    editSubscription,
    deleteSubscription,
  } = useSubscription();


  const columns: TableColumn[] = [
    { label: "Sl No", field: "slno" },
    { label: "Plan Type", field: "planType" },
    { label: "Subscription Period", field: "subPeriod" },
    { label: "Price", field: "price" },
    { label: "Duration in Weeks", field: "durationInWeeks" },
    { label: "Sessions Per Week", field: "sessionsPerWeek" },
    { label: "Total Sessions", field: "totalSessions" },
    { label: "Action", field: "actions" },
  ];

  const sort: SortOption[] = [
    { value: "5000" },
    { value: "25000" },
    { value: "50000" },
    { value: "100000" },
  ];
  const filter: FilterOption[] = [
    { value: "All" },
    { value: "Active" },
    { value: "Inactive" },
    { value: "Premium" },
    { value: "Silver" },
    { value: "Gold" },
    { value: "Monthly" },
    { value: "Quarterly" },
    { value: "Yearly" },
    { value: "Half Yearly" },
  ];

  // console.log("trainers",trainerSubscriptionData)

  const fetchedTrainerSubscriptionData =
    subscriptions && subscriptions.length > 0
      ? subscriptions.map((sub, index) => {
          return {
            ...sub,
            slno: index + 1,
            subPeriod:
              sub.subPeriod.charAt(0).toUpperCase() + sub.subPeriod.slice(1),
            planType:
              sub.planType.charAt(0).toUpperCase() + sub.planType.slice(1),
            isApproved: sub?.isActive,
            actions: (
              <>
                <IconButton
                  onClick={() => deleteSubscription(sub?._id as string)}
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
    <div style={{ marginBottom: "20px", marginLeft: "50px" }}>
      <NavigationTabs
        value={value}
        handleChange={handleChange}
        tabItems={tabItems}
      />
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
        planTypes={planTypes}
        subPeriods={subPeriods}
        formik={formik}
      />
      <div className="flex justify-between ml-2 ">
        <SearchBarTable />
        <Filter sort={sort} filter={filter} />
      </div>
      <div className="ml-2">
        <ReuseTable
          columns={columns}
          data={fetchedTrainerSubscriptionData}
          handleUpdateBlockStatus={UpdateSubsBlockstatus}
        />
      </div>
    </div>
  );
};

export default SubscriptionSettingPage;
