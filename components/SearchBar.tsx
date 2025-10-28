import { StyleSheet, TextInput, View } from "react-native";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (text: string) => void;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by first or last name..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginVertical: 10,
    alignSelf: "center",
  },
  input: {
    height: 40,
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
});
