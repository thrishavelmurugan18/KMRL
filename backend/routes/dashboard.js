const express = require("express");
const router = express.Router();

router.get("/data", (req, res) => {
  const role = req.headers["x-user-role"];

  if (!role) {
    return res.json({
      role: "Unknown",
      totalDocuments: 0,
      unreadMessages: 0,
      historyCount: 0,
      alerts: [],
      activities: [],
    });
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
      { name: "Admin", action: "approved a document", time: "10 mins ago" },
      { name: "Officer", action: "uploaded a file", time: "30 mins ago" },
    ],
  });
});

module.exports = router;
