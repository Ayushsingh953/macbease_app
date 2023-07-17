import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Input from "../../components/auth/input";
import IconButton from "../../components/ui/iconButton";
import { Colors } from "../../constants/colors";
import { alignment } from "../../constants/styles";
import { AuthContext } from "../../store/auth-context";
import { getTheme } from "../../utils/getTheme";
import { URL } from "../../utils/backend_config";

export default function LoginScreen() {
  const [enteredEmail, setEnteredEmail] = useState();
  const [enteredPassword, setEnteredPassword] = useState();
  const theme = getTheme();
  const authCtx = useContext(AuthContext);

  function updateValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
    }
  }
  async function submitHandler() {
    if (!enteredEmail || !enteredPassword) {
      Alert.alert(
        "Invalid Input",
        "Please fill out the form first with valid credentials !"
      );
      return;
    }
    console.log("Email " + enteredEmail);
    console.log("Password " + enteredPassword);
    const data = {
      email: enteredEmail,
      password: enteredPassword,
    };
    try {
      const res = await axios.post(`${URL}/auth/user/login`, data);
      console.log(res.data);
      authCtx.authenticate(res.data.token);
      await AsyncStorage.setItem("token", res.data.token);
    } catch (err) {
      console.log(err);
    }
  }

  const backgroundColor =
    theme === "dark" ? Colors.backgroundButton : Colors.backgroundButton_light;

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
        <View style={styles.outerContainer}>
          <View style={alignment.innerContainer}>
            <Image
              source={require("../../assets/images/logo.png")}
              resizeMode="contain"
            />
            <Text style={styles.title}>Welcome back !</Text>
          </View>
          <View style={[styles.quoteContainer, { backgroundColor }]}>
            <Text style={styles.text}>
              You don't always need to understand your journey in life,you just
              need to trust that you're going in the right direction.
            </Text>
          </View>
          <View>
            <Input
              label="Enter email :"
              keyboardType="email-address"
              onUpdateValue={updateValueHandler.bind(this, "email")}
              value={enteredEmail}
            />
            <Input
              label="Enter password :"
              secure
              onUpdateValue={updateValueHandler.bind(this, "password")}
              value={enteredPassword}
            />
          </View>
          <View style={styles.buttonContainer}>
            <IconButton
              name="chevron-forward"
              color="white"
              size={40}
              onPress={submitHandler}
            />
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
  title: {
    color: "white",
    marginTop: -35,
    fontSize: 24,
  },
  text: {
    color: "white",
    fontSize: 18,
    lineHeight: 30,
  },
  quoteContainer: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  outerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContainer: {
    marginBottom: 40,
  },
});
