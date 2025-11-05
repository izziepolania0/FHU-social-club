import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "./context/AuthProvider";
import { account, ID } from "./lib/appwrite";

function showError(e: any, title = "Sign up failed") {
  const raw = e?.response
    ? JSON.stringify(e.response, null, 2)
    : e?.message ?? String(e);
  Alert.alert(title, raw);
}

export default function SignupScreen() {
  const router = useRouter();
  const { refresh } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSignup = async () => {
    if (!email || !password || !name) {
      Alert.alert("Missing info", "Please fill name, email, and password.");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Weak password", "Password must be at least 8 characters.");
      return;
    }
    try {
      setSubmitting(true);
      await account.create(ID.unique(), email.trim(), password, name.trim());
      await account.createEmailPasswordSession(email.trim(), password);
      await refresh();
      router.replace("/(tabs)/MemberDirectory");
    } catch (e) {
      showError(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.sub}>Join your club’s directory</Text>

        <TextInput
          style={styles.input}
          placeholder="Full name"
          placeholderTextColor="#9CA3AF"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password (min 8)"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={onSignup}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.muted}>Already have an account?</Text>
          <Link href="/login">
            <Text style={styles.link}> Log in</Text>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    padding: 24,
    justifyContent: "center",
  },
  title: { color: "white", fontSize: 28, fontWeight: "800", marginBottom: 6 },
  sub: { color: "#9CA3AF", marginBottom: 16 },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: "#1F2937",
    color: "white",
    borderWidth: 1,
    borderColor: "#374151",
    marginBottom: 12,
  },
  button: {
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#10B981",
    marginTop: 8,
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "700" },
  row: { flexDirection: "row", marginTop: 16, alignItems: "center" },
  muted: { color: "#9CA3AF" },
  link: { color: "#93C5FD", fontWeight: "700" },
});
