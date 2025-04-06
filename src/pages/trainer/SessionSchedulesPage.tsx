import React, { useState } from "react";
import { Box } from "@mui/material";
import Tabs from "../../components/Tabs";
import {  useSelector } from "react-redux";
import {  RootState } from "../../redux/store";
import { socket } from "../../config/socket";
import ZegoCloudVideoCall from "../../components/VideoCallZego";
import AvailableSlotsTab from "./ScheduleTabs/AvailableSlotsTab";
import BookingRequestsTab from "./ScheduleTabs/BookingRequestsTab";
import BookingSchedulesTab from "./ScheduleTabs/BookingSchedulesTab";
import AppointmentCallLogsTab from "./ScheduleTabs/AppointCallLogsTab";

const tabItems = [
  { label: "Available Slots" },
  { label: "Booking Requests" },
  { label: "Booking Schedules" },
  { label: "Appointment Call Logs" },
];


const SessionSchedulesPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [callActive, setCallActive] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);
  const trainer = useSelector((state: RootState) => state.auth.trainer);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleEndCall = () => {
    if (roomId) socket.emit("videoCallEnded", { roomId });
    setCallActive(false);
    setRoomId(null);
  };

  const handleVideoCallClick = (userId: string, appointmentId: string) => {
    if (trainer?._id) {
      const randomNum = Math.floor(Math.random() * 1000000);
      const newRoomId = `${randomNum}`;
      setRoomId(newRoomId);
      setCallActive(true);
      socket.emit("initiateVideoCall", {
        callerId: trainer._id,
        receiverId: userId,
        roomId: newRoomId,
        appointmentId,
      });
    } else {
      console.log("Trainer ID not available");
    }
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        return <AvailableSlotsTab isActive={selectedTab === 0}/>;
      case 1:
        return <BookingRequestsTab isActive={selectedTab === 1} />;
      case 2:
        return <BookingSchedulesTab  isActive={selectedTab === 2} onVideoCallClick={handleVideoCallClick} />;
      case 3:
        return <AppointmentCallLogsTab isActive={selectedTab === 3} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Tabs tabItems={tabItems} value={selectedTab as number} handleChange={handleTabChange} />
      {renderContent()}
      {callActive && roomId && (
        <Box sx={{ position: "fixed", top: 0, left: 0, zIndex: 1000 }}>
          <ZegoCloudVideoCall
            roomId={roomId}
            userId={trainer?._id as string}
            userName={trainer?.fname as string}
            onEndCall={handleEndCall}
          />
        </Box>
      )}
    </>
  );
};

export default SessionSchedulesPage;