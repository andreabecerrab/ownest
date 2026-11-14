import { WebSocketServer, WebSocket } from "ws";

const port = Number(process.env.NOTIFICATION_PORT ?? 3001);
const webSocketServer = new WebSocketServer({
  port,
  verifyClient: ({ origin, req }) => {
    if (!origin || !req.headers.host) return false;

    try {
      const originHost = new URL(origin).hostname;
      const requestHost = new URL(`http://${req.headers.host}`).hostname;
      return originHost === requestHost;
    } catch {
      return false;
    }
  },
});

webSocketServer.on("listening", () => {
  console.log(`Notification WebSocket listening on ws://localhost:${port}`);
});

webSocketServer.on("error", (error) => {
  console.error(`Notification WebSocket server error: ${error.message}`);
});

webSocketServer.on("connection", (client) => {
  client.on("message", (rawMessage) => {
    let message;

    try {
      message = JSON.parse(rawMessage.toString());
    } catch {
      return;
    }

    if (
      typeof message.title !== "string" ||
      typeof message.text !== "string" ||
      !message.title.trim() ||
      !message.text.trim() ||
      message.title.length > 100 ||
      message.text.length > 500
    ) {
      return;
    }

    const notification = JSON.stringify({
      title: message.title.trim(),
      text: message.text.trim(),
    });

    for (const subscriber of webSocketServer.clients) {
      if (subscriber.readyState === WebSocket.OPEN) {
        subscriber.send(notification);
      }
    }
  });
});