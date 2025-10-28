import { View } from "@/components/Themed";
import { Pressable, StyleSheet, Text } from "react-native";

interface UserBlockProps {
  firstName: string;
  lastName: string;
  classification: string;
  relationshipStatus: string | undefined;
  onPressUserBlock: (user: {
    firstName: string;
    lastName: string;
    classification: string;
    relationshipStatus: string | undefined;
  }) => void;
}

export default function UserBlock({
  firstName,
  lastName,
  classification,
  relationshipStatus,
  onPressUserBlock,
}: UserBlockProps) {
  return (
    <Pressable
      onPress={() =>
        onPressUserBlock({
          firstName,
          lastName,
          classification,
          relationshipStatus,
        })
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}>
          {firstName} {lastName}
        </Text>
        <Text style={styles.subtitle}>{classification}</Text>
        {relationshipStatus && (
          <Text style={styles.subtitle}>{relationshipStatus}</Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 70,
    borderWidth: 1,
    borderColor: "#000",
    marginVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
    borderRadius: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    color: "#333",
  },
});
