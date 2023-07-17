import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import { Alert, ImageBackground, StyleSheet, Text, View } from "react-native";
import Input from "../../components/auth/input";
import IconButton from "../../components/ui/iconButton";
import { AuthContext } from "../../store/auth-context";

var theme;
export default function EmailScreen({ navigation }) {
  const [enteredEmail, setEnteredEmail] = useState();
  const authCtx = useContext(AuthContext);
  theme = authCtx.theme;
  function onUpdateValue(value) {
    setEnteredEmail(value);
  }
  function emailSubmitHandler() {
    const email = enteredEmail && enteredEmail.trim();
    const isValid = email && email.includes("@");
    if (!enteredEmail || email.length === 0 || !isValid) {
      Alert.alert("Invalid Input!", "Please provide valid email address.");
      return;
    }
    authCtx.setEmail(email);
    navigation.navigate("username");
  }

  return (
    <>
      <StatusBar style="light" />
      <ImageBackground
        source={
          theme === "dark"
            ? require("../../assets/images/first.png")
            : require("../../assets/images/light_first.png")
        }
        resizeMode="cover"
        style={styles.root}
      >
        <View style={styles.outerContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.text}>
              “What if Steve Jobs didn't meet Steve Wozniac in his college and
              they both didn't drop out? The world would not have Apple?”
            </Text>
            <Input
              label="Enter Email :"
              keyboardType="email-address"
              value={enteredEmail}
              onUpdateValue={onUpdateValue}
            />
          </View>
          <IconButton
            name="chevron-forward"
            color="white"
            size={40}
            onPress={emailSubmitHandler}
          />
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
  },
  outerContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginBottom: 30,
    marginRight: 30,
  },
  innerContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginRight: -30,
  },
});
