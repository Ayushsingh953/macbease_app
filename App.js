import { useContext, useEffect, useRef, useState } from "react";
import {
  Appearance,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Social from "./screens/authenticatedScreens/Social";
import Gifts from "./screens/authenticatedScreens/Gifts";
import ProfileExplorer from "./screens/authenticatedScreens/profileExplorer";
import Props from "./screens/authenticatedScreens/Props";
import Community from "./screens/authenticatedScreens/Community";
import StartScreen from "./screens/authScreens/startScreen";
import LoginScreen from "./screens/authScreens/loginScreen";
import SignupScreen from "./screens/authScreens/signupScreen";

import AuthContextProvider, { AuthContext } from "./store/auth-context";
import PropContextProvider from "./store/prop-context";
import GiftContextProvider from "./store/gift-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabButton = (props) => {
  const { name, onPress, size, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: { scale: 0.5, rotate: "0deg" },
        1: { scale: 1.5, rotate: "360deg" },
      });
    } else {
      viewRef.current.animate({
        0: { scale: 1.5, rotate: "360deg" },
        1: { scale: 1, rotate: "0deg" },
      });
    }
  }, [focused]);
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={styles.buttonContainer}
    >
      <Animatable.View
        ref={viewRef}
        duration={500}
        style={styles.buttonContainer}
      >
        <Ionicons
          name={focused ? name.active : name.inactive}
          size={size}
          color={focused ? "#5c66be" : "#595e87"}
        />
      </Animatable.View>
    </TouchableOpacity>
  );
};

function AuthenticatedScreens() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
          // position: "absolute",
          // bottom: 16,
          // marginHorizontal: 10,
          // borderRadius: 16,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Socail"
        component={Social}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "grid-sharp" : "grid-outline"}
              size={24}
              color={color}
            />
          ),
          tabBarButton: (props) => (
            <TabButton
              {...props}
              name={{ active: "rocket-sharp", inactive: "rocket-outline" }}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Gifts"
        component={Gifts}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "gift-sharp" : "gift-outline"}
              size={24}
              color={color}
            />
          ),
          tabBarButton: (props) => (
            <TabButton
              {...props}
              name={{ active: "gift-sharp", inactive: "gift-outline" }}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ProfileExplorer}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "compass-sharp" : "compass-outline"}
              size={30}
              color={color}
            />
          ),
          tabBarButton: (props) => (
            <TabButton
              {...props}
              name={{ active: "compass-sharp", inactive: "compass-outline" }}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Props"
        component={Props}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AntDesign
              name={focused ? "star-sharp" : "star-outline"}
              size={24}
              color={color}
            />
          ),
          tabBarButton: (props) => (
            <TabButton
              {...props}
              name={{ active: "star-sharp", inactive: "star-outline" }}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={Community}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "people-sharp" : "people-outline"}
              size={24}
              color={color}
            />
          ),
          tabBarButton: (props) => (
            <TabButton
              {...props}
              name={{ active: "people-sharp", inactive: "people-outline" }}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AuthScreens() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="start" component={StartScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="signUp" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function getToken() {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log(token);
        if (token !== null) {
          authCtx.authenticate(token);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getToken();
  }, []);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthScreens />}
      {authCtx.isAuthenticated && <AuthenticatedScreens />}
    </NavigationContainer>
  );
}

export default function App() {
  useEffect(() => {
    async function prepare() {
      SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const [fontsLoaded] = useFonts({
    "monoSpace-regular": require("./assets/fonts/monospace/Nunito-VariableFont_wght.ttf"),
    "monoSpace-bold": require("./assets/fonts/fontsSpace/SpaceMono-Bold.ttf"),
    cursive: require("./assets/fonts/Cedarville_Cursive/CedarvilleCursive-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <AuthContextProvider>
      <GiftContextProvider>
        <PropContextProvider>
          <Navigation />
        </PropContextProvider>
      </GiftContextProvider>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
