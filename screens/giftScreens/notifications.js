import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Pressable,
  Modal,
} from "react-native";
import * as Animatable from "react-native-animatable";
import LottieView from "lottie-react-native";
import {
  MaterialIcons,
  AntDesign,
  FontAwesome,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";

import {
  notifications,
  receivedGifts,
  sendGifts,
  colors,
} from "../../constants/gift-data";
import ReviewModal from "../../components/modals/gifts/reviewModal";
import ReactionModal from "../../components/modals/gifts/reactionModal";
import BlockModal from "../../components/modals/gifts/blockModal";

const { width, height } = Dimensions.get("window");

const notification = {
  0: { opacity: 0, translateX: -60 },
  1: { opacity: 1, translateX: 0 },
};

export default function Notifications({ navigation }) {
  const [inbox, setInbox] = useState(true);
  const [reviewModal, setReviewModal] = useState(false);
  const [reactionModal, setReactionModal] = useState(false);
  const [blockModal, setBlockModal] = useState(false);

  function getCorrectButton() {
    if (inbox) {
      return (
        <>
          <Pressable
            onPress={() => setInbox(true)}
            style={[styles.button, styles.enlarge]}
          >
            <Text style={styles.genericText}>Inbox</Text>
          </Pressable>
          <Pressable onPress={() => setInbox(false)} style={styles.button}>
            <Text style={styles.genericText}>Outbox</Text>
          </Pressable>
        </>
      );
    } else {
      return (
        <>
          <Pressable onPress={() => setInbox(true)} style={styles.button}>
            <Text style={styles.genericText}>Inbox</Text>
          </Pressable>
          <Pressable
            onPress={() => setInbox(false)}
            style={[styles.button, styles.enlarge]}
          >
            <Text style={styles.genericText}>Outbox</Text>
          </Pressable>
        </>
      );
    }
  }

  function getCorrectCard(item) {
    if (item.icon === "receive") {
      return (
        <Animatable.View
          animation={notification}
          useNativeDriver
          delay={300}
          style={styles.textCard}
        >
          <Text style={styles.cardText}>{item.text}</Text>
          <Pressable
            style={({ pressed }) => [
              pressed && { opacity: 0.5 },
              styles.review,
            ]}
            onPress={() => {
              setReviewModal(true);
            }}
          >
            <MaterialIcons
              name="rate-review"
              size={24}
              color={colors.lightText}
            />
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              pressed && { opacity: 0.5 },
              styles.reaction,
            ]}
            onPress={() => {
              setReactionModal(true);
            }}
          >
            <AntDesign name="cloudupload" size={26} color={colors.lightText} />
          </Pressable>
        </Animatable.View>
      );
    } else {
      return (
        <Animatable.View
          animation={notification}
          useNativeDriver
          delay={300}
          style={styles.textCard}
        >
          <Text style={styles.cardText}>{item.text}</Text>
        </Animatable.View>
      );
    }
  }

  function getHistory() {
    if (inbox && receivedGifts.length !== 0) {
      return (
        <>
          <FlatList
            data={receivedGifts}
            keyExtractor={(item) => item.key}
            renderItem={({ item, index }) => {
              return (
                <Animatable.View
                  style={[styles.historyContainer]}
                  animation={notification}
                  delay={300}
                  useNativeDriver
                >
                  <View
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FontAwesome
                      name="envelope"
                      size={22}
                      color={colors.lightText}
                      style={{ marginRight: 40 }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 4,
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={[styles.cardText, { marginRight: 40 }]}>
                      {item.value}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.dateText,
                      { position: "absolute", left: 290, top: 45 },
                    ]}
                  >
                    {item.date}
                  </Text>
                </Animatable.View>
              );
            }}
          />
        </>
      );
    } else if (!inbox && sendGifts.length !== 0) {
      return (
        <>
          <FlatList
            data={sendGifts}
            keyExtractor={(item) => item.key}
            renderItem={({ item, index }) => {
              return (
                <Animatable.View
                  style={[styles.historyContainer]}
                  animation={notification}
                  delay={300}
                  useNativeDriver
                >
                  <View
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FontAwesome
                      name="envelope"
                      size={22}
                      color={colors.lightText}
                      style={{ marginRight: 40 }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 4,
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={[styles.cardText, { marginRight: 40 }]}>
                      {item.value}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.dateText,
                      { position: "absolute", left: 290, top: 45 },
                    ]}
                  >
                    {item.date}
                  </Text>
                </Animatable.View>
              );
            }}
          />
        </>
      );
    } else {
      return (
        <>
          <LottieView
            source={require("../../assets/141572-space-boy-developer.json")}
            autoPlay
            loop
            style={[{ width: 200, height: 200 }]}
          />
          <Text>
            {inbox
              ? "Your inbox will be displayed here..."
              : "Your outbox will be displayed here..."}
          </Text>
        </>
      );
    }
  }

  return (
    <>
      <View style={{ flex: 1, marginTop: 40 }}>
        <Text style={styles.title}>Recent bells....</Text>
        <Pressable
          style={({ pressed }) => [
            pressed && { opacity: 0.5 },
            { position: "absolute", right: 30, top: 25 },
          ]}
          onPress={() => {
            setBlockModal(true);
          }}
        >
          <Entypo name="block" size={22} color="#444" />
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            pressed && { opacity: 0.5 },
            { position: "absolute", left: 30, top: 23 },
          ]}
          onPress={() => {
            navigation.push("list");
          }}
        >
          <Ionicons name="chevron-back" size={24} color="#444" />
        </Pressable>
        <View style={styles.flatListContainer}>
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.key}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return <View>{getCorrectCard(item)}</View>;
            }}
          />
        </View>
        <View style={styles.bottomBox}>
          <View style={styles.swap}>{getCorrectButton()}</View>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {getHistory()}
          </View>
          <Modal visible={reviewModal} animationType="slide" transparent={true}>
            <View style={{ marginTop: height - 430 }}>
              <ReviewModal
                setReviewModal={setReviewModal}
                reviewModal={reviewModal}
              />
            </View>
          </Modal>
          <Modal
            visible={reactionModal}
            animationType="slide"
            transparent={true}
          >
            <View style={{ marginTop: height - 430 }}>
              <ReactionModal
                setReactionModal={setReactionModal}
                reactionModal={reactionModal}
              />
            </View>
          </Modal>
          <Modal visible={blockModal} animationType="slide" transparent={true}>
            <View style={{ marginTop: height - 430 }}>
              <BlockModal
                setBlockModal={setBlockModal}
                blockModal={blockModal}
              />
            </View>
          </Modal>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dateText: {
    fontWeight: "bold",
    fontSize: 8,
    color: colors.lightText,
  },
  historyContainer: {
    width: 350,
    height: 60,
    borderRadius: 12,
    marginVertical: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryColor,
    padding: 12,
  },
  review: {
    position: "absolute",
    top: 70,
    left: 310,
  },
  reaction: {
    position: "absolute",
    top: 68,
    left: 280,
  },
  flatListContainer: {
    height: 400,
    width: width - 30,
    marginLeft: 15,
    backgroundColor: colors.shade,
    borderRadius: 12,
    marginTop: 12,
  },
  button: {
    flex: 1,
    height: 40,
    marginHorizontal: 6,
    marginTop: 12,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryColor,
  },
  swap: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  bottomBox: {
    height: 380,
    width: width - 30,
    marginLeft: 15,
    marginTop: 18,
    borderRadius: 12,
    backgroundColor: colors.shade,
  },
  title: {
    width: width - 30,
    fontWeight: "bold",
    fontSize: 28,
    marginTop: 20,
    marginLeft: 15,
    textAlign: "center",
  },
  textCard: {
    width: "90%",
    marginLeft: "5%",
    height: 100,
    marginVertical: 12,
    borderRadius: 12,
    padding: 12,
    backgroundColor: colors.primaryColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.lightText,
  },
  genericText: {
    fontWeight: "bold",
  },
  enlarge: {
    borderWidth: 2,
    borderColor: colors.border,
    transform: [{ translateY: -8 }],
  },
});
