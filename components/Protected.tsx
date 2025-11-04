import { useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../app/context/AuthProvider";

/**
 * Wrap any screens/groups that require authentication with <Protected>.
 * If not authenticated, the user is redirected to /login.
 */
export default function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments(); // useful for future: allow public groups

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
    }
  }, [loading, user, router, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  // If user exists, render the protected tree
  return <>{children}</>;
}
