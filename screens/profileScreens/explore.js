import React from "react";
import { StyleSheet, View, Text, Dimensions, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { search } from "../../constants/profile-data";
import LottieView from "lottie-react-native";
import Card2 from "../../components/profile/card2";

const { width, height } = Dimensions.get("screen");
const SPACING = 12;
const Carousel_H = 220;
const Carousel_W = 280;

export default function Explore({ route, navigation }) {
  const [loading, setLoading] = React.useState(true);
  const [result, setResult] = React.useState(null);
  const scrollY = React.useRef(new Animated.Value(0)).current;

  function fetchSearchResult() {
    setTimeout(() => {
      setResult(search);
      setLoading(false);
    }, 2000);
  }

  React.useEffect(() => {
    fetchSearchResult();
  }, []);

  function getCorrectContent() {
    if (loading) {
      return (
        <View
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: width * 0.3,
          }}
        >
          <LottieView
            source={require("../../assets/141572-space-boy-developer.json")}
            autoPlay
            loop
            style={[{ width: 260, height: 260 }]}
          />
          <Text style={styles.searching}>
            Hold on while we are generating feed for you!
          </Text>
        </View>
      );
    } else {
      return (
        <SafeAreaView>
          <Animated.ScrollView
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
          >
            {result.map((item, index) => {
              const inputRange = [
                (index - 1) * (Carousel_H + 42),
                index * (Carousel_H + 42),
                (index + 1) * (Carousel_H + 42),
              ];
              const opacity = scrollY.interpolate({
                inputRange: inputRange,
                outputRange: [1, 1, 0],
              });
              return (
                <Card2
                  item={item}
                  opacity={opacity}
                  navigation={navigation}
                  index={index}
                  key={index}
                />
              );
            })}
          </Animated.ScrollView>
        </SafeAreaView>
      );
    }
  }

  return <>{getCorrectContent()}</>;
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginLeft: SPACING,
    marginBottom: SPACING,
    color: "#444",
  },
  scrollView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  subSearching: {
    fontWeight: "bold",
    marginTop: 6,
    color: "#68686bcf",
  },
  searching: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
