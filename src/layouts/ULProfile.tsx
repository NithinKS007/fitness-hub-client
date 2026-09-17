import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import ChatIcon from "@mui/icons-material/Chat";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import SideNavBar from "../components/dashboard/DashBoardSideNavBar";
import TopNavbar from "../components/dashboard/DashBoardTopBar";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import ZegoCloudVideoCall from "../components/VideoCallZego";
import ConfirmationModalDialog from "../components/modals/ConfirmationModalDialog";
import { FiTrendingUp } from "react-icons/fi";
import { AccountCircle } from "@mui/icons-material";
import { showErrorToast } from "../utils/toast";
import { SocketContext } from "../context/SocketContext";
import { useDispatch } from "react-redux";
import { createZegocloudToken } from "../redux/booking/bookingThunk";

interface IncomingCallData {
  trainerName: string;
  appointmentTime: string;
  appointmentDate: string;
  callerId: string;
  roomId: string;
  token: string;
  appId: number;
  appointmentId: string;
}

const ULProfile: React.FC = () => {
  const user = useSelector((state: RootState) => state?.auth?.user);
  const [callActive, setCallActive] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [appId, setAppId] = useState<number | null>(null);
  const [callDialogOpen, setCallDialogOpen] = useState<boolean>(false);
  const [incomingCallData, setIncomingCallData] =
    useState<IncomingCallData | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { socket, isSocketConnected } = useContext(SocketContext) || {
    socket: null,
    isSocketConnected: false,
  };
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
        "/user/trainer-booking-slot",
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
    if (!socket || !isSocketConnected) return;
    socket.on("incomingCall", async (data: IncomingCallData) => {
      const {
        callerId,
        roomId,
        token,
        appId,
        appointmentId,
        trainerName,
        appointmentTime,
        appointmentDate,
      } = data;
      if (
        callerId &&
        roomId &&
        token &&
        appId &&
        appointmentId &&
        trainerName &&
        appointmentTime &&
        appointmentDate
      ) {
        console.log(
          "incoming in user profile for call in socket",
          roomId,
          token,
          appId
        );

        const response = await dispatch(createZegocloudToken()).unwrap();
        setIncomingCallData({
          trainerName,
          appointmentTime,
          appointmentDate,
          callerId,
          roomId,
          token:response.data.token,
          appId:response.data.appId,
          appointmentId,
        });
        setCallDialogOpen(true);
      }
    });

    socket.on("callEnded", () => {
      setCallActive(false);
      setRoomId(null);
    });

    socket.on(
      "error",
      async ({ message, code }: { message: string; code: number }) => {
        console.log("status code", message, code);
        showErrorToast(message);
        console.log("Unhandled error code:", message, code);
      }
    );

    return () => {
      socket.off("incomingCall");
      socket.off("callStarted");
      socket.off("callEnded");
      socket.off("error");
    };
  }, [socket, isSocketConnected]);

  const handleAcceptCall = () => {
    if (!socket || !isSocketConnected) return;
    if (incomingCallData && user) {
      const { roomId, token, appId } = incomingCallData;
      setRoomId(roomId);
      setToken(token);
      setAppId(appId);
      setCallActive(true);
      socket.emit("acceptVC", {
        roomId: roomId,
        userId: user?.id,
      });
    }
    setCallDialogOpen(false);
    setIncomingCallData(null);
  };

  const handleRejectCall = () => {
    if (!socket || !isSocketConnected) return;
    if (incomingCallData) {
      const { roomId } = incomingCallData;
      socket.emit("rejectVC", { roomId: roomId });
    }
    setCallDialogOpen(false);
    setIncomingCallData(null);
  };

  const handleEndCall = () => {
    if (!socket || !isSocketConnected) return;
    if (roomId) {
      socket.emit("endVC", { roomId });
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
        <div className="flex-1 pl-2 pr-2 pt-17 overflow-auto">
          <Outlet />
          {callActive && roomId && user && appId && token && (
            <div style={{ position: "fixed", top: 0, left: 0, zIndex: 1000 }}>
              <ZegoCloudVideoCall
                roomId={roomId}
                userId={user?.id}
                userName={`${user?.fname} ${user?.lname}`}
                onEndCall={handleEndCall}
                token={token}
                appId={appId}
              />
            </div>
          )}
        </div>
      </div>
      <ConfirmationModalDialog
        open={callDialogOpen}
        content={
          incomingCallData
            ? `Incoming call from ${
                incomingCallData.trainerName
              } for appointment at ${
                incomingCallData.appointmentTime
              } on ${new Date(
                incomingCallData.appointmentDate
              ).toLocaleDateString()}. Accept?`
            : "No incoming call data available."
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
