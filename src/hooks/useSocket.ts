import { useMemo, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../interfaces";

export const useSocket = (serverPath: string) => {
  const token=localStorage.getItem("token");
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = useMemo(
    () =>
      io(serverPath, {
        transports: ["websocket", "polling", "flashsocket"],
        rememberUpgrade: true,
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        randomizationFactor: 0.5,
        autoConnect: true,
        timeout: 10000,
        forceNew: true,
        multiplex: true,
        upgrade: false,
        query:{
          "x-token":token
        }
      }),
    [serverPath]
  );
  
  // function conect to socket server

  const [online, setOnline] = useState(false);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {
      console.log("disconnected");
      setOnline(false);
    });
  }, [socket]);

  return {
    socket,
    online,
  };
};
