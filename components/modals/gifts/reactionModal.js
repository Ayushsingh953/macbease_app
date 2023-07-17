import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Platform,
  Image,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { Video, ResizeMode } from "expo-av";
import LottieView from "lottie-react-native";
import * as Animatable from "react-native-animatable";

const { width, height } = Dimensions.get("window");

export default function ReactionModal({ reactionModal, setReactionModal }) {
  const [file, setFile] = useState({ assets: [{ type: "" }] });
  const [isLoading, setIsLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const left = {
    0: { opacity: 0, translateX: -60 },
    1: { opacity: 1, translateX: 0 },
  };

  const bottom = {
    0: { opacity: 0, translateY: -60 },
    1: { opacity: 1, translateY: 0 },
  };

  async function uploadPermission() {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission denied");
      } else {
        uploadFile();
      }
    }
  }

  async function uploadFile() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setFile(result);
      console.log(result);
    }
  }

  function getCorrectContent() {
    if (file.assets[0].type === "video") {
      return (
        <>
          <View style={styles.uploadContainer}>
            <Video
              style={{ height: 200, width: 200, borderRadius: 12 }}
              source={{ uri: file }}
              resizeMode={ResizeMode.COVER}
              useNativeControls
              isLooping={false}
            />
          </View>
          <Pressable style={styles.reload}>
            <Ionicons name="reload-circle" size={26} color="white" />
          </Pressable>
        </>
      );
    } else if (file.assets[0].type === "image") {
      console.log(file);
      return (
        <>
          <View style={styles.uploadContainer}>
            <Image
              source={{ uri: file.assets[0].uri }}
              style={{ height: 200, width: 200, borderRadius: 12 }}
              resizeMode="cover"
            />
          </View>
          <Pressable
            style={({ pressed }) => [
              pressed && { opacity: 0.5 },
              styles.reload,
            ]}
            onPress={() => setFile({ assets: [{ type: "" }] })}
          >
            <Ionicons name="reload-circle" size={26} color="white" />
          </Pressable>
        </>
      );
    } else {
      return (
        <View style={styles.uploadContainer}>
          <Pressable
            style={({ pressed }) => [pressed && { opacity: 0.5 }]}
            onPress={uploadPermission}
          >
            <FontAwesome5 name="cloud-upload-alt" size={40} color="white" />
          </Pressable>
          <Text style={styles.placeholder}>Click here to upload</Text>
        </View>
      );
    }
  }

  async function handleSubmitEvent() {
    if (!file.assets[0].type) {
      return alert("You must provide the file.");
    } else {
      let newFile = {
        uri: file.assets[0].uri,
        type: `test/${file.assets[0].uri.split(".")[1]}`,
        name: file.assets[0].fileName,
      };
      const data = new FormData();
      let contentType = file.assets[0].type;
      data.append("file", newFile);
      data.append("upload_preset", "yukw2rxf");
      data.append("folder", "test");
      try {
        setIsLoading(true);
        let res = await fetch(
          `https://api.cloudinary.com/v1_1/dq4iomrfv/${contentType}/upload`,
          { method: "post", body: data }
        );
        const urlData = await res.json();
        setConfirmation(true);
        setTimeout(() => {
          setReactionModal(false);
          setIsLoading(false);
        }, 3000);
        console.log(urlData);
        return urlData.url;
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  }

  function getCorrectModal() {
    if (confirmation) {
      return (
        <>
          <Animatable.View animation={left} delay={300} useNativeDriver>
            <LottieView
              source={require("../../../assets/68792-cute-astronaut-flying-in-space-animation.json")}
              autoPlay
              loop
              style={{ height: 250, width: 250 }}
            />
          </Animatable.View>
          <Animatable.View animation={bottom} delay={300} useNativeDriver>
            <Text style={[styles.title2, { marginBottom: 60 }]}>
              Thank you for sharing with us!
            </Text>
          </Animatable.View>
        </>
      );
    } else if (isLoading) {
      return (
        <>
          <Animatable.View animation={left} delay={300} useNativeDriver>
            <LottieView
              source={require("../../../assets/91574-astronaut-illustration.json")}
              autoPlay
              loop
              style={{ height: 250, width: 250 }}
            />
          </Animatable.View>
          <Animatable.View animation={bottom} delay={300} useNativeDriver>
            <Text style={[styles.title2, { marginBottom: 60 }]}>
              Hang on while we are saving your reaction!
            </Text>
          </Animatable.View>
        </>
      );
    } else {
      return (
        <>
          <Text style={styles.title1}>
            We will love to know how you felt...
          </Text>
          <Text style={styles.title2}>Share your experience with us... </Text>
          {getCorrectContent()}
          <Pressable
            style={({ pressed }) => [
              pressed && { opacity: 0.5 },
              styles.submit,
            ]}
            onPress={() => {
              handleSubmitEvent();
            }}
          >
            <Text style={styles.title2}>Submit</Text>
          </Pressable>
        </>
      );
    }
  }

  return <View style={styles.modalContainer}>{getCorrectModal()}</View>;
}

const styles = StyleSheet.create({
  placeholder: {
    fontWeight: "bold",
    color: "#444",
    fontSize: 12,
    marginTop: 6,
  },
  reload: {
    position: "absolute",
    top: 110,
    left: 270,
  },
  submit: {
    borderWidth: 0.5,
    height: 40,
    width: 100,
    borderRadius: 12,
    marginTop: 50,
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadContainer: {
    height: 200,
    width: 200,
    borderRadius: 12,
    marginTop: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8eacb",
  },
  modalContainer: {
    marginTop: height - 400,
    height: 420,
    width: width - 30,
    marginLeft: 15,
    marginTop: 18,
    borderRadius: 12,
    backgroundColor: "#e2e2dc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  title1: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#444",
    letterSpacing: 1.05,
    lineHeight: 32,
  },
  title2: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#444",
  },
});
