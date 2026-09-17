import { createContext, useEffect, useMemo, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { clearAuthPerson, setToken } from "../redux/auth/authSlice";
import { showErrorToast } from "../utils/toast";
import store, { AppDispatch, RootState } from "../redux/store";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { refreshAT } from "../redux/auth/authThunk";

interface SocketContextType {
  socket: typeof Socket | null;
  isSocketConnected: boolean;
}

interface SocketError extends Error {
  statusCode: number;
  message: string;
}

export const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false);
  const isRefreshing = useRef(false);
  const socketInstance = useRef<typeof Socket | null>(null);

  const refreshAccessToken = async () => {
    if (isRefreshing.current) {
      console.log("Token refresh already in progress, skipping...");
      return;
    }
    isRefreshing.current = true;
    try {
      const newAccessToken = await dispatch(refreshAT()).unwrap();
      dispatch(setToken(newAccessToken));

      if (socketInstance.current) {
        (socketInstance.current as { auth?: { accessToken: string } }).auth = {
          accessToken: newAccessToken,
        };
        socketInstance.current.disconnect().connect();
      }
      console.log("Token refreshed successfully  in socket!");
    } catch (error: any) {
      console.log("Refresh token failed", error);
      store.dispatch(clearAuthPerson());
      window.location.href = "/sign-in";
      showErrorToast("Your session has expired. Please sign-in again.");
    } finally {
      isRefreshing.current = false;
    }
  };

  useEffect(() => {
    if (!accessToken) return;
    const socketconnection = io(import.meta.env.VITE_API_URL_BACKEND_URL, {
      auth: { accessToken },
    });

    socketInstance.current = socketconnection;
    socketconnection.on("connect", () => {
      console.log("Socket connected!");
      setIsSocketConnected(true);
    });

    socketconnection.on("disconnect", () => {
      console.log("Socket disconnected!");
      setIsSocketConnected(false);
    });

    socketconnection.on("authError", async (err: SocketError) => {
      console.log(
        "socket connection error occured",
        err.message,
        err.statusCode
      );
      const statusCode = err.statusCode;
      if (statusCode === 401 && !isRefreshing.current) {
        console.log(
          "Socket 401 Unauthorized detected, attempting token refresh..."
        );
        refreshAccessToken();
      } else if (statusCode === 403) {
        dispatch(clearAuthPerson());
        showErrorToast(
          err.message || "Your account is blocked or permission denied."
        );
        window.location.href = "/sign-in";
      }
    });

    socketconnection.on("connection_error", (err: any) => {
      console.error("Socket connection error:", err.message);
      showErrorToast("Socket connection error. Please try again.");
    });

    return () => {
      if (socketInstance.current) {
        socketInstance.current.off("connect");
        socketInstance.current.off("disconnect");
        socketInstance.current.off("authError");
        socketInstance.current.off("connection_error");
        socketInstance.current.disconnect();
        socketInstance.current = null;
      }
    };
  }, [accessToken, dispatch]);

  const contextValue = useMemo(
    () => ({ socket: socketInstance.current, isSocketConnected }),
    [isSocketConnected]
  );
  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};
