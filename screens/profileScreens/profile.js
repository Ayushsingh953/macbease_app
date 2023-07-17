import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  Pressable,
  Animated,
  ScrollView,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { profile, communityData } from "../../constants/profile-data";
import CommunityPin from "../../components/profile/communityPin";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import Card3 from "../../components/profile/card3";
import Expand from "../../components/profile/expand";

const SPACING = 12;
const { width, height } = Dimensions.get("screen");
const Carousel_H = 220;
const Carousel_W = 320;

const animation = {
  0: { opacity: 0 },
  1: { opacity: 1 },
};

const animation1 = {
  0: { opacity: 0, translateX: -200 },
  1: { opacity: 1, translateX: 0 },
};

export default function Profile({ route, navigation }) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [modal, setModal] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);
  const { img, name } = route.params;
  return (
    <SafeAreaView>
      <Modal
        visible={modal}
        transparent={true}
        animationType="slide"
        style={{ position: "absolute" }}
      >
        <Expand modalData={modalData} setModal={setModal} />
      </Modal>
      <Animatable.View
        style={styles.profile}
        animation={animation1}
        useNativeDriver
        delay={600}
      >
        <View style={styles.img}>
          <Image
            source={{ uri: img }}
            style={{
              width: height * 0.1,
              height: height * 0.1,
              borderRadius: height * 0.05,
              resizeMode: "cover",
            }}
          />
        </View>
        <View style={styles.stats}>
          <Text style={styles.profileText}>@ {name}</Text>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="pencil" size={16} color="#444" />
            <Text style={styles.profileText}>{profile.course}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome
              name="group"
              size={14}
              color="#444"
              style={{ marginRight: 3, marginTop: 3 }}
            />
            <Text style={styles.profileText}>
              Part of {profile.clubs.length} clubs{" "}
            </Text>
          </View>
        </View>
        <View style={styles.invite}>
          <Pressable
            style={({ pressed }) => [
              styles.prompt,
              { width: "90%" },
              pressed && { opacity: 0.7 },
            ]}
          >
            <Text style={styles.buttonText}>Text</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.prompt,
              { width: "90%", marginTop: 6 },
              pressed && { opacity: 0.7 },
            ]}
          >
            <FontAwesome name="coffee" size={20} color="white" />
          </Pressable>
        </View>
      </Animatable.View>
      <ScrollView>
        <Animatable.View animation={animation} useNativeDriver delay={600}>
          <View style={styles.title}>
            <Text style={styles.titleText}>{name}'s cards...</Text>
          </View>
          <Animated.FlatList
            data={profile.cards}
            keyExtractor={(_, index) => index}
            horizontal
            snapToInterval={Carousel_W + 2 * SPACING}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 1) * (Carousel_W + 20),
                index * (Carousel_W + 20),
                (index + 1) * (Carousel_W + 20),
              ];
              const translateXHeading = scrollX.interpolate({
                inputRange,
                outputRange: [width * 0.1, 0, -width * 0.1],
              });
              const opacity = scrollX.interpolate({
                inputRange: inputRange,
                outputRange: [0.3, 1, 0.3],
                extrapolate: "clamp",
              });
              return (
                <Card3
                  item={item}
                  opacity={opacity}
                  translateXHeading={translateXHeading}
                  navigation={navigation}
                  setModalData={setModalData}
                  setModal={setModal}
                  index={index}
                />
              );
            }}
          />
          <View style={styles.title}>
            <Text style={styles.titleText}>
              Clubs and communities part of...
            </Text>
          </View>
          <View style={styles.container}>
            <FlatList
              data={profile.clubs}
              keyExtractor={(_, index) => index}
              contentContainerStyle={{ padding: 12 }}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <Pressable
                    style={({ pressed }) => [pressed && { opacity: 0.5 }]}
                  >
                    <View style={styles.cardClub}>
                      <Image
                        source={{ uri: item.url }}
                        style={{
                          height: 80,
                          width: 80,
                          borderRadius: 40,
                          resizeMode: "cover",
                        }}
                      />
                      <Text style={styles.subtitle}>{item.name}</Text>
                    </View>
                  </Pressable>
                );
              }}
            />
          </View>
          <View style={[styles.title, { marginBottom: 2 * SPACING }]}>
            <Text style={styles.titleText}>Top contributions...</Text>
          </View>
          {communityData.map((item, index) => {
            return <CommunityPin data={item} key={index} img={img} />;
          })}
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  prompt: {
    height: 30,
    borderRadius: 2 * SPACING,
    backgroundColor: "#1ea1ed",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    fontWeight: "bold",
    marginTop: 8,
  },
  cardClub: {
    height: 200,
    width: 125,
    borderRadius: 22,
    borderWidth: 0.5,
    borderColor: "#bab8b8",
    marginHorizontal: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    // borderWidth: 0.5,
    marginTop: 18,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 22,
    marginLeft: SPACING,
    color: "#444",
  },
  title: {
    // borderWidth: 0.5,
    marginTop: SPACING,
  },
  profileText: {
    fontWeight: "bold",
    marginTop: 1,
    fontSize: 14,
    color: "#505053",
  },
  invite: {
    // borderWidth: 0.5,
    height: "100%",
    width: "25%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  stats: {
    // borderWidth: 0.5,
    height: "100%",
    width: "45%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  img: {
    // borderWidth: 0.5,
    height: "100%",
    width: "30%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  profile: {
    marginLeft: SPACING,
    height: height * 0.12,
    width: width - 2 * SPACING,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
