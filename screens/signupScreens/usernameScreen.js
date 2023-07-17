import { useContext, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Input from "../../components/auth/input";
import IconButton from "../../components/ui/iconButton";
import { AuthContext } from "../../store/auth-context";

var theme;
export default function UsernameSreen({ navigation }) {
  const [enteredname, setEnteredname] = useState();
  const [enteredreg, setEnteredreg] = useState();
  const authCtx = useContext(AuthContext);
  theme = authCtx.theme;

  function onUpdateValue(inputType, value) {
    switch (inputType) {
      case "username":
        setEnteredname(value);
        break;
      case "reg":
        setEnteredreg(value);
    }
  }
  function usernameSubmitHanlder() {
    const name = enteredname && enteredname.trim();
    if (!name || name.length === 0 || !enteredreg || enteredreg.length !== 8) {
      Alert.alert("Invalid Input!", "Please provide valid information.");
      return;
    }
    authCtx.setUsername(name);
    authCtx.setRegistration(parseInt(enteredreg));
    navigation.navigate("password");
  }

  return (
    <ImageBackground
      source={
        theme === "dark"
          ? require("../../assets/images/signup_background.png")
          : require("../../assets/images/light_background.png")
      }
      resizeMode="cover"
      style={styles.root}
    >
      <ScrollView contentInsetAdjustmentBehavior="scrollableAxes">
        <View style={styles.outerContainer}>
          <View>
            <Image source={require("../../assets/images/second.png")} />
          </View>
          <Text style={styles.text}>
            What if Mark Zuckerberg never broke up with his girlfriend during
            his college at Harvard? The world would not have Facebook.
          </Text>
          <View>
            <Input
              label="Name :"
              value={enteredname}
              onUpdateValue={onUpdateValue.bind(this, "username")}
            />
            <Input
              label="Registration number :"
              keyboardType="number-pad"
              value={enteredreg}
              onUpdateValue={onUpdateValue.bind(this, "reg")}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <IconButton
          name="chevron-forward"
          size={40}
          color="white"
          onPress={usernameSubmitHanlder}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 20,
    padding: 10,
  },
  buttonContainer: {
    alignItems: "flex-end",
    marginRight: 40,
    marginBottom: 40,
  },
  outerContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 40,
    padding: 20,
  },
});
