import { StyleSheet, View, Text } from "react-native";

export default function Community() {
  return (
    <View style={styles.container}>
      <Text>Community Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
