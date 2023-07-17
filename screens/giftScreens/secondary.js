import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Animated,
  Dimensions,
  Pressable,
  Modal,
} from "react-native";
import * as Animatable from "react-native-animatable";

import { GiftContext } from "../../store/gift-context";
import { DATA, giftsData } from "../../constants/gift-data";
import GiftModal from "../../components/modals/gifts/giftModal";
import { SharedElement } from "react-navigation-shared-element";

const ITEM_SIZE = 220 + 30;
const SPACING = 10;
const { width, height } = Dimensions.get("screen");

const animation = {
  0: { opacity: 0, translateY: -200 },
  1: { opacity: 1, translateY: 0 },
};

export default function ComposeMsg({ navigation }) {
  const giftCtx = useContext(GiftContext);
  const [selectedGift, setSelectedGift] = useState({ key: null });
  const [giftModal, setGiftModal] = useState(false);

  const getCorrectData = () => {
    if (giftCtx.path === "envelope") {
      return giftCtx.giftData;
    }
    if (giftCtx.path === "gifts") {
      return giftCtx.envelopeData;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Goes good with your letter...</Text>
      <FlatList
        data={getCorrectData()}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={styles.flatList}
        renderItem={({ item, index }) => {
          return (
            <Animatable.View
              style={styles.card}
              animation={animation}
              delay={400 + index * 200}
              useNativeDriver
            >
              <Pressable
                onPress={() => {
                  setSelectedGift(item);
                  setGiftModal(true);
                }}
                style={({ pressed }) => pressed && [{ opacity: 0.5 }]}
              >
                <Image
                  source={{
                    uri: giftCtx.path === "envelope" ? item.cover : item.image,
                  }}
                  style={{
                    width: 150,
                    height: 150,
                    resizeMode: "cover",
                    borderRadius: 12,
                  }}
                />
              </Pressable>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={{ fontWeight: "bold" }}> ₹{item.price}</Text>
            </Animatable.View>
          );
        }}
      />
      <Modal visible={giftModal} animationType="slide" transparent={true}>
        <GiftModal
          gift={selectedGift}
          setSelectedGift={setSelectedGift}
          setGiftModal={setGiftModal}
          onPress={() => {
            setGiftModal(false);
            navigation.push("previewScreen", { selectedGift });
          }}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 70,
    marginLeft: 26,
    fontWeight: "bold",
    fontSize: 24,
  },
  flatList: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  card: {
    height: 220,
    width: width / 2 - SPACING * 2,
    marginHorizontal: SPACING,
    marginVertical: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#e2e2dc",
  },
  name: {
    fontWeight: "bold",
    height: 20,
    marginTop: 8,
  },
  bottomContainer: {
    width: "100%",
    height: 60,
    marginBottom: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  proceedButton: {
    width: 100,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#e2e2dc",
  },
});
