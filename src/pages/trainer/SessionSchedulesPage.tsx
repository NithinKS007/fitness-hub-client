import React, { useContext, useState } from "react";
import { Box } from "@mui/material";
import Tabs from "../../components/Tabs";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import ZegoCloudVideoCall from "../../components/VideoCallZego";
import AvailableSlotsTab from "./ScheduleTabs/AvailableSlotsTab";
import BookingRequestsTab from "./ScheduleTabs/BookingRequestsTab";
import BookingSchedulesTab from "./ScheduleTabs/BookingSchedulesTab";
import AppointmentCallLogsTab from "./ScheduleTabs/AppointCallLogsTab";
import { SocketContext } from "../../context/SocketContext";
import { useDispatch } from "react-redux";
import { createZegocloudToken } from "../../redux/booking/bookingThunk";

const tabItems = [
  { label: "Available Slots" },
  { label: "Booking Requests" },
  { label: "Booking Schedules" },
  { label: "Call Logs" },
];

const SessionSchedulesPage: React.FC = () => {
  const { socket, isSocketConnected } = useContext(SocketContext) || {
    socket: null,
    isSocketConnected: false,
  };
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [callActive, setCallActive] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [appId, setAppId] = useState<number | null>(null);
  const trainer = useSelector((state: RootState) => state.auth.trainer);

  const dispatch = useDispatch<AppDispatch>();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    console.log("event", event);
  };

  const handleEndCall = () => {
    if (!socket || !isSocketConnected) return;
    if (roomId) socket.emit("videoCallEnded", { roomId });
    setCallActive(false);
    setRoomId(null);
  };

  const handleVideoCallClick = async (
    userId: string,
    appointmentId: string
  ) => {
    if (!socket || !isSocketConnected || !trainer) return;

    // const randomNum = Math.floor(Math.random() * 1000000);
    // const newRoomId = `${randomNum}`;
    const response = await dispatch(createZegocloudToken()).unwrap();
    setRoomId(response.data.roomId);
    setToken(response.data.token);
    setAppId(response.data.appId);
    setCallActive(true);
    socket.emit("startVC", {
      callerId: trainer.id,
      receiverId: userId,
      roomId: response.data.roomId,
      token: response.data.token,
      appId: response.data.appId,
      appointmentId,
    });
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        return <AvailableSlotsTab isActive={selectedTab === 0} />;
      case 1:
        return <BookingRequestsTab isActive={selectedTab === 1} />;
      case 2:
        return (
          <BookingSchedulesTab
            isActive={selectedTab === 2}
            onVideoCallClick={handleVideoCallClick}
          />
        );
      case 3:
        return <AppointmentCallLogsTab isActive={selectedTab === 3} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Tabs
        tabItems={tabItems}
        value={selectedTab}
        handleChange={handleTabChange}
      />
      {renderContent()}
      {callActive && roomId && token && appId && trainer && (
        <Box sx={{ position: "fixed", top: 0, left: 0, zIndex: 1000 }}>
          <ZegoCloudVideoCall
            roomId={roomId}
            userId={trainer?.id}
            userName={`${trainer?.fname} ${trainer?.lname}`}
            onEndCall={handleEndCall}
            token={token}
            appId={appId}
          />
        </Box>
      )}
    </>
  );
};

export default SessionSchedulesPage;
