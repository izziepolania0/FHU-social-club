import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface UserBlockProps {
  firstName: string;
  lastName: string;
  classification: string;
  relationshipStatus?: string;
  imageURL?: string;
  officer?: string;
  onPressUserBlock: () => void;
}

export default function UserBlock({
  firstName,
  lastName,
  classification,
  relationshipStatus,
  imageURL,
  officer,
  onPressUserBlock,
}: UserBlockProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPressUserBlock}>
      <Image
        source={{ uri: imageURL || "https://via.placeholder.com/100" }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>
          {firstName} {lastName}
        </Text>
        <Text style={styles.classification}>{classification}</Text>
        {relationshipStatus && (
          <Text style={styles.relationship}>{relationshipStatus}</Text>
        )}
        {officer && <Text style={styles.officer}>{officer}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1C1C",
    borderRadius: 12,
    padding: 12,
    margin: 8,
    width: 320,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  classification: {
    color: "#ccc",
    fontSize: 14,
  },
  relationship: {
    color: "#888",
    fontSize: 13,
    fontStyle: "italic",
  },
  officer: {
    color: "#5B5BFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
