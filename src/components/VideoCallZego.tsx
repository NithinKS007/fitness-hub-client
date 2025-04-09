import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { Box } from "@mui/material";

const ZEGO_CLOUD_APP_ID = import.meta.env.VITE_ZEGOCLOUD_APP_ID;
const ZEGOCLOUD_SERVER_SECRET = import.meta.env.VITE_ZEGOCLOUD_SERVER_SECRET;

interface ZegoCloudVideoCallProps {
  roomId: string;
  userId: string;
  userName: string;
  onEndCall: () => void;
}

const ZegoCloudVideoCall: React.FC<ZegoCloudVideoCallProps> = ({
  roomId,
  userId,
  userName,
  onEndCall,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const zpRef = useRef<any>(null);

  useEffect(() => {
    const myMeeting = async (element: HTMLElement | null) => {
      if (!element) return;

      try {
        const appID = Number(ZEGO_CLOUD_APP_ID);
        const serverSecret = ZEGOCLOUD_SERVER_SECRET;
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomId,
          userId,
          userName
        );
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zpRef.current = zp;
        zp.joinRoom({
          container: element,
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
          onLeaveRoom: () => {
            onEndCall();
          },
          showPreJoinView: false, 
          showRoomTimer: true
        });
      } catch (error) {
        console.log("Error joining Zego room:", error);
      }
    };

    myMeeting(containerRef.current);
    return () => {
      if (zpRef.current) {
        zpRef.current.destroy();
      }
    };
  }, [roomId, userId, userName, onEndCall]);

  return (
    <Box ref={containerRef} sx={{ width: "100vw", height: "100vh" }} />
  );
};

export default ZegoCloudVideoCall;