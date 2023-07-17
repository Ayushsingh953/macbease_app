import { useContext } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "../../store/auth-context";

export default function Socail() {
  const authCtx = useContext(AuthContext);
  async function logout() {
    authCtx.logout();
    await AsyncStorage.removeItem("token");
  }
  return (
    <View style={styles.container}>
      <Text>Socail Screen</Text>
      <Button title="Logout" onPress={logout} />
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
