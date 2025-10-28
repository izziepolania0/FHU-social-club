import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import UserBlock from "../components/UserBlock";

interface DirectoryProps {
  path: string;
  setDisplayMemberDetails: (value: boolean) => void;
  setSelectedUser: (user: any) => void;
  searchQuery: string;
}

export default function Directory({
  path,
  setDisplayMemberDetails,
  setSelectedUser,
  searchQuery,
}: DirectoryProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/izziepolania0/FHU-social-club/main/sample_people_50_v4_with_id.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  if (loading) {
    return (
      <View style={[styles.listContainer, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="#5B5BFF" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.listContainer}>
      {filteredUsers.length === 0 ? (
        <Text style={styles.noResults}>No members found 😕</Text>
      ) : (
        filteredUsers.map((user) => (
          <UserBlock
            key={user.id}
            firstName={user.firstName}
            lastName={user.lastName}
            classification={user.classification}
            relationshipStatus={user.relationshipStatus}
            imageURL={user.imageURL}
            officer={user.officer}
            onPressUserBlock={() => {
              setSelectedUser(user);
              setDisplayMemberDetails(true);
            }}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
    backgroundColor: "#0A0A0A",
    flexGrow: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
  },
  noResults: {
    color: "#ccc",
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },
});
