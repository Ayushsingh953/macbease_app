import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { StatusBar } from "expo-status-bar";

import List from "../giftScreens/List";
import ImageList from "../giftScreens/ImageList";
import ComposeMsg from "../giftScreens/composeMsg";
import PreviewScreen from "../giftScreens/previewScreen";
import Notifications from "../giftScreens/notifications";
import Secondary from "../giftScreens/secondary";
import VideoPlayer from "../giftScreens/videoPlayer";

const Stack = createSharedElementStackNavigator();

export default function Gift() {
  return (
    <>
      <StatusBar style="dark" />

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="list" component={List} />
        <Stack.Screen
          name="image"
          component={ImageList}
          options={() => ({
            // gestureEnabled: true,
            transitionSpec: {
              open: { animation: "timing", config: { duration: 1000 } },
              close: { animation: "timing", config: { duration: 1000 } },
            },
          })}
        />
        <Stack.Screen name="composeMsg" component={ComposeMsg} />
        <Stack.Screen
          name="previewScreen"
          component={PreviewScreen}
          options={() => ({
            // gestureEnabled: true,
            transitionSpec: {
              open: { animation: "timing", config: { duration: 1000 } },
              close: { animation: "timing", config: { duration: 1000 } },
            },
          })}
        />
        <Stack.Screen name="notifications" component={Notifications} />
        <Stack.Screen name="secondary" component={Secondary} />
        <Stack.Screen name="videoPlayer" component={VideoPlayer} />
      </Stack.Navigator>
    </>
  );
}
