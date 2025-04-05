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
import { TableColumn } from "../../types/tableTypes";

const TrainerSubscriptionDetailsPage: React.FC = () => {
  const { subscriptions, UpdateSubsBlockstatus } = useSubscription();

  const { _id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const trainerSubscriptionData = useSelector(
    (state: RootState) => state.subscription.subscriptions
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<
    string | null
  >(null);

  const open = Boolean(anchorEl);

  useEffect(() => {
    if(_id){
      dispatch(getTrainerSubscriptionById(_id))
    }
  }, [dispatch,_id]);

  const columns: TableColumn[] = [
    { label: "Sl No", field: "slno" },
    { label: "Subscription Period", field: "subPeriod" },
    { label: "Price", field: "price" },
    { label: "Duration in Weeks", field: "durationInWeeks" },
    { label: "Sessions Per Week", field: "sessionsPerWeek" },
    { label: "Total Sessions", field: "totalSessions" },
    { label: "Details", field: "details" },
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
      </div>
      
      <ReuseTable columns={columns} data={fetchedTrainerSubscriptionData} />
    </>
  );
};

export default TrainerSubscriptionDetailsPage;
