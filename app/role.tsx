import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const roles = [
  "Super Admin",
  "Department Admin",
  "Officer / Manager",
  "Staff / Executive",
  "Station Controller",
  "Train Operations Team",
  "Safety & Compliance Officer",
  "IT / System Maintenance Team",
  "Audit Team",
];

export default function RoleScreen() {
  const selectRole = (role: string) => {
    router.push({
      pathname: "/dashboard",
      params: { role },
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Select Your Role</Text>

      {roles.map((r) => (
        <TouchableOpacity key={r} onPress={() => selectRole(r)} activeOpacity={0.85}>
          <LinearGradient
            colors={["#FF6F00", "#D84315"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.roleBtn}
          >
            <Text style={styles.roleText}>{r}</Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f7f9",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#1f2933",
  },

  roleBtn: {
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  roleText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});
