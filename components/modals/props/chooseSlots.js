import React, { useContext } from "react";
import axios from "axios";
import {
  View,
  Pressable,
  Text,
  FlatList,
  Animated,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

import { center, ios_shadow, row, border } from "../../../constants/styles";
import SimpleFlatButton from "../../ui/simpleFlatButton";
import { PropContext } from "../../../store/prop-context";
import getConfig, { URL } from "../../../utils/backend_config";
import { AuthContext } from "../../../store/auth-context";

const { width, height } = Dimensions.get("window");
const ITEM_SIZE = 60;
const slots = [
  { key: 1, value: "9am to 10am" },
  { key: 2, value: "10am to 11am" },
  { key: 3, value: "11am to 12 noon" },
  { key: 4, value: "12noon to 1pm" },
  { key: 5, value: "1pm to 2pm" },
  { key: 6, value: "2pm to 3pm" },
  { key: 7, value: "3pm to 4pm" },
  { key: 8, value: "4pm to 5pm" },
  { key: 9, value: "5pm to 6pm" },
  { key: 10, value: "6pm to 7pm" },
];
function ChooseSlots({
  color,
  pickedSlots,
  setPickedSlots,
  setModalState,
  modalProp,
  day,
}) {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const authCtx = useContext(AuthContext);
  const propCtx = useContext(PropContext);

  async function handleSlotSubmissionEvent() {
    // setModalState("searching");
    // setTimeout(() => {
    //   setModalState("notFound");
    // }, 3000);
    setModalState("searching");
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsImlkIjoiNjQyNDYzNjc5ZjViYjM1Y2JlMGNlNzA2IiwiaWF0IjoxNjgwMjAyMjQ0LCJleHAiOjE2ODI3OTQyNDR9.loMACGHbiB7P0kn_VqxzqNukVIzCpcs90yw4Svdkymo";

    // const config = {
    //   headers: {
    //     authorization: `Bearer ${token}`,
    //   },
    // };

    //   console.lo g("day " + day.toLowerCase());
    console.log("prop name " + modalProp);
    //   for (let i = 0; i < pickedSlots.length; i++) {
    //     console.log(pickedSlots[i]);
    //   }

    const data = {
      prop: modalProp,
      day: day,
      slotIndex: pickedSlots.reverse(),
    };
    const USER_TOKEN = authCtx.token;

    const config = {
      headers: {
        authorization: `Bearer ${USER_TOKEN}`,
      },
    };
    try {
      const res = await axios.post(
        `${URL}/props/findAvailableProp`,
        data,
        config
      );
      console.log(res.data);
      propCtx.setMessage(res.data.Msg);
      propCtx.setId(res.data.propId);
    } catch (err) {
      console.log(err);
    }

    setModalState("payment");
  }

  function handleChoosingSlotEvent(index) {
    let len = pickedSlots.length;
    // console.log("last element", pickedSlots[0]);
    // console.log("coming element", index);
    if (pickedSlots[0] === index - 1 || len === 0) {
      setPickedSlots((cur) => [index, ...cur]);
      return;
    } else {
      return;
    }
  }

  return (
    <View style={[styles.modalContainer, { borderColor: color }]}>
      <Pressable
        style={({ pressed }) => [styles.goBack, pressed && { opacity: 0.5 }]}
        onPress={() => {
          setModalState("orderForm");
        }}
      >
        <FontAwesome5 name="backspace" size={20} color="#676754" />
      </Pressable>
      <View style={[styles.topContainer, center]}>
        <Text style={styles.title}>Choose Slot</Text>
      </View>
      <View style={[styles.bottomContainer, row]}>
        <View style={[styles.leftCarousel, center]}>
          <Animated.FlatList
            data={slots}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            keyExtractor={(item) => item.key}
            renderItem={({ item, index }) => {
              const inputRange = [
                -1,
                0,
                ITEM_SIZE * index,
                ITEM_SIZE * (index + 1),
              ];
              const scale = scrollY.interpolate({
                inputRange,
                outputRange: [0, 1, 1, 1],
              });
              const opacityInputRange = [
                -1,
                0,
                ITEM_SIZE * index,
                ITEM_SIZE * (index + 1),
              ];
              const opacity = scrollY.interpolate({
                inputRange: opacityInputRange,
                outputRange: [0, 1, 1, 0],
              });
              return (
                <View style={[{ width: 180 }, center]}>
                  <Pressable
                    onPress={() => {
                      handleChoosingSlotEvent(index);
                    }}
                  >
                    <Animated.View
                      style={[
                        styles.leftCarouselBox,
                        { opacity, transform: [{ scale }] },
                        center,
                        ios_shadow,
                      ]}
                    >
                      <Text style={styles.leftCarouselText}>{item.value}</Text>
                    </Animated.View>
                  </Pressable>
                </View>
              );
            }}
          />
        </View>
        <Pressable
          style={({ pressed }) => [styles.reload, center]}
          onPress={() => {
            setPickedSlots((cur) => []);
          }}
        >
          <Ionicons name="reload" size={16} color="#444" />
        </Pressable>
        <View style={[styles.rightCarousel, center]}>
          <FlatList
            data={pickedSlots}
            keyExtractor={(item) => item + Math.random()}
            renderItem={({ item }) => {
              return (
                <View
                  style={[
                    styles.rightCarouselBox,
                    center,
                    { backgroundColor: color },
                  ]}
                >
                  <Text style={styles.rightCarouselText}>
                    {slots[item].value}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>
      <View style={[center]}>
        <SimpleFlatButton
          color={color}
          width={120}
          onPress={handleSlotSubmissionEvent}
        >
          Proceed
        </SimpleFlatButton>
      </View>
    </View>
  );
}

export default ChooseSlots;

const styles = StyleSheet.create({
  modalContainer: {
    height: 340,
    width: width - 20,
    marginLeft: 10,
    backgroundColor: "#fffcfcf9",
    marginTop: height - 340,
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
  },
  topContainer: {
    width: "100%",
    height: 40,
    marginTop: 20,
  },
  goBack: {
    position: "absolute",
    left: 20,
    top: 25,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#444",
  },
  bottomContainer: {
    width: "100%",
    height: 200,
  },
  leftCarousel: {
    height: "85%",
    flex: 1,
  },
  rightCarousel: {
    height: "85%",
    flex: 1,
  },
  leftCarouselBox: {
    width: 110,
    height: 25,
    marginTop: 8,
    borderRadius: 22,
    backgroundColor: "#ccc",
  },
  leftCarouselText: {
    fontWeight: "bold",
    color: "#444",
    fontSize: 11,
  },
  reload: {
    position: "absolute",
    width: 30,
    height: 30,
    right: 12,
    bottom: 204,
    borderRadius: 15,
  },
  rightCarouselBox: {
    width: 120,
    height: 30,
    marginTop: 8,
    borderRadius: 22,
  },
  rightCarouselText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "white",
  },
});
