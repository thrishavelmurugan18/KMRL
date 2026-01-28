const express = require("express");
const router = express.Router();

// Dashboard data for each role
const dashboards = {
  "Super Admin": {
    role: "Super Admin",
    totalDocuments: 5000,
    unreadMessages: 120,
    historyCount: 4300,
    alerts: [
      { title: "System health check required", time: "5 mins ago" },
      { title: "Database backup pending", time: "Yesterday" },
    ],
    activities: [
      { name: "IT Team", action: "Updated server security", time: "10 mins ago" },
      { name: "Admin", action: "Approved 5 new users", time: "1 hour ago" },
    ],
  },

  "Department Admin": {
    role: "Department Admin",
    totalDocuments: 1200,
    unreadMessages: 48,
    historyCount: 920,
    alerts: [
      { title: "Train Delay at Station A", time: "10 mins ago" },
      { title: "Safety audit pending", time: "Yesterday" },
    ],
    activities: [
      { name: "Thrisha", action: "Uploaded a document", time: "5 mins ago" },
      { name: "Audit Team", action: "Checked compliance report", time: "2 hours ago" },
    ],
  },

  "Officer / Manager": {
    role: "Officer / Manager",
    totalDocuments: 650,
    unreadMessages: 25,
    historyCount: 500,
    alerts: [
      { title: "New report assigned", time: "20 mins ago" },
    ],
    activities: [
      { name: "Manager", action: "Reviewed station report", time: "30 mins ago" },
    ],
  },

  "Staff / Executive": {
    role: "Staff / Executive",
    totalDocuments: 300,
    unreadMessages: 10,
    historyCount: 250,
    alerts: [
      { title: "Task deadline today", time: "1 hour ago" },
    ],
    activities: [
      { name: "You", action: "Uploaded shift report", time: "15 mins ago" },
    ],
  },

  "Station Controller": {
    role: "Station Controller",
    totalDocuments: 900,
    unreadMessages: 35,
    historyCount: 750,
    alerts: [
      { title: "Platform congestion alert", time: "2 mins ago" },
    ],
    activities: [
      { name: "Control Room", action: "Updated platform status", time: "5 mins ago" },
    ],
  },

  "Train Operations Team": {
    role: "Train Operations Team",
    totalDocuments: 1400,
    unreadMessages: 60,
    historyCount: 1200,
    alerts: [
      { title: "Train schedule updated", time: "8 mins ago" },
    ],
    activities: [
      { name: "Ops Team", action: "Rescheduled Train 204", time: "12 mins ago" },
    ],
  },

  "Safety & Compliance Officer": {
    role: "Safety & Compliance Officer",
    totalDocuments: 1100,
    unreadMessages: 40,
    historyCount: 980,
    alerts: [
      { title: "Safety inspection pending", time: "Today" },
    ],
    activities: [
      { name: "Safety Team", action: "Reviewed incident report", time: "25 mins ago" },
    ],
  },

  "IT / System Maintenance Team": {
    role: "IT / System Maintenance Team",
    totalDocuments: 2000,
    unreadMessages: 90,
    historyCount: 1800,
    alerts: [
      { title: "Server CPU usage high", time: "3 mins ago" },
    ],
    activities: [
      { name: "System Bot", action: "Restarted server", time: "1 min ago" },
    ],
  },

  "Audit Team": {
    role: "Audit Team",
    totalDocuments: 800,
    unreadMessages: 20,
    historyCount: 700,
    alerts: [
      { title: "Financial audit pending", time: "Yesterday" },
    ],
    activities: [
      { name: "Audit Head", action: "Verified finance records", time: "3 hours ago" },
    ],
  },
};

router.get("/data", (req, res) => {
  const role = req.headers["x-user-role"];

  if (!role || !dashboards[role]) {
    return res.status(400).json({ message: "Invalid or missing role" });
  }

  res.json(dashboards[role]);
});

module.exports = router;
