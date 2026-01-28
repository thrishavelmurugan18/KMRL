import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

const PRIMARY = "#28a99e";
const ORANGE = "#FF6F00";
const DARK_ORANGE = "#D84315";

export default function Dashboard() {
  const params = useLocalSearchParams();
  const role = params.role as string;

  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch("http://192.168.1.49:5000/api/dashboard/data", {
        headers: {
          "x-user-role": role,
        },
      });

      const data = await res.json();
      setDashboard(data);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={PRIMARY} />
        <Text>Loading Dashboard...</Text>
      </View>
    );
  }

  if (!dashboard) {
    return (
      <View style={styles.center}>
        <Text>No Dashboard Data</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>KMRL Dashboard</Text>
          <Text style={styles.role}>Role : {dashboard.role}</Text>
        </View>

        {/* STATS CARDS */}
        <View style={styles.cardsRow}>
          <View style={[styles.card, { backgroundColor: "#4da6ff" }]}>
            <Text style={styles.cardTitle}>Total Documents</Text>
            <Text style={styles.cardValue}>{dashboard.totalDocuments}</Text>
          </View>

          <View style={[styles.card, { backgroundColor: ORANGE }]}>
            <Text style={styles.cardTitle}>Unread Messages</Text>
            <Text style={styles.cardValue}>{dashboard.unreadMessages}</Text>
          </View>

          <View style={[styles.card, { backgroundColor: "#4caf50" }]}>
            <Text style={styles.cardTitle}>History</Text>
            <Text style={styles.cardValue}>{dashboard.historyCount}</Text>
          </View>
        </View>

        {/* ALERTS */}
        <Text style={styles.sectionTitle}>Alerts</Text>
        <View style={styles.box}>
          {dashboard.alerts.map((a: any, i: number) => (
            <View key={i} style={styles.alertItem}>
              <Text style={styles.alertTitle}>{a.title}</Text>
              <Text style={styles.alertTime}>{a.time}</Text>
            </View>
          ))}
        </View>

        {/* QUICK ACTIONS */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.cardsRow}>
          <View style={[styles.actionCard, { backgroundColor: PRIMARY }]}>
            <Text style={styles.actionText}>Upload</Text>
          </View>
          <View style={[styles.actionCard, { backgroundColor: ORANGE }]}>
            <Text style={styles.actionText}>History</Text>
          </View>
          <View style={[styles.actionCard, { backgroundColor: "#4caf50" }]}>
            <Text style={styles.actionText}>Reports</Text>
          </View>
        </View>

        {/* RECENT ACTIVITY */}
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.box}>
          {dashboard.activities.map((a: any, i: number) => (
            <View key={i} style={styles.activityItem}>
              <Text style={styles.activityText}>
                <Text style={{ fontWeight: "700" }}>{a.name}</Text> {a.action}
              </Text>
              <Text style={styles.alertTime}>{a.time}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navTextActive}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Uploads</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Approvals</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Reports</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7f9",
    paddingHorizontal: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    marginTop: 20,
    marginBottom: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1f2933",
  },

  role: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },

  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },

  card: {
    width: "30%",
    borderRadius: 14,
    padding: 14,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 12,
  },

  cardValue: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 20,
    color: "#1f2933",
  },

  box: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },

  alertItem: {
    marginBottom: 12,
  },

  alertTitle: {
    fontWeight: "600",
    color: "#333",
  },

  alertTime: {
    fontSize: 12,
    color: "#777",
  },

  actionCard: {
    width: "30%",
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
  },

  actionText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },

  activityItem: {
    marginBottom: 14,
  },

  activityText: {
    fontSize: 13,
    color: "#333",
  },

  /* Bottom Navigation */
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ffffff",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },

  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },

  navText: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
  },

  navTextActive: {
    fontSize: 12,
    color: PRIMARY,
    fontWeight: "700",
  },
});
