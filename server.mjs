import http from "http";
import app from "./app.mjs";
import { config } from "./config/config.mjs";
import { mongoConnection } from "./config/db.mjs";
import { initSocket } from "./socket/socket.mjs"; // 👈 ADD

async function startServer() {

  const server = http.createServer(app);

  /// 🔥 Socket init
  initSocket(server);

  server.listen(config.port, async () => {
    await mongoConnection(config.MONGO_URL);
    console.log(`🚀 Server running on http://localhost:${config.port}`);
  });
}

startServer();