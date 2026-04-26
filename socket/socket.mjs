import { Server } from "socket.io";
const users = new Map();       // username → socketId
const sockets = new Map();     // socketId → username
export function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Connected:", socket.id);

    // ✅ Get username from AUTH or QUERY
    const username =
      socket.handshake.auth?.username ||
      socket.handshake.query?.username;

    if (!username) {
      console.log("❌ No username provided");
      socket.disconnect();
      return;
    }

    // ✅ Store user
    users.set(username, socket.id);
    sockets.set(socket.id, username);

    console.log("👤 Registered:", username);

/// MESSAGE
    socket.on("msg", (data) => {
      const targetSocket = users.get(data.target);

      if (targetSocket) {
        io.to(targetSocket).emit("msg", {
          ...data,
          from: username,
        });
                console.log("Found target",data);

      } else {
        console.log("❌ Target not found:", data);
          

  socket.emit("msg", {
      ...data,
      subtype: "noTarget",
      message: "User not available",
      from: username,
    });


      }
    });


    /// 📞 OFFER
    socket.on("offer", (data) => {
      const targetSocket = users.get(data.target);

      if (targetSocket) {
        io.to(targetSocket).emit("offer", {
          ...data,
          from: username,
        });
                console.log("Found target",data);

      } else {
        console.log("❌ Target not found:", data.target);
      }
    });

    /// 📞 ANSWER
    socket.on("answer", (data) => {
      const targetSocket = users.get(data.target);

      if (targetSocket) {
        io.to(targetSocket).emit("answer", {
          ...data,
          from: username,
        });
      }
    });

    /// ❄️ ICE
    socket.on("ice", (data) => {
      const targetSocket = users.get(data.target);

      if (targetSocket) {
        io.to(targetSocket).emit("ice", {
          ...data,
          from: username,
        });
      }
    });

    /// 🔴 Disconnect
    socket.on("disconnect", () => {
      console.log("🔴 Disconnected:", socket.id);

      const user = sockets.get(socket.id);

      if (user) {
        users.delete(user);
        sockets.delete(socket.id);
        console.log("❌ Removed:", user);
      }
    });
  });

  return io;
}