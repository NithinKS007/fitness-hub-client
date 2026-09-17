import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { Box } from "@mui/material";

interface ZegoCloudVideoCallProps {
  appId: number;
  roomId: string;
  userId: string;
  userName: string;
  token: string;
  onEndCall: () => void;
}

const ZegoCloudVideoCall: React.FC<ZegoCloudVideoCallProps> = ({
  appId,
  roomId,
  userId,
  userName,
  token,
  onEndCall,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const zpRef = useRef<ZegoUIKitPrebuilt | null>(null);
  useEffect(() => {
    const myMeeting = async (element: HTMLElement | null) => {
      if (!element) {
        console.error("Container reference is null");
        return;
      }

      try {
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
          appId,
          token,
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
          showRoomTimer: true,
        });
      } catch (error: any) {
        console.error("Zego Error:", {
          message: error.message,
          stack: error.stack,
          token,
          roomId,
          userId,
        });
      }
    };

    const timeout = setTimeout(() => {
      if (containerRef.current) {
        myMeeting(containerRef.current);
      }
    }, 0);

    return () => {
      clearTimeout(timeout);
      if (zpRef?.current) {
        zpRef?.current?.destroy();
      }
      if (containerRef?.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [roomId, userId, userName, token, onEndCall]);

  return <Box ref={containerRef} sx={{ width: "100vw", height: "100vh" }} />;
};

export default ZegoCloudVideoCall;
