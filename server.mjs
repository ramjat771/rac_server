import http from "http";

import app from "./app.mjs";
import { config } from "./config/config.mjs";
import { mongoConnection } from "./config/db.mjs";


async function startServer() {

  // Create HTTP server
  const server = http.createServer(app);

  // Start server
  server.listen(config.port, async () => {
    await mongoConnection(config.MONGO_URL);
    console.log(`🚀 Server running on http://localhost:${config.port}`);
    
  });

  
}

startServer();
