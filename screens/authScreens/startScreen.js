import { StatusBar } from "expo-status-bar";
import { useContext, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  useColorScheme,
} from "react-native";
import Button from "../../components/ui/button";
import { alignment } from "../../constants/styles";
import { AuthContext } from "../../store/auth-context";

export default function StartScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const theme = useColorScheme();

  useEffect(() => {
    authCtx.setTheme(theme);
  }, [theme]);

  function loginHandler() {
    navigation.navigate("login");
  }

  function signupHandler() {
    navigation.navigate("signUp");
  }

  return (
    <>
      <StatusBar style="light" />
      <ImageBackground
        source={
          theme === "dark"
            ? require("../../assets/images/signup_background.png")
            : require("../../assets/images/light_background.png")
        }
        style={styles.root}
        resizeMode="cover"
      >
        <View style={alignment.outerContainer}>
          <View style={alignment.innerContainer}>
            <View>
              <Text style={styles.text}>Let's connect</Text>
              <Text style={styles.text}>with each other</Text>
            </View>
            <Image
              source={require("../../assets/images/signup_one.png")}
              resizeMode="contain"
              style={styles.image}
            />
            <View>
              <Text style={styles.text}>
                A message is a discrete communication{" "}
              </Text>
              <Text style={styles.text}>
                intended by the source consumption.
              </Text>
            </View>
          </View>
          <View>
            <Button title="Log in" onPress={loginHandler} />
            <Button title="Sign up" onPress={signupHandler} />
          </View>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  // outerContainer: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "space-evenly",
  // },
  // innerContainer: {
  //   alignItems: "center",
  // },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  image: {
    width: 350,
    marginVertical: 10,
  },
});
