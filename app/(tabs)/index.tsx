import Directory from "@/components/Directory";
import SearchBar from "@/components/SearchBar";
import { Text, View } from "@/components/Themed";
import UserDetails from "@/components/UserDetails";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function TabOneScreen() {
  const [displayMemberDetails, setDisplayMemberDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ScrollView>
      <View style={styles.container}>
        {!displayMemberDetails ? (
          <>
            <Text style={styles.title}>Directory</Text>
            <View
              style={styles.separator}
              lightColor="#eee"
              darkColor="rgba(255,255,255,0.1)"
            />
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <Directory
              path="app/(tabs)/index.tsx"
              setDisplayMemberDetails={setDisplayMemberDetails}
              setSelectedUser={setSelectedUser}
              searchQuery={searchQuery}
            />
          </>
        ) : (
          <UserDetails
            user={selectedUser}
            onBack={() => setDisplayMemberDetails(false)}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
