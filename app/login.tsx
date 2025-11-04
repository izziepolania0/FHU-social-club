import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Please sign in to continue</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.replace("/(tabs)");
        }}
      >
        <Text style={styles.buttonText}>Continue (Temporary)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: { color: "white", fontSize: 28, fontWeight: "700", marginBottom: 8 },
  subtitle: { color: "#aaa", fontSize: 16, marginBottom: 24 },
  button: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: { color: "white", fontWeight: "600", fontSize: 16 },
});
