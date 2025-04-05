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

  useEffect(() => {
    const myMeeting = async (element: HTMLElement | null) => {
      if (!element) return;

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
      zp.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        onLeaveRoom: () => {
          onEndCall();
        },
      });
    };


    myMeeting(containerRef.current);
  }, [roomId, userId, userName, onEndCall]);

  return (
    <Box ref={containerRef} sx={{ width: "100vw", height: "100vh" }}></Box>
  );
};

export default ZegoCloudVideoCall;
