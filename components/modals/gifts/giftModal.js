import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import LottieView from "lottie-react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";
import { useContext } from "react";
import { GiftContext } from "../../../store/gift-context";

const { width, height } = Dimensions.get("screen");

export default function GiftModal({
  gift,
  setSelectedGift,
  setGiftModal,
  onPress,
}) {
  const giftCtx = useContext(GiftContext);
  const getRightContent = () => {
    if (gift._id) {
      return (
        <View style={styles.innerContainer}>
          <Image
            source={{
              uri: giftCtx.path === "envelope" ? gift.cover : gift.image,
            }}
            style={styles.previewImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              You have selected this beautiful gift.
            </Text>
            <Text style={styles.text}>Let's go!</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.innerContainer}>
          {/* <LottieView
            source={require("../../../assets/141572-space-boy-developer.json")}
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
          /> */}
          <Text style={styles.text}>You have not selected any gift.</Text>
          <Text style={styles.text}>Do you want to proceed?</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.modalContainer}>
      <Pressable
        style={({ pressed }) => [pressed && { opacity: 0.5 }, styles.backIcon]}
        onPress={() => {
          setSelectedGift({ key: null });
          setGiftModal(false);
        }}
      >
        <FontAwesome5 name="backspace" size={18} color="#676754" />
      </Pressable>
      <SharedElement id={`item.${gift._id}.selectedGift`}>
        {getRightContent()}
      </SharedElement>
      <View
        style={{
          position: "absolute",
          bottom: 90,
        }}
      >
        <Pressable
          style={({ pressed }) => [
            pressed && { opacity: 0.5 },
            styles.proceedButton,
          ]}
          onPress={onPress}
        >
          <Text style={{ fontWeight: "bold" }}>Proceed</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#444",
  },
  proceedButton: {
    width: 100,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#c9c9c3",
  },
  modalContainer: {
    position: "absolute",
    width: width,
    height: 400,
    top: height - 360,
    backgroundColor: "#e2e2dce0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  backIcon: {
    position: "absolute",
    left: 18,
    top: 18,
  },
  innerContainer: {
    height: 200,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
  },
  previewImage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "cover",
    width: 160,
    height: 160,
    borderRadius: 12,
  },
  textContainer: {
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
