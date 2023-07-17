import { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import LottieView from "lottie-react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

const { width, height } = Dimensions.get("window");

export default function ReceiveModal({ setReceive }) {
  const [option, setOption] = useState();
  const [modalState, setModalState] = useState("none");

  const option1 = {
    0: { opacity: 0, translateX: -200 },
    1: { opacity: 1, translateX: 0 },
  };

  const option2 = {
    0: { opacity: 0, translateX: 200 },
    1: { opacity: 1, translateX: 0 },
  };

  const up1 = {
    0: { opacity: 0, translateY: -35 },
    1: { opacity: 1, translateY: 0 },
  };

  const up2 = {
    0: { opacity: 0, translateY: 35 },
    1: { opacity: 1, translateY: 0 },
  };

  const gif = {
    0: { transform: [{ scale: 0 }] },
    1: { transform: [{ scale: 1 }] },
  };

  function getRightTick(value) {
    if ((value === 1 && option === 1) || (value === 2 && option === 2)) {
      return (
        <Pressable
          style={({ pressed }) => [
            pressed && { opacity: 0.5 },
            styles.tickButton,
            { borderWidth: 3, borderColor: "#2cf185" },
          ]}
          onPress={() => setOption(null)}
        >
          <FontAwesome5 name="check" size={14} color="black" />
        </Pressable>
      );
    } else {
      return (
        <Pressable
          style={({ pressed }) => [
            pressed && { opacity: 0.5 },
            styles.tickButton,
          ]}
          onPress={() => setOption(value)}
        >
          <FontAwesome5 name="check" size={14} color="black" />
        </Pressable>
      );
    }
  }

  function exitModal() {
    setTimeout(() => {
      setReceive(false);
    }, 4000);
  }

  function getRightContentForModal() {
    if (modalState === "none") {
      return (
        <View style={styles.modalContainer}>
          <Animatable.View animation={up1} delay={1000} useNativeDriver>
            <Text style={styles.title}>We have got something for you.</Text>
            <Text style={styles.title}>Do you want to receive?</Text>
          </Animatable.View>
          <Animatable.View animation={gif} delay={1000} useNativeDriver>
            <LottieView
              source={require("../../../assets/83043-gift-box.json")}
              autoPlay
              loop
              style={[{ width: 200, height: 200 }]}
            />
          </Animatable.View>
          <View style={styles.bottomBox}>
            <Animatable.View
              style={styles.option}
              animation={option1}
              delay={800}
              useNativeDriver
            >
              <Text style={styles.optionText}>Yes!</Text>
              {getRightTick(1)}
            </Animatable.View>
            <Animatable.View
              style={styles.option}
              animation={option2}
              delay={800}
              useNativeDriver
            >
              <Text style={styles.optionText}>No!</Text>
              {getRightTick(2)}
            </Animatable.View>
          </View>
          <Animatable.View animation={up2} delay={1000} useNativeDriver>
            <Pressable
              style={({ pressed }) => [
                styles.submit,
                pressed && { opacity: 0.5 },
              ]}
              onPress={() => {
                setModalState(option);
                exitModal();
              }}
            >
              <Text style={styles.optionText}>Submit</Text>
            </Pressable>
          </Animatable.View>
        </View>
      );
    }
    if (modalState === 1) {
      return (
        <View style={styles.modalContainer}>
          <Animatable.View animation={up1} delay={1000} useNativeDriver>
            <Text style={styles.title}>Thank you for your confirmation!</Text>
          </Animatable.View>
          <LottieView
            source={require("../../../assets/96590-astronaut-info.json")}
            autoPlay
            loop
            style={[{ width: 200, height: 200 }]}
          />
          <Animatable.View
            animation={up2}
            delay={1000}
            useNativeDriver
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 12,
            }}
          >
            <Text style={styles.subTitle}>
              Your locker id is L-1 and password is U-3
            </Text>
            <Text style={styles.subTitle}>See you soon!</Text>
          </Animatable.View>
        </View>
      );
    }
    if (modalState === 2) {
      return (
        <View style={styles.modalContainer}>
          <Animatable.View animation={up1} delay={1000} useNativeDriver>
            <Text style={styles.title}>Thank you for your confirmation!</Text>
          </Animatable.View>
          <LottieView
            source={require("../../../assets/88338-crying-baby-astronaut.json")}
            autoPlay
            loop
            style={[{ width: 200, height: 200 }]}
          />
          <Animatable.View
            animation={up2}
            delay={1000}
            useNativeDriver
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 12,
            }}
          >
            <Text style={styles.subTitle}>
              We are so sorry to know you won't be coming.
            </Text>
            <Text style={styles.subTitle}>Hope to see you next time!</Text>
          </Animatable.View>
        </View>
      );
    }
  }

  return (
    <View
      style={{ height: height, width: width, backgroundColor: "#ffffff9c" }}
    >
      {getRightContentForModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  subTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  submit: {
    width: 100,
    height: 40,
    marginTop: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#f8eacb",
  },
  tickButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    position: "absolute",
    left: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8eacb",
  },
  optionText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#444",
  },
  bottomBox: {
    height: 60,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 6,
  },
  option: {
    borderColor: "#f8eacb",
    borderWidth: 4,
    flex: 1,
    height: "100%",
    borderRadius: 12,
    marginLeft: 4,
    marginRight: 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 28,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  modalContainer: {
    height: 420,
    width: width - 30,
    marginLeft: 15,
    marginTop: height / 2 - 210,
    borderRadius: 12,
    backgroundColor: "#e2e2dc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
