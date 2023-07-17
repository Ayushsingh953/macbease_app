import React, { useContext } from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { FontAwesome } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";

import envelope from "../../assets/image1.jpeg";
import letter from "../../assets/pexels-photo-4992955.jpeg";
import { profiles } from "../../constants/gift-data";
import { GiftContext } from "../../store/gift-context";

const { width, height } = Dimensions.get("screen");

const animation = {
  0: { opacity: 0, translateX: -100 },
  1: { opacity: 1, translateX: 0 },
};

const textAnimation = {
  0: { opacity: 0, translateY: -10 },
  1: { opacity: 1, translateY: 0 },
};

export default function PreviewScreen({ navigation, route }) {
  const { selectedGift } = route.params;
  const [searchResult, setSearchResult] = useState(null);
  const [searching, setSearching] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState({ key: null });
  const giftCtx = useContext(GiftContext);

  const getRightCard = (item, index) => {
    if (item.key === selectedPerson.key) {
      return (
        <Animatable.View
          animation={animation}
          delay={600 + index * 400}
          useNativeDriver
          style={{
            width: 200,
            height: 100,
            marginVertical: 8,
            borderRadius: 12,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f4d592",
          }}
        >
          <View style={{ flex: 2 }}>
            <Image
              source={item.image}
              style={{
                width: 60,
                height: 60,
                resizeMode: "cover",
                borderRadius: 30,
                marginLeft: 12,
              }}
            />
          </View>
          <View
            style={{
              flex: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.cardText}>{item.name}</Text>
            <Text style={styles.cardText}>{item.course}</Text>
            <Text style={styles.cardText}>Year {item.year}</Text>
          </View>
        </Animatable.View>
      );
    } else {
      return (
        <Animatable.View
          animation={animation}
          delay={400 + index * 400}
          useNativeDriver
          style={{
            width: 200,
            height: 100,
            marginVertical: 8,
            borderRadius: 12,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f4d592",
          }}
        >
          <View style={{ flex: 2 }}>
            <Image
              source={item.image}
              style={{
                width: 60,
                height: 60,
                resizeMode: "cover",
                borderRadius: 30,
                marginLeft: 12,
              }}
            />
          </View>
          <View
            style={{
              flex: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.cardText}>{item.name}</Text>
            <Text style={styles.cardText}>{item.course}</Text>
            <Text style={styles.cardText}>Year {item.year}</Text>
          </View>
        </Animatable.View>
      );
    }
  };

  const getCorrectResult = () => {
    if (!searchResult && !searching) {
      return (
        <View>
          <Text style={{ fontWeight: "bold", color: "#444", fontSize: 18 }}>
            Result will be shown here.
          </Text>
          <LottieView
            source={require("../../assets/57276-astronaut-and-music.json")}
            autoPlay
            loop
            style={[{ width: 160, height: 160, marginLeft: 10 }]}
          />
        </View>
      );
    }
    if (searching) {
      return (
        <View>
          <LottieView
            source={require("../../assets/68794-cute-astronaut-operating-laptop.json")}
            autoPlay
            loop
            style={[{ width: 160, height: 160 }]}
          />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: "#444",
              marginLeft: 38,
            }}
          >
            Searching...{" "}
          </Text>
        </View>
      );
    }
    if (searchResult) {
      return (
        <View
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Animatable.Text
            style={{
              marginTop: 14,
              fontWeight: "bold",
              fontSize: 18,
              fontFamily: "monoSpace-regular",
            }}
            animation={textAnimation}
            delay={400}
            useNativeDriver
          >
            Profiles matching your search...
          </Animatable.Text>
          <FlatList
            data={searchResult}
            keyExtractor={(item) => item.key}
            renderItem={({ item, index }) => {
              return (
                <Pressable
                  style={({ pressed }) => [pressed && { opacity: 0.5 }]}
                  onPress={() => setSelectedPerson(item)}
                >
                  {getRightCard(item, index)}
                </Pressable>
              );
            }}
          />
        </View>
      );
    }
  };

  const delayFunction = () => {
    setTimeout(() => {
      setSearchResult(profiles);
      setSelectedPerson({ key: null });
      setSearching(false);
    }, "1000");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text
        style={{
          fontWeight: "bold",
          marginLeft: 10,
          fontSize: 28,
          color: "black",
        }}
      >
        Preview of your gift
      </Text>
      <SharedElement id={`item.${selectedGift._id}.selectedGift`}>
        <View
          style={{
            paddingHorizontal: 6,
            width: width,
            height: 130,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <Image
            source={{
              uri:
                giftCtx.path === "envelope"
                  ? selectedGift.cover
                  : selectedGift.image,
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              resizeMode: "cover",
              marginHorizontal: 12,
            }}
          />
          <Image
            source={{
              uri:
                giftCtx.path === "envelope"
                  ? giftCtx.selectedData.image
                  : giftCtx.selectedData.cover,
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              resizeMode: "cover",
              marginHorizontal: 12,
            }}
          />
          <Image
            source={letter}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              resizeMode: "cover",
              marginHorizontal: 12,
            }}
          />
        </View>
      </SharedElement>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 28,
          marginTop: 6,
          marginLeft: 10,
        }}
      >
        Search...
      </Text>
      <View
        style={{
          marginTop: 12,
          marginHorizontal: 22,
          backgroundColor: "#f8eacb",
          height: 40,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 12,
          borderWidth: 2,
        }}
      >
        <Pressable
          style={({ pressed }) => [pressed && { opacity: 0.5 }]}
          onPress={() => {
            setSearching(true);
            delayFunction();
          }}
        >
          <FontAwesome
            name="search"
            size={24}
            color="black"
            style={{ position: "absolute", left: width * 0.75 }}
          />
        </Pressable>
        <TextInput
          placeHolder="Search..."
          style={{
            width: "90%",
            height: "100%",
            paddingLeft: 0,
            fontSize: 16,
            fontWeight: "bold",
          }}
        />
      </View>
      <View
        style={{
          width: width - 40,
          height: 400,
          marginLeft: 20,
          marginTop: 12,
          borderRadius: 12,
          backgroundColor: "#f8eacb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {getCorrectResult()}
      </View>
      <Pressable
        style={({ pressed }) => [pressed && { opacity: 0.5 }, styles.proceed]}
      >
        <Text style={styles.proceedText}>Proceed</Text>
      </Pressable>
    </SafeAreaView>
  );
}

PreviewScreen.sharedElements = (route, otherRoute, showing) => {
  const { selectedGift } = route.params;
  return [
    {
      id: `item.${selectedGift.key}.selectedGift`,
    },
  ];
};

const styles = StyleSheet.create({
  cardText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#444",
    width: "100%",
    textAlign: "center",
  },
  proceed: {
    width: 120,
    height: 30,
    marginLeft: width / 2 - 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 12,
    backgroundColor: "#f8eacb",
  },
  proceedText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
