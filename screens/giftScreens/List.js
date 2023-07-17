import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  ActivityIndicator,
  Modal,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { Video, ResizeMode } from "expo-av";

import { GiftContext } from "../../store/gift-context";
import ReceiveModal from "../../components/modals/gifts/receiveModal";
import { giftsData, reactions } from "../../constants/gift-data";
import { AuthContext } from "../../store/auth-context";
import { URL } from "../../utils/backend_config";

const { width, height } = Dimensions.get("window");

const itemWidth = width * 0.6;
const itemHeight = 200;

const width2 = width * 0.6;
const height2 = 300;

const SPACING = 12;

const notification = {
  0: [{ opacity: 0, translateX: 30 }],
  1: [{ opacity: 1, translateX: 0 }],
};

export default function List({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [envelopData, setEnvelopData] = useState([]);
  const [giftData, setGiftData] = useState([]);

  const giftCtx = useContext(GiftContext);
  const authCtx = useContext(AuthContext);
  const [receive, setReceive] = useState(false);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollX2 = React.useRef(new Animated.Value(0)).current;
  const scrollX3 = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    async function getData() {
      const config = {
        headers: {
          authorization: `Bearer ${authCtx.token}`,
        },
      };
      const envelope_res = await axios.get(`${URL}/gifts/getGifts`, config);
      console.log("Envelope Data :");
      console.log(envelope_res.data);
      setEnvelopData(envelope_res.data);
      giftCtx.setEnvelopeData(envelope_res.data);
      const gift_res = await axios.get(
        `${URL}/frontend/getAllProducts`,
        config
      );
      console.log("Gift data :");
      console.log(gift_res.data);
      setGiftData(gift_res.data);
      giftCtx.setGiftData(gift_res.data);
      const reaction_res = await axios.get(`${URL}/gifts/getReactions`, config);
      console.log("reaction data :");
      console.log(reaction_res.data);
      setLoading(false);
    }
    getData();
  }, []);

  if (loading === true) {
    return (
      <ActivityIndicator
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Animatable.View
        style={styles.notificationBox}
        animation={notification}
        delay={500}
        useNativeDriver
      >
        <Pressable
          style={({ pressed }) => [pressed && { opacity: 0.5 }]}
          onPress={() => navigation.push("notifications")}
        >
          <Ionicons name="notifications" size={24} color="black" />
        </Pressable>
      </Animatable.View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            height: 40,
            marginLeft: SPACING,
            fontWeight: "bold",
            fontSize: 28,
          }}
        >
          Great envelopes...
        </Text>
        <Animated.FlatList
          data={envelopData}
          keyExtractor={(item) => item._id}
          horizontal
          pagingEnabled={true}
          snapToInterval={itemWidth + SPACING}
          showsHorizontalScrollIndicator={false}
          decelerationRate="normal"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * (itemWidth + SPACING),
              index * (itemWidth + SPACING),
              (index + 1) * (itemWidth + SPACING),
            ];
            const translateX = scrollX.interpolate({
              inputRange,
              outputRange: [itemWidth / 5, 0, -itemWidth / 5],
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
            });
            return (
              <TouchableOpacity
                style={{
                  width: itemWidth,
                  height: itemHeight,
                  marginLeft: SPACING,
                }}
                onPress={() => {
                  giftCtx.setPath("envelope");
                  giftCtx.setSelectedData(item);
                  navigation.navigate("image", { item });
                }}
              >
                <SharedElement
                  id={`item.${item._id}.text1`}
                  style={{ zIndex: 99, position: "absolute" }}
                >
                  <Animated.Text
                    style={[
                      styles.text,
                      { opacity, transform: [{ translateX }] },
                    ]}
                  >
                    {item.name}
                  </Animated.Text>
                </SharedElement>
                <SharedElement id={`item.${item._id}.image1`}>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: itemWidth,
                      height: itemHeight,
                      borderRadius: 12,
                    }}
                    resizeMode="cover"
                  />
                </SharedElement>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            height: 40,
            marginLeft: SPACING,
            fontWeight: "bold",
            fontSize: 28,
          }}
        >
          Good gifts...
        </Text>
        <Animated.FlatList
          data={giftData}
          keyExtractor={(item) => item._id}
          horizontal
          pagingEnabled
          snapToInterval={itemWidth + SPACING}
          decelerationRate="normal"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX2 } } }],
            { useNativeDriver: true }
          )}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          renderItem={({ item, index }) => {
            const inputRange2 = [
              (index - 1) * (itemWidth + SPACING),
              index * (itemWidth + SPACING),
              (index + 1) * (itemWidth + SPACING),
            ];
            const translateX2 = scrollX2.interpolate({
              inputRange: inputRange2,
              outputRange: [itemWidth, 0, -itemWidth],
            });
            return (
              <TouchableOpacity
                style={{
                  width: itemWidth,
                  height: itemHeight,
                  marginLeft: SPACING,
                }}
                onPress={() => {
                  giftCtx.setPath("gifts");
                  giftCtx.setSelectedData(item);
                  navigation.navigate("image", { item });
                }}
              >
                <SharedElement
                  id={`item.${item._id}.text2`}
                  style={{ zIndex: 99, position: "absolute" }}
                >
                  <Animated.Text
                    style={[
                      styles.text,
                      { transform: [{ translateX: translateX2 }] },
                    ]}
                  >
                    {item.name}
                  </Animated.Text>
                </SharedElement>
                <SharedElement id={`item.${item._id}.image2`}>
                  <Image
                    source={{ uri: item.cover }}
                    style={{
                      width: width2,
                      height: itemHeight,
                      borderRadius: 12,
                    }}
                    resizeMode="cover"
                  />
                </SharedElement>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            height: 40,
            marginLeft: SPACING,
            fontWeight: "bold",
            fontSize: 28,
          }}
        >
          Great reactions...
        </Text>
        <Animated.FlatList
          data={reactions}
          keyExtractor={(item) => item.key}
          horizontal
          pagingEnabled
          snapToInterval={itemWidth + SPACING}
          decelerationRate="normal"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX3 } } }],
            { useNativeDriver: true }
          )}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          renderItem={({ item, index }) => {
            const inputRange3 = [
              (index - 1) * (itemWidth + SPACING),
              index * (itemWidth + SPACING),
              (index + 1) * (itemWidth + SPACING),
            ];
            const translateX3 = scrollX3.interpolate({
              inputRange: inputRange3,
              outputRange: [itemWidth, 0, -itemWidth],
            });
            return (
              <TouchableOpacity
                style={{
                  width: itemWidth,
                  height: itemHeight,
                  marginLeft: SPACING,
                }}
                onPress={() => navigation.push("videoPlayer", { index })}
              >
                <Video
                  style={{
                    height: itemHeight,
                    width: itemWidth,
                    borderRadius: 12,
                  }}
                  source={{ uri: item.url }}
                  resizeMode={ResizeMode.COVER}
                  useNativeControls
                  isLooping={true}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <Modal visible={receive} animationType="slide" transparent={true}>
        <ReceiveModal setReceive={setReceive} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
    marginLeft: 6,
    marginTop: 8,
  },
  notificationBox: {
    width: 30,
    height: 30,
    marginLeft: width - 60,
    marginTop: 50,
  },
});
