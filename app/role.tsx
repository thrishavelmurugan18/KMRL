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
    <LinearGradient
      colors={["#FF6F00", "#D84315"]}
      style={styles.gradientContainer}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Select Your Role</Text>

        {roles.map((r) => (
          <TouchableOpacity
            key={r}
            onPress={() => selectRole(r)}
            activeOpacity={0.8}
          >
            <View style={styles.roleBtn}>
              <Text style={styles.roleText}>{r}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },

  container: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#ffffff",
  },

  roleBtn: {
    backgroundColor: "#ffffff", // White role box
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,

    // Shadow for card effect
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },

  roleText: {
    color: "#D84315", // Dark orange text
    fontWeight: "700",
    textAlign: "center",
    fontSize: 15,
  },
});
