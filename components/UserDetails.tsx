import { Pressable, StyleSheet, Text, View } from "react-native";

interface UserDetailsProps {
  user: {
    firstName: string;
    lastName: string;
    classification: string;
    relationshipStatus: string | undefined;
  };
  onBack: () => void;
}

export default function UserDetails({ user, onBack }: UserDetailsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {user.firstName} {user.lastName}
      </Text>
      <Text style={styles.text}>Classification: {user.classification}</Text>
      <Text style={styles.text}>
        Relationship Status: {user.relationshipStatus || "N/A"}
      </Text>

      <Pressable onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>← Back to Directory</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 5,
  },
  backText: {
    color: "#fff",
  },
});
