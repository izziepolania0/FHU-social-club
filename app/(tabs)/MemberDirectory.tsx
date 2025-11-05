import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import Directory from "../../components/Directory";
import MemberDetails from "../../components/MemberDetails";

export default function Index() {
  const [displayMemberDetails, setDisplayMemberDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      {!displayMemberDetails && (
        <TextInput
          style={styles.searchInput}
          placeholder="Search members..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      )}

      {!displayMemberDetails ? (
        <Directory
          path=""
          setDisplayMemberDetails={setDisplayMemberDetails}
          setSelectedUser={setSelectedUser}
          searchQuery={searchQuery}
        />
      ) : (
        <MemberDetails
          selectedUser={selectedUser}
          setDisplayMemberDetails={setDisplayMemberDetails}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  searchInput: {
    height: 50,
    margin: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#1C1C1C",
    color: "#fff",
    fontSize: 16,
  },
});
