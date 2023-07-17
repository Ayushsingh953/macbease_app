import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  Pressable,
  ScrollView,
  FlatList,
  Image,
  Animated,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Foundation, FontAwesome5 } from "@expo/vector-icons";
import { data, data1, person, data2 } from "../../constants/profile-data";
import Card from "../../components/profile/card";
import { AuthContext } from "../../store/auth-context";
import { URL } from "../../utils/backend_config";
import axios from "axios";

const { width, height } = Dimensions.get("screen");
const SPACING = 12;
const Carousel_H = 200;
const Carousel_W = 280;

export default function List({ navigation }) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollX1 = React.useRef(new Animated.Value(0)).current;
  const [prompt, setPrompt] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [handpickedCards, setHandpickedCards] = React.useState([]);
  const authCtx = useContext(AuthContext);

  const config = {
    headers: {
      authorization: `Bearer ${authCtx.token}`,
    },
  };

  useEffect(() => {
    async function getInterest() {
      const res = await axios.get(`${URL}/card/getYourInterests`, config);
      console.log("Interest area of user : ");
      console.log(res.data);
    }
    getInterest();
    async function getAllCards() {
      const res = await axios.get(`${URL}/card/getAllCards`, config);
      console.log("All cards : ");
      console.log(res.data);
      let id = res.data[0].creator;

      let bio = await axios.get(`${URL}/card/getUserBio?userId=${id}`, config);
      let data = {
        name: bio.data.name,
        img: bio.data.image,
        text: res.data[0].value,
        color: data1[0].color,
      };
      let arr = [];
      arr.push(data);
      for (let i = 1; i < res.data.length; i++) {
        if (id !== res.data[i].creator) {
          id = res.data[i].creator;
          bio = await axios.get(`${URL}/card/getUserBio?userId=${id}`, config);
          let data = {
            name: bio.data.name,
            img: bio.data.image,
            text: res.data[i].value,
            color: data1[i % data1.length].color,
          };
          arr.push(data);
        }
      }
      setHandpickedCards(arr);
      setLoading(false);
    }
    getAllCards();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        size={40}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      ></ActivityIndicator>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search prompt..."
          style={styles.textInput}
          onChangeText={(txt) => setPrompt(txt)}
        />
        <Pressable
          style={({ pressed }) => [
            styles.searchButton,
            pressed && { opacity: 0.7 },
          ]}
          onPress={() => {
            if (!prompt) return;
            navigation.navigate("search", { prompt });
          }}
        >
          <FontAwesome name="search" size={22} color="#444" />
        </Pressable>
      </View>
      <ScrollView style={{ marginTop: SPACING, marginBottom: 4 * SPACING }}>
        <View style={styles.promptBox}>
          <Pressable
            style={({ pressed }) => [
              styles.prompt,
              { width: "25%" },
              pressed && { opacity: 0.7 },
            ]}
            onPress={() => {
              navigation.navigate("myCard");
            }}
          >
            <Text style={styles.buttonText}>Your cards</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.prompt,
              { width: "40%" },
              pressed && { opacity: 0.7 },
            ]}
            onPress={() => {
              navigation.navigate("prompts");
            }}
          >
            <Text style={styles.buttonText}>Generate prompts</Text>
            <Foundation
              name="lightbulb"
              size={20}
              color="white"
              style={{ marginLeft: 6, marginBottom: 4 }}
            />
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.prompt,
              { width: "30%" },
              pressed && { opacity: 0.7 },
            ]}
            onPress={() => {
              navigation.navigate("explore");
            }}
          >
            <Text style={styles.buttonText}>Explore</Text>
            <FontAwesome5
              name="wpexplorer"
              size={20}
              color="white"
              style={{ marginLeft: 6 }}
            />
          </Pressable>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>Based on your interest...</Text>
        </View>
        <Animated.FlatList
          data={handpickedCards}
          keyExtractor={(_, index) => index}
          horizontal
          snapToInterval={Carousel_W + 2 * SPACING}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          showsHorizontalScrollIndicator={false}
          renderItem={({ index, item }) => {
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
              <Card
                translateXHeading={translateXHeading}
                navigation={navigation}
                item={item}
                opacity={opacity}
              />
            );
          }}
        />
        <View style={styles.title}>
          <Text style={styles.titleText}>Recommendation of the day</Text>
        </View>
        <View style={styles.person}>
          <View style={styles.personImg}>
            <Image
              source={{ uri: person.img }}
              style={{
                width: "90%",
                height: 150,
                resizeMode: "cover",
                borderRadius: SPACING,
              }}
            />
            <Text style={styles.name}>{person.name}</Text>
          </View>
          <View style={styles.personTag}>
            <Text style={styles.tagText}>" {person.tag} "</Text>
            <Pressable
              style={({ pressed }) => [
                styles.prompt,
                { height: 30, width: 120, marginTop: SPACING },
                pressed && { opacity: 0.7 },
              ]}
              onPress={() => {
                navigation.navigate("profile", {
                  img: person.img,
                  name: person.name,
                });
              }}
            >
              <Text style={styles.buttonText}>Find more</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>We find them related to you...</Text>
        </View>
        <FlatList
          data={handpickedCards}
          keyExtractor={(_, index) => index}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ index, item }) => {
            return (
              <Pressable
                style={({ pressed }) => [
                  styles.circularImg,
                  pressed && { opacity: 0.7 },
                ]}
                onPress={() => {
                  navigation.navigate("profile", {
                    img: item.img,
                    name: item.name,
                  });
                }}
              >
                <Image
                  source={{ uri: item.img }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 50,
                    resizeMode: "cover",
                  }}
                />
              </Pressable>
            );
          }}
        />
        <View style={styles.title}>
          <Text style={styles.titleText}>Handpicked for you...</Text>
        </View>
        <Animated.FlatList
          data={handpickedCards}
          keyExtractor={(_, index) => index}
          horizontal
          snapToInterval={Carousel_W + 2 * SPACING}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX1 } } }],
            { useNativeDriver: true }
          )}
          showsHorizontalScrollIndicator={false}
          renderItem={({ index, item }) => {
            const inputRange = [
              (index - 1) * (Carousel_W + 20),
              index * (Carousel_W + 20),
              (index + 1) * (Carousel_W + 20),
            ];
            const translateXHeading = scrollX1.interpolate({
              inputRange,
              outputRange: [width * 0.1, 0, -width * 0.1],
            });
            const opacity = scrollX1.interpolate({
              inputRange: inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            return (
              <Card
                translateXHeading={translateXHeading}
                navigation={navigation}
                item={item}
                opacity={opacity}
              />
            );
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  circularImg: {
    // borderWidth: 0.5,
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: SPACING,
    marginTop: 2 * SPACING,
    marginBottom: SPACING,
  },
  tagText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  name: {
    marginTop: 6,
    fontWeight: "bold",
  },
  personTag: {
    height: "100%",
    width: "60%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  personImg: {
    height: "100%",
    width: "40%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  person: {
    borderWidth: 0.5,
    borderColor: "#09090981",
    width: width - 2 * SPACING,
    marginLeft: SPACING,
    height: Carousel_H,
    borderRadius: SPACING,
    marginTop: SPACING,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 24,
    marginLeft: SPACING,
    color: "#444",
  },
  title: {
    // borderWidth: 0.5,
    marginTop: SPACING,
  },

  buttonText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 12,
  },
  prompt: {
    height: "100%",
    borderRadius: 2 * SPACING,
    backgroundColor: "#1ea1ed",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  promptBox: {
    // borderWidth: 0.5,
    width: width - 2 * SPACING,
    marginLeft: SPACING,
    height: 36,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchButton: {
    width: "10%",
    height: "100%",
    borderRadius: SPACING,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: "90%",
    height: "100%",
    borderRadius: SPACING,
    paddingLeft: SPACING,
  },
  searchBox: {
    borderWidth: 0.5,
    borderColor: "#09090981",
    width: width - 2 * SPACING,
    marginLeft: SPACING,
    height: 40,
    borderRadius: SPACING,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
