import { Server } from "socket.io";

const users = new Map(); // username → socketId

export function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Connected:", socket.id);

    /// 🔐 Register
    socket.on("register", (username) => {
      users.set(username, socket.id);
      console.log("👤 Registered:", username);
    });

    /// 📞 OFFER
    socket.on("offer", (data) => {
      const targetSocket = users.get(data.target);

      if (targetSocket) {
        io.to(targetSocket).emit("offer", data);
      } else {
        console.log("❌ Target not found:", data.target);
      }
    });

    /// 📞 ANSWER
    socket.on("answer", (data) => {
      const targetSocket = users.get(data.target);

      if (targetSocket) {
        io.to(targetSocket).emit("answer", data);
      }
    });

    /// ❄️ ICE
    socket.on("ice", (data) => {
      const targetSocket = users.get(data.target);

      if (targetSocket) {
        io.to(targetSocket).emit("ice", data);
      }
    });

    /// 🔴 Disconnect
    socket.on("disconnect", () => {
      console.log("🔴 Disconnected:", socket.id);

      for (const [user, id] of users.entries()) {
        if (id === socket.id) {
          users.delete(user);
          console.log("❌ Removed:", user);
          break;
        }
      }
    });
  });

  return io;
}