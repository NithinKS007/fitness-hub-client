import { useEffect } from "react";
import { Box, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  getScheduledAppointmentsUser,
} from "../../redux/booking/bookingThunk";
import { IconButton, Menu, MenuItem } from "@mui/material";
import ReuseTable from "../../components/ReuseTable";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShimmerTableLoader from "../../components/ShimmerTable";
import DateAndTimeFilter from "../../components/DateAndTimeFilter";
import SearchBarTable from "../../components/SearchBarTable";
import useAppointments from "../../hooks/useAppointments";

interface TableColumn {
  label: string;
  field: string;
}

const scheduledAppointmentsColumn: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Profile Picture", field: "profilePic" },
  { label: "Name of the trainer", field: "name" },
  { label: "Email", field: "email" },
  { label: "Booking Date", field: "appointmentCreatedAt" },
  { label: "Appointment Date", field: "appointmentDate" },
  { label: "Appointment Time", field: "appointmentTime" },
  { label: "Current Appointment Status", field: "appointmentStatus" },
  { label: "Actions", field: "actions" },
];

const UserBookingsPage = () => {

  const {
    anchorAppointmentSchedulesEl,
    selectedAppointmentScheduleId,
    open,
    handleAppointmentSchedulesMenuClick,
    handleAppointmentSchedulesCloseMenu,
    handleCancelAppointmentScheduleUser
  } = useAppointments();

  const dispatch = useDispatch<AppDispatch>();





  useEffect(() => {
    dispatch(getScheduledAppointmentsUser());
  }, [dispatch]);

  const { isLoading, error, scheduledAppointmentsUser } = useSelector(
    (state: RootState) => state.bookingSlot
  );

  const fetchedscheduledAppointments =
    scheduledAppointmentsUser.length > 0
      ? scheduledAppointmentsUser.map((appointmentData, index) => {
          const reqDateObj = new Date(appointmentData?.createdAt as string);
          const formattedReqDate = reqDateObj.toLocaleDateString("en-GB");
          const formattedReqTime = reqDateObj.toLocaleTimeString("en-GB");

          const appointmentDate = new Date(
            appointmentData?.appointmentDate as string
          );
          const formattedAppointmentDate =
            appointmentDate.toLocaleDateString("en-GB");

          return {
            ...appointmentData,
            slno: index + 1,
            profilePic: appointmentData.trainerData.profilePic,
            name: `${appointmentData.trainerData.fname} ${appointmentData.trainerData.lname}`,
            email: appointmentData.trainerData.email,
            appointmentDate: `${formattedAppointmentDate}`,
            appointmentTime: appointmentData.appointmentTime,
            appointmentStatus:
              appointmentData.status.charAt(0).toUpperCase() +
              appointmentData.status.slice(1),
            appointmentCreatedAt: `${formattedReqDate} ${formattedReqTime} `,
            actions: (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <IconButton
                    onClick={(event) =>
                      handleAppointmentSchedulesMenuClick(
                        event,
                        appointmentData?._id as string
                      )
                    }
                    aria-label="More options"
                    sx={{
                      padding: 0,
                      paddingTop: 0,
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                <Paper>
                  <Menu
                    anchorEl={anchorAppointmentSchedulesEl}
                    open={
                      open &&
                      selectedAppointmentScheduleId === appointmentData?._id
                    }
                    onClose={handleAppointmentSchedulesCloseMenu}
                    sx={{
                      "& .MuiPaper-root": {
                        boxShadow: "none",
                        border: 1,
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() =>
                        handleCancelAppointmentScheduleUser(
                          appointmentData?._id as string
                        )
                      }
                    >
                      Cancel
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
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <SearchBarTable />
          <DateAndTimeFilter />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }} />
        {isLoading ? (
          <ShimmerTableLoader columns={scheduledAppointmentsColumn} />
        ) : error ? (
          <Box>{error}</Box>
        ) : (
          <ReuseTable
            columns={scheduledAppointmentsColumn}
            data={fetchedscheduledAppointments}
          />
        )}
      </>
    </>
  );
};

export default UserBookingsPage;
