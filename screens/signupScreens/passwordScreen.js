import { useContext, useState } from "react";
import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import axios from "axios";

import Input from "../../components/auth/input";
import IconButton from "../../components/ui/iconButton";
import { AuthContext } from "../../store/auth-context";
import { URL } from "../../utils/backend_config";
import AsyncStorage from "@react-native-async-storage/async-storage";

var theme;
export default function PasswordScreen() {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const authCtx = useContext(AuthContext);
  theme = authCtx.theme;

  function onUpdateValue(inputType, value) {
    switch (inputType) {
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
    }
  }
  async function submitHandler() {
    if (!password || !confirmPassword) {
      Alert.alert("Invalid Input!", "Please fill the form before submitting.");
      return;
    }
    if (password.length < 6) {
      Alert.alert(
        "Incorrect password",
        "Password should be more than 6 characters."
      );
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Passwords don't match", "Please check the credentials.");
      return;
    }
    authCtx.setPassword(password);

    const data = {
      name: authCtx.username,
      reg: authCtx.registration,
      email: authCtx.email,
      password: password,
    };

    console.log(data);

    try {
      console.log(URL);
      const res = await axios.post(`${URL}/auth/user/register`, data);
      console.log(res.data);
      authCtx.authenticate(res.data.token);
      await AsyncStorage.setItem("token", res.data.token);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ImageBackground
      source={
        theme === "dark"
          ? require("../../assets/images/third.png")
          : require("../../assets/images/light_third.png")
      }
      resizeMode="cover"
      style={styles.root}
    >
      <View style={styles.container}>
        <View style={styles.commonConatiner}>
          <Text style={styles.text}>
            Dell,WhatsApp,Uber,Twitter,Spotify... All were founded by crazy
            college undergrads teaming up with another more crazy mate.
          </Text>
        </View>
        <View style={styles.commonConatiner}>
          <Input
            label="Password :"
            secure
            value={password}
            onUpdateValue={onUpdateValue.bind(this, "password")}
          />
          <Input
            label="Confirm Password :"
            secure
            value={confirmPassword}
            onUpdateValue={onUpdateValue.bind(this, "confirmPassword")}
          />
        </View>

        <View style={styles.buttonContainer}>
          <IconButton
            name="chevron-forward"
            size={40}
            color="white"
            onPress={submitHandler}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  commonConatiner: {
    position: "relative",
    top: -35,
    padding: 10,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "80%",
    alignItems: "flex-end",
    marginBottom: 40,
  },
});
