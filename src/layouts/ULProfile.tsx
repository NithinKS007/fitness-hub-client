import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import ChatIcon from "@mui/icons-material/Chat";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import SideNavBar from "../components/dashboard/DashBoardSideNavBar";
import TopNavbar from "../components/dashboard/DashBoardTopBar";
import { socket } from "../config/socket";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ZegoCloudVideoCall from "../components/VideoCallZego";
import ConfirmationModalDialog from "../components/modals/ConfirmationModalDialog";
import { FiTrendingUp } from "react-icons/fi";
import { AccountCircle } from "@mui/icons-material";

const ULProfile: React.FC = () => {
  const user = useSelector((state: RootState) => state?.auth?.user);
  const [callActive, setCallActive] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [callDialogOpen, setCallDialogOpen] = useState<boolean>(false);
  const [incomingCallData, setIncomingCallData] = useState<any>(null);

  const userNavItems = [
    {
      icon: <GridViewIcon />,
      text: "DASHBOARD",
      path: ["/user/dashboard"],
    },
    {
      icon: <SubscriptionsIcon />,
      text: "SUBSCRIPTIONS",
      path: [
        "/user/subscriptions",
        "/user/trainer-videos",
        "/user/trainer/video",
      ],
    },
    {
      icon: <CollectionsBookmarkIcon />,
      text: "BOOKINGS",
      path: ["/user/bookings"],
    },
    {
      icon: <ChatIcon />,
      text: "CHAT",
      path: ["/user/chats"],
    },
    {
      icon: <AccountCircle />,
      text: "PROFILE",
      path: ["/user/profile"],
    },
    {
      icon: <FiTrendingUp />,
      text: "WORKOUTS",
      path: ["/user/workouts"],
    },
  ];

  useEffect(() => {
    if (!user?._id) {
      console.log("No user ID, skipping socket setup");
      return;
    }
    console.log("Registering user with socket:", user._id);
    socket.emit("register", user._id);
    socket.on("connect", () => {
      console.log("Socket connected in ULProfile:", socket.id);
      socket.emit("register", user._id);
    });

    socket.on(
      "incomingCall",
      (data: {
        callerId: string;
        roomId: string;
        appointmentId: string;
        trainerName: string;
        appointmentTime: string;
        appointmentDate: string;
      }) => {
        console.log("incoming call event triggered", data);
        const {
          callerId,
          roomId,
          appointmentId,
          trainerName,
          appointmentTime,
          appointmentDate,
        } = data;
        if (
          callerId &&
          roomId &&
          appointmentId &&
          trainerName &&
          appointmentTime &&
          appointmentDate
        ) {
          setIncomingCallData({
            trainerName,
            appointmentTime,
            appointmentDate,
            callerId,
            roomId,
            appointmentId,
          });
          setCallDialogOpen(true);
          console.log("Modal should open, callDialogOpen:", true);
        }
      }
    );

    socket.on("callEnded", () => {
      console.log("Call ended");
      setCallActive(false);
      setRoomId(null);
    });

    return () => {
      socket.off("connect");
      socket.off("incomingCall");
      socket.off("callStarted");
      socket.off("callEnded");
    };
  }, [user?._id]);

  const handleAcceptCall = () => {
    if (incomingCallData) {
      setRoomId(incomingCallData.roomId);
      setCallActive(true);
      socket.emit("acceptVideoCall", {
        roomId: incomingCallData.roomId,
        userId: user?._id,
      });
    }
    setCallDialogOpen(false);
    setIncomingCallData(null);
  };

  const handleRejectCall = () => {
    if (incomingCallData) {
      socket.emit("rejectVideoCall", { roomId: incomingCallData.roomId });
    }
    setCallDialogOpen(false);
    setIncomingCallData(null);
  };

  const handleEndCall = () => {
    if (roomId) {
      socket.emit("videoCallEnded", { roomId });
    }
    setCallActive(false);
    setRoomId(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar />
      <div className="flex flex-1">
        <div className="w-24 hidden md:block md:w-24">
          <SideNavBar navItems={userNavItems} />
        </div>
        <div className="flex-1 pl-2 pr-2 pt-15 overflow-auto">
          <Outlet />
          {callActive && roomId && (
            <div style={{ position: "fixed", top: 0, left: 0, zIndex: 1000 }}>
              <ZegoCloudVideoCall
                roomId={roomId}
                userId={user?._id as string}
                userName={`${user?.fname} ${user?.lname}`}
                onEndCall={handleEndCall}
              />
            </div>
          )}
        </div>
      </div>
      <ConfirmationModalDialog
        open={callDialogOpen as boolean}
        content={
          incomingCallData &&
          `Incoming call from ${incomingCallData?.trainerName} for appointment at ${incomingCallData?.appointmentTime} on ${new Date(incomingCallData.appointmentDate).toLocaleDateString()}. Accept?`
        }
        onConfirm={handleAcceptCall}
        onCancel={handleRejectCall}
        confirmText="Accept"
        cancelText="Reject"
        confirmColor="success"
        cancelColor="error"
      />
    </div>
  );
};

export default ULProfile;
