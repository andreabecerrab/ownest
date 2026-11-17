import { useCallback, useEffect, useRef, useState } from "react";

export type OwnestNotification = {
  title: string;
  text: string;
};

function getNotificationSocketUrl() {
  const configuredUrl = import.meta.env.VITE_NOTIFICATION_URL?.trim();
  if (configuredUrl) {
    try {
      const url = new URL(configuredUrl);
      return url.protocol === "ws:" || url.protocol === "wss:"
        ? url.toString()
        : null;
    } catch {
      return null;
    }
  }

  if (["localhost", "127.0.0.1", "::1"].includes(window.location.hostname)) {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    return `${protocol}//${window.location.hostname}:3001`;
  }

  return null;
}

export function useNotificationSocket(
  onNotification?: (notification: OwnestNotification) => void,
) {
  const socketRef = useRef<WebSocket | null>(null);
  const onNotificationRef = useRef(onNotification);
  const [isConfigured, setIsConfigured] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    onNotificationRef.current = onNotification;
  }, [onNotification]);

  useEffect(() => {
    let disposed = false;
    let reconnectTimeout: number | undefined;
    const socketUrl = getNotificationSocketUrl();

    setIsConfigured(socketUrl !== null);
    if (!socketUrl) return;

    const connect = () => {
      const socket = new WebSocket(socketUrl);
      socketRef.current = socket;
      socket.onopen = () => setIsConnected(true);
      socket.onclose = () => {
        setIsConnected(false);
        if (socketRef.current === socket) socketRef.current = null;
        if (!disposed) reconnectTimeout = window.setTimeout(connect, 1000);
      };
      socket.onerror = () => socket.close();
      socket.onmessage = (event) => {
        try {
          const value: unknown = JSON.parse(event.data);
          if (
            typeof value === "object" &&
            value !== null &&
            "title" in value &&
            "text" in value &&
            typeof value.title === "string" &&
            typeof value.text === "string"
          ) {
            onNotificationRef.current?.({
              title: value.title,
              text: value.text,
            });
          }
        } catch {
          // Ignore malformed socket messages.
        }
      };
    };

    connect();

    return () => {
      disposed = true;
      if (reconnectTimeout !== undefined) {
        window.clearTimeout(reconnectTimeout);
      }
      socketRef.current?.close();
      socketRef.current = null;
    };
  }, []);

  return {
    isConfigured,
    isConnected,
    sendNotification: useCallback((notification: OwnestNotification) => {
      const socket = socketRef.current;
      if (socket?.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(notification));
      }
    }, []),
  };
}