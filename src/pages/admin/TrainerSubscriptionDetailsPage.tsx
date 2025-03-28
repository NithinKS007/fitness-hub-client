import React, { useEffect, useState } from "react";
import { Box, IconButton, Menu, MenuItem, Paper } from "@mui/material";
import useSubscription from "../../hooks/useSubscription";
import ReuseTable from "../../components/ReuseTable";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getTrainerSubscriptionById } from "../../redux/subscription/subscriptionThunk";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TableFilter from "../../components/TableFilter";
import TableSort from "../../components/TableSort";

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

const TrainerSubscriptionDetailsPage: React.FC = () => {
  const { subscriptions, UpdateSubsBlockstatus } = useSubscription();

  const { _id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const fetchTrainerSubscriptionData = async () => {
    if(_id){
      await dispatch(getTrainerSubscriptionById(_id));
    }
  };

  const trainerSubscriptionData = useSelector(
    (state: RootState) => state.subscription.subscriptions
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<
    string | null
  >(null);

  const open = Boolean(anchorEl);

  useEffect(() => {
    fetchTrainerSubscriptionData();
  }, [dispatch]);

  const columns: TableColumn[] = [
    { label: "Sl No", field: "slno" },
    { label: "Subscription Period", field: "subPeriod" },
    { label: "Price", field: "price" },
    { label: "Duration in Weeks", field: "durationInWeeks" },
    { label: "Sessions Per Week", field: "sessionsPerWeek" },
    { label: "Total Sessions", field: "totalSessions" },
    { label: "Details", field: "details" },
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
    trainerSubscriptionData && trainerSubscriptionData.length > 0
      ? subscriptions.map((sub, index) => {
          return {
            ...sub,
            slno: index + 1,
            subPeriod:
              sub.subPeriod.charAt(0).toUpperCase() + sub.subPeriod.slice(1),
              price: `USD : ${sub.price}`,
            details: (
              <>
                <IconButton
                  onClick={(event) => {
                    setAnchorEl(event.currentTarget);
                    setSelectedSubscriptionId(sub?._id as string);
                  }}
                  aria-label="More options"
                >
                  <MoreVertIcon />
                </IconButton>
                <Paper>
                  <Menu
                    anchorEl={anchorEl}
                    open={open && selectedSubscriptionId === sub._id}
                    onClose={() => {
                      setAnchorEl(null);
                      setSelectedSubscriptionId(null);
                    }}
                    sx={{
                      "& .MuiPaper-root": {
                        boxShadow: "none",
                        border: 1,
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() =>
                        UpdateSubsBlockstatus({
                          _id: sub._id as string,
                          isBlocked: !sub.isBlocked,
                        })
                      }
                    >
                      {sub.isBlocked ? "Unblock" : "Block"}
                    </MenuItem>
                  </Menu>
                </Paper>
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
      ></Box>
      <div style={{ display: "flex", justifyContent: "end", gap: 4 ,marginBottom:"10px"}}>
        {/* <TableFilter filter={filter} />
        <TableSort sort={sort} /> */}
      </div>
      
      <ReuseTable columns={columns} data={fetchedTrainerSubscriptionData} />
    </>
  );
};

export default TrainerSubscriptionDetailsPage;
