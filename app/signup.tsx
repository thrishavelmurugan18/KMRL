import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import axios from "axios";

export default function Signup() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    let temp: any = {};

    if (!form.name.trim()) temp.name = "Name is required";

    if (!form.email) temp.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      temp.email = "Enter a valid email address";

    if (!form.password) temp.password = "Password is required";

    if (form.confirmPassword !== form.password)
      temp.confirmPassword = "Passwords do not match";

    if (!form.phone) temp.phone = "Phone number is required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSignup = async () => {
    if (!validate()) return;

    try {
      // mock API call
      Alert.alert("Success", "Account created successfully!");
      // 🔥 Signup → Login
      router.replace("/login");
    } catch (err: any) {
      Alert.alert("Error", "Signup failed");
    }
  };

  return (
    <LinearGradient colors={["#ffffff", "#ffffff"]} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>KMRL Railway Portal</Text>
        <Text style={styles.subtitle}>Create Account</Text>

        {["name", "email", "password", "confirmPassword", "phone"].map(
          (field) => (
            <View key={field}>
              <TextInput
                placeholder={
                  field === "confirmPassword"
                    ? "Confirm Password"
                    : field.charAt(0).toUpperCase() + field.slice(1)
                }
                secureTextEntry={field.includes("password")}
                keyboardType={field === "phone" ? "numeric" : "default"}
                style={[styles.input, errors[field] && styles.inputError]}
                value={(form as any)[field]}
                onChangeText={(text) =>
                  setForm({ ...form, [field]: text })
                }
              />
              {errors[field] && (
                <Text style={styles.error}>{errors[field]}</Text>
              )}
            </View>
          )
        )}

        <TouchableOpacity activeOpacity={0.85} onPress={handleSignup}>
          <LinearGradient
            colors={["#FF6F00", "#D84315"]}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace("/login")}>
          <Text style={styles.register}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  card: {
    width: "100%",
    maxWidth: 450,
    backgroundColor: "#ffffff",
    padding: 35,
    borderRadius: 20,
    elevation: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 25,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 12,
  },

  inputError: {
    borderColor: "#C53030",
  },

  error: {
    color: "#C53030",
    fontSize: 12,
    marginBottom: 8,
  },

  button: {
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  register: {
    marginTop: 20,
    textAlign: "center",
    color: "#C2410C",
  },
});
