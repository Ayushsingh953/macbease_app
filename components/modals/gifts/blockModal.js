import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import LottieView from "lottie-react-native";
import { useState, useEffect } from "react";

import { blockList, colors } from "../../../constants/gift-data";

const { width, height } = Dimensions.get("window");

const x = {
  0: { opacity: 0, translateX: -200 },
  1: { opacity: 1, translateX: 0 },
};

const scale = {
  0: { scale: 0 },
  1: { scale: 1 },
};

export default function BlockModal({ setBlockModal, blockModal }) {
  const [modalState, setModalState] = useState("list");

  function handleUnblockingEvent() {
    setModalState("unblocking");
    setTimeout(() => {
      setModalState("done");
    }, 3000);
    setTimeout(() => {
      setModalState("list");
    }, 6000);
  }

  function getCorrectContent() {
    if (modalState === "list") {
      if (blockList.length === 0) {
        return (
          <View>
            <Text>Nothing to display...</Text>
          </View>
        );
      } else {
        return (
          <ScrollView contentContainerStyle={styles.scrollView}>
            {blockList.map((item, index) => {
              return (
                <Animatable.View
                  key={index}
                  style={styles.blockCard}
                  animation={x}
                  delay={600}
                  useNativeDriver
                >
                  <View style={styles.imageContainer}>
                    <Image source={item.cover} style={styles.image} />
                  </View>
                  <View style={styles.unblock}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Pressable
                      style={({ pressed }) => [pressed && { opacity: 0.5 }]}
                      onPress={() => {
                        handleUnblockingEvent();
                      }}
                    >
                      <Feather name="unlock" size={24} color="black" />
                    </Pressable>
                  </View>
                </Animatable.View>
              );
            })}
          </ScrollView>
        );
      }
    } else if (modalState === "unblocking") {
      return (
        <View style={{ width: 200, height: 200 }}>
          <Animatable.View animation={scale} delay={600} useNativeDriver>
            <LottieView
              source={require("../../../assets/68792-cute-astronaut-flying-in-space-animation.json")}
              autoPlay
              loop
              style={{ height: 200, width: 200 }}
            />
          </Animatable.View>
          <Animatable.View
            style={styles.unblockingText}
            animation={x}
            delay={600}
            useNativeDriver
          >
            <Text style={styles.subText}>
              It's good to know you are unblocking someone!Hold on while we are
              unblocking...
            </Text>
          </Animatable.View>
        </View>
      );
    } else if (modalState === "done") {
      return (
        <View style={{ width: 200, height: 200 }}>
          <Animatable.View animation={scale} delay={600} useNativeDriver>
            <LottieView
              source={require("../../../assets/91574-astronaut-illustration.json")}
              autoPlay
              loop
              style={{ height: 200, width: 200 }}
            />
          </Animatable.View>
          <Animatable.View
            style={styles.unblockingText}
            animation={x}
            delay={600}
            useNativeDriver
          >
            <Text style={styles.subText}>It's done.Congratulations!</Text>
          </Animatable.View>
        </View>
      );
    }
  }

  return (
    <View style={styles.modalContainer}>
      <Pressable
        style={({ pressed }) => [pressed && { opacity: 0.5 }, styles.goBack]}
        onPress={() => {
          setBlockModal(false);
        }}
      >
        <Ionicons name="chevron-back" size={24} color="#444" />
      </Pressable>
      <View style={styles.top}>
        <Text style={styles.title}>People you have blocked...</Text>
      </View>
      <View style={styles.bottom}>{getCorrectContent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  subText: {
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1.1,
    lineHeight: 18,
  },
  unblockingText: {
    // borderWidth: 0.5,
    width: 220,
    height: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  unblock: {
    width: 80,
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: "cover",
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  scrollView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  blockCard: {
    height: 150,
    width: 250,
    marginVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.primaryColor,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  top: {
    width: "100%",
    height: 40,
    marginTop: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bottom: {
    width: "100%",
    height: "100%",
    marginTop: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  goBack: {
    position: "absolute",
    top: 20,
    left: 18,
    zIndex: 99,
  },
  modalContainer: {
    marginTop: height - 400,
    height: 420,
    width: width - 30,
    marginLeft: 15,
    marginTop: 18,
    borderRadius: 12,
    backgroundColor: "#e2e2dc",
  },
});
