import { useCallback, useEffect, useRef, useState } from "react";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "../../supabaseClient";

export type OwnestNotification = {
  title: string;
  text: string;
};

function isNotification(value: unknown): value is OwnestNotification {
  return (
    typeof value === "object" &&
    value !== null &&
    "title" in value &&
    "text" in value &&
    typeof value.title === "string" &&
    typeof value.text === "string"
  );
}

export function useNotificationRealtime(
  onNotification?: (notification: OwnestNotification) => void,
) {
  const channelRef = useRef<RealtimeChannel | null>(null);
  const onNotificationRef = useRef(onNotification);
  const [isConfigured, setIsConfigured] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    onNotificationRef.current = onNotification;
  }, [onNotification]);

  useEffect(() => {
    let disposed = false;
    const client = supabase;
    setIsConfigured(client !== null);
    if (!client) return;

    const channel = client
      .channel("ownest-notifications", {
        config: { broadcast: { self: false } },
      })
      .on("broadcast", { event: "notification" }, ({ payload }) => {
        if (isNotification(payload)) {
          onNotificationRef.current?.(payload);
        }
      });

    channelRef.current = channel;
    channel.subscribe((status) => {
      if (!disposed) setIsConnected(status === "SUBSCRIBED");
    });

    return () => {
      disposed = true;
      if (channelRef.current === channel) channelRef.current = null;
      void client.removeChannel(channel);
    };
  }, []);

  return {
    isConfigured,
    isConnected,
    sendNotification: useCallback(async (notification: OwnestNotification) => {
      const channel = channelRef.current;
      if (!channel || !supabase) return;

      const result = await channel.send({
        type: "broadcast",
        event: "notification",
        payload: notification,
      });

      if (result !== "ok") {
        console.error("Unable to send notification:", result);
      }
    }, []),
  };
}