import React from "react";
import { StyleSheet, View } from "react-native";
import UserBlock from "./UserBlock";

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
  const users = require("../app/users.json");

  // Filter users by first or last name
  const filteredUsers = users.filter((user: any) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <View style={styles.listContainer}>
      {filteredUsers.map((user: any) => (
        <UserBlock
          key={user.id}
          firstName={user.firstName}
          lastName={user.lastName}
          classification={user.classification}
          relationshipStatus={user.relationshipStatus}
          onPressUserBlock={(selectedUser) => {
            setSelectedUser(selectedUser);
            setDisplayMemberDetails(true);
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingVertical: 10,
  },
});
