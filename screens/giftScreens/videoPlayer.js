import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";

import { reactions } from "../../constants/gift-data";
import img from "../../assets/profile/pexels-andrea-piacquadio-3763188.jpg";

const { width, height } = Dimensions.get("screen");

const animation = {
  0: { opacity: 0, translateY: -100 },
  1: { opacity: 1, translateY: 0 },
};

export default function VideoPlayer({ navigation, route }) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current.scrollToOffset({
      offset: index * width,
      animated: true,
    });
  }, []);
  const { index } = route.params;
  const downloadFromUrl = async (url) => {
    const filename = "macbease.mp4";
    const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (perm.status != "granted") {
      return;
    }
    const downloadInstance = FileSystem.createDownloadResumable(
      url,
      FileSystem.documentDirectory + filename
    );
    const result = await downloadInstance.downloadAsync();
    console.log(result);
    try {
      const asset = await MediaLibrary.createAssetAsync(result.uri);
      const album = await MediaLibrary.getAlbumAsync("Download");
      if (album == null) {
        await MediaLibrary.createAlbumAsync("download", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
    } catch (e) {
      console.log(e);
    }
    if (Platform.OS === "ios") {
      save(result.uri);
    }
  };

  const save = async (uri) => {
    await shareAsync(uri);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={ref}
        data={reactions}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        snapToInterval={width}
        decelerationRate="normal"
        renderItem={({ item, index }) => {
          return (
            <>
              <Pressable
                style={({ pressed }) => [
                  pressed && { opacity: 0.5 },
                  styles.goBack,
                ]}
                onPress={() => navigation.navigate("list")}
              >
                <Ionicons name="chevron-back" size={28} color="black" />
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  pressed && { opacity: 0.5 },
                  styles.download,
                ]}
                onPress={() => {
                  downloadFromUrl(item.url);
                }}
              >
                <MaterialIcons name="file-download" size={24} color="black" />
              </Pressable>
              <View style={{ zIndex: -10 }}>
                <Video
                  style={{ height: height, width: width }}
                  source={{ uri: item.url }}
                  resizeMode={ResizeMode.COVER}
                  useNativeControls
                  isLooping
                />
              </View>
              <Animatable.View
                style={{
                  height: 60,
                  width: "100%",
                  zIndex: 99,
                  position: "absolute",
                  top: height - 80,
                  left: 20,
                }}
                animation={animation}
                delay={600}
                useNativeDriver
              >
                <Image
                  source={img}
                  style={{ height: 60, width: 60, borderRadius: 30 }}
                />
              </Animatable.View>
            </>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  goBack: {
    position: "absolute",
    top: 50,
    left: 20,
    height: 30,
    width: 30,
  },
  download: {
    position: "absolute",
    top: 50,
    right: 20,
    height: 30,
    width: 30,
  },
});
