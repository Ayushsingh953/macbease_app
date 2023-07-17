import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import * as Animatable from "react-native-animatable";

import { GiftContext } from "../../store/gift-context";
import { DATA, giftsData } from "../../constants/gift-data";

const { width, height } = Dimensions.get("window");

const animation = {
  0: { opacity: 0, translateY: -100 },
  1: { opacity: 1, translateY: 0 },
};

const imgAnimation = {
  0: { opacity: 0, translateY: -600 },
  1: { opacity: 1, translateY: 0 },
};

const smallBox1 = {
  0: { opacity: 0, translateY: 0, translateX: 0, zIndex: -1 },
  1: { opacity: 1, translateY: 160, translateX: -100, zIndex: 99 },
};

const smallBox2 = {
  0: { opacity: 0, translateY: 0, translateX: 0, zIndex: -1 },
  1: { opacity: 1, translateY: 160, translateX: 0, zIndex: 99 },
};

const smallBox3 = {
  0: { opacity: 0, translateY: 0, translateX: 0, zIndex: -1 },
  1: { opacity: 1, translateY: 160, translateX: 100, zIndex: 99 },
};

const textAnimation = {
  0: { opacity: 0, translateY: 100 },
  1: { opacity: 1, translateY: 0 },
};

const IMAGE = 200;

export default function ImageList({ navigation, route }) {
  const giftCtx = useContext(GiftContext);
  const { item } = route.params;
  const [activeItem, setActiveItem] = useState(item);

  const getRightData = () => {
    if (giftCtx.path === "envelope") {
      return giftCtx.envelopeData;
    }
    if (giftCtx.path === "gifts") {
      return giftCtx.giftData;
    }
  };

  return (
    <>
      <SharedElement id={`item.${activeItem._id}.image1`}>
        <SharedElement id={`item.${activeItem._id}.image2`}>
          <Image
            source={{
              uri:
                giftCtx.path === "envelope"
                  ? activeItem.image
                  : activeItem.cover,
            }}
            style={{
              width: "100%",
              height: "100%",
              shadowColor: "rgba(0,0,0,0.8)",
              shadowRadius: 22,
              shadowOffset: { width: 12, height: 12 },
              shadowOpacity: 0.4,
            }}
            resizeMode="cover"
            blurRadius={5}
          />
        </SharedElement>
      </SharedElement>
      <SharedElement
        id={`item.${activeItem._id}.text1`}
        style={{ position: "absolute", zIndex: 99, top: 15 }}
      >
        <SharedElement
          id={`item.${activeItem._id}.text2`}
          style={{ position: "absolute", zIndex: 99, top: 15 }}
        >
          <Animatable.Text
            animation={animation}
            delay={1000}
            style={styles.text}
            useNativeDriver
          >
            {activeItem.location}
          </Animatable.Text>
        </SharedElement>
      </SharedElement>
      <Animatable.View
        style={styles.imageContainer}
        animation={imgAnimation}
        delay={2000}
      >
        <Image
          source={{
            uri:
              giftCtx.path === "envelope" ? activeItem.image : activeItem.cover,
          }}
          style={{ width: "100%", height: "100%", borderRadius: IMAGE / 2 }}
          resizeMode="cover"
        />
      </Animatable.View>
      <Animatable.View
        style={styles.smallBox1}
        animation={smallBox1}
        delay={3000}
        useNativeDriver
      >
        <Image
          source={activeItem.designer}
          style={{ width: "100%", height: "100%", borderRadius: 25 }}
          resizeMode="cover"
        />
        <Text style={styles.smallBox1Text}>Designer</Text>
      </Animatable.View>
      <Animatable.View
        style={styles.smallBox2}
        animation={smallBox2}
        delay={3000}
      >
        <Text style={styles.actualPrice}>₹{activeItem.price}</Text>
        <Text style={styles.priceLabel}>Price</Text>
      </Animatable.View>
      <Animatable.View
        style={styles.smallBox3}
        animation={smallBox3}
        delay={3000}
      >
        <Pressable
          style={({ pressed }) => pressed && [{ opacity: 0.5 }]}
          onPress={() => {
            navigation.push("composeMsg");
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 16 }}>
            Let's go!
          </Text>
        </Pressable>
      </Animatable.View>
      <FlatList
        data={getRightData()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ zIndex: 99, position: "absolute", bottom: 40 }}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setActiveItem(item);
              }}
            >
              <Animatable.View
                useNativeDriver
                animation={textAnimation}
                delay={200 + index * 200}
                style={{
                  marginHorizontal: 10,
                  width: 150,
                  height: 200,
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Animatable.Image
                  useNativeDriver
                  animation={textAnimation}
                  delay={400 + (index + 1) * 200}
                  source={{
                    uri: giftCtx.path === "envelope" ? item.image : item.cover,
                  }}
                  style={{ width: 130, height: 150, margin: 10 }}
                />
                <Animatable.Text
                  style={{ marginLeft: 10, fontWeight: "bold" }}
                  useNativeDriver
                  animation={textAnimation}
                  delay={500 + (index + 1) * 200}
                >
                  {item.location}
                </Animatable.Text>
              </Animatable.View>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    position: "absolute",
    marginLeft: 20,
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
    marginTop: 40,
  },
  imageContainer: {
    height: IMAGE,
    width: IMAGE,
    borderRadius: IMAGE / 2,
    position: "absolute",
    left: width / 2 - IMAGE / 2,
    top: height / 2 - IMAGE * 1.2,
  },
  smallBox1: {
    position: "absolute",
    width: 50,
    height: 50,
    left: width / 2 - 25,
    top: height / 2 - 150,
    zIndex: -1,
    borderRadius: 25,
  },
  smallBox1Text: {
    position: "absolute",
    width: 100,
    height: 30,
    left: -8,
    top: 60,
    borderRadius: 5,
    fontWeight: "bold",
    color: "#bcbbb9",
  },
  smallBox2: {
    position: "absolute",
    width: 50,
    height: 50,
    left: width / 2 - 25,
    top: height / 2 - 150,
    zIndex: -1,
  },
  actualPrice: {
    position: "absolute",
    width: 100,
    height: 24,
    left: 0,
    top: 20,
    borderRadius: 5,
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: 22,
  },
  priceLabel: {
    position: "absolute",
    width: 100,
    height: 30,
    left: 10,
    top: 60,
    borderRadius: 5,
    fontWeight: "bold",
    color: "#bcbbb9",
  },
  smallBox3: {
    position: "absolute",
    width: 90,
    height: 30,
    left: width / 2 - 35,
    top: height / 2 - 130,
    zIndex: -1,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dfd0bd6f",
  },
});

ImageList.sharedElements = (route, otherRoute, showing) => {
  const { item } = route.params;
  return [
    {
      id: `item.${item.key}.image`,
    },
    {
      id: `item.${item.key}.text`,
    },
  ];
};
