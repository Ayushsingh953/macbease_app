import {
  Image,
  StyleSheet,
  TextInput,
  View,
  Pressable,
  Text,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import { useContext, useState } from "react";
import { GiftContext } from "../../store/gift-context";

const animation = {
  0: { opacity: 0, translateY: -100 },
  1: { opacity: 1, translateY: 0 },
};

const page = {
  0: { opacity: 0, translateX: -400 },
  1: { opacity: 1, translateX: 0 },
};

const proceed = {
  0: { opacity: 0, translateX: 450 },
  1: { opacity: 1, translateX: 0 },
};

const { width, height } = Dimensions.get("screen");

export default function ComposeMsg({ navigation }) {
  const [message, setMessage] = useState();
  const giftCtx = useContext(GiftContext);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Animatable.Image
          source={require("../../assets/pen_icon.png")}
          resizeMode="cover"
          style={{ width: 100, height: 100 }}
          animation={animation}
          delay={800}
          useNativeDriver
        />
      </View>
      <Animatable.View
        style={{
          width: width,
          height: height * 0.7,
          backgroundColor: "orange",
          alignSelf: "center",
          borderRadius: 16,
        }}
        animation={page}
        delay={800}
        useNativeDriver
      >
        <Image
          source={require("../../assets/kiwihug-3gifzboyZk0-unsplash.jpg")}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            borderRadius: 16,
          }}
        />
        <TextInput
          placeholder="Compose Your Message..."
          style={styles.input}
          spellCheck={false}
          autoCorrect={false}
          placeholderTextColor="black"
          multiline
          textAlignVertical="top"
          onChangeText={(value) => setMessage(value)}
          value={message}
        />
      </Animatable.View>
      <Animatable.View animation={proceed} delay={800} useNativeDriver>
        <Pressable
          style={({ pressed }) => [styles.proceed, pressed && { opacity: 0.5 }]}
          onPress={() => {
            giftCtx.setComposedMessage(message);
            navigation.push("secondary");
          }}
        >
          <Text style={styles.genericText}>Proceed</Text>
        </Pressable>
      </Animatable.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e2e2dc",
  },
  text: {
    fontSize: 18,
    fontFamily: "cursive",
  },
  input: {
    flex: 1,
    fontFamily: "cursive",
    overflow: "hidden",
    marginTop: 15,
    marginHorizontal: 45,
    marginBottom: 100,
    color: "black",
    fontSize: 16,
  },
  proceed: {
    height: 30,
    width: 100,
    marginLeft: width / 2 - 50,
    marginTop: 30,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ded2ab",
  },
  genericText: {
    fontWeight: "bold",
    color: "#444",
  },
});
