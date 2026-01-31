const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "*",
  allowedHeaders: ["Content-Type", "x-user-role"],
}));

app.use(express.json());

app.get("/api/dashboard/data", (req, res) => {
  const role = req.headers["x-user-role"];

  if (!role) {
    return res.status(400).json({ message: "Role missing" });
  }

  res.json({
    role,
    totalDocuments: 500,
    unreadMessages: 12,
    historyCount: 350,
    alerts: [
      { title: "System check", time: "5 mins ago" },
      { title: "Report uploaded", time: "1 hour ago" },
    ],
    activities: [
      { name: "Admin", action: "logged in", time: "10 mins ago" },
    ],
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
