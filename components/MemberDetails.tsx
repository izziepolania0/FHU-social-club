import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MemberDetails({
  selectedUser,
  setDisplayMemberDetails,
}: any) {
  if (!selectedUser) return null;

  const handleEmailPress = () => {
    if (selectedUser.showEmail) {
      Linking.openURL(`mailto:${selectedUser.email}`);
    }
  };

  const handlePhonePress = () => {
    if (selectedUser.showPhone) {
      Linking.openURL(`sms:${selectedUser.phone}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setDisplayMemberDetails(false)}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Image source={{ uri: selectedUser.imageURL }} style={styles.image} />
      <Text style={styles.name}>
        {selectedUser.firstName} {selectedUser.lastName}
      </Text>
      <Text style={styles.classification}>{selectedUser.classification}</Text>
      {selectedUser.relationshipStatus && (
        <Text style={styles.relationship}>
          {selectedUser.relationshipStatus}
        </Text>
      )}
      {selectedUser.officer && (
        <Text style={styles.officer}>Officer: {selectedUser.officer}</Text>
      )}

      <View style={styles.contactContainer}>
        {selectedUser.showEmail && (
          <TouchableOpacity
            style={styles.contactButton}
            onPress={handleEmailPress}
          >
            <Ionicons name="mail" size={20} color="#fff" />
            <Text style={styles.contactText}>{selectedUser.email}</Text>
          </TouchableOpacity>
        )}

        {selectedUser.showPhone && (
          <TouchableOpacity
            style={styles.contactButton}
            onPress={handlePhonePress}
          >
            <Ionicons name="chatbubble" size={20} color="#fff" />
            <Text style={styles.contactText}>{selectedUser.phone}</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#0A0A0A",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  backText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 15,
  },
  name: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 6,
  },
  classification: {
    color: "#aaa",
    fontSize: 18,
    marginBottom: 4,
  },
  relationship: {
    color: "#888",
    fontSize: 16,
    marginBottom: 6,
    fontStyle: "italic",
  },
  officer: {
    color: "#5B5BFF",
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "600",
  },
  contactContainer: {
    marginTop: 20,
    width: "100%",
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1C1C",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  contactText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
});
