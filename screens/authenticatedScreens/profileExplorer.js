import { StyleSheet, Text, View } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import List from "../profileScreens/list";
import Search from "../profileScreens/search";
import Profile from "../profileScreens/profile";
import Prompts from "../profileScreens/prompts";
import MyCard from "../profileScreens/myCards";
import Explore from "../profileScreens/explore";
import ChooseInterest from "../profileScreens/chooseInterest";
import SavedCards from "../profileScreens/savedCards";

const Stack = createNativeStackNavigator();

export default function ProfileExplorer() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="list" component={List} />
      <Stack.Screen name="search" component={Search} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="prompts" component={Prompts} />
      <Stack.Screen name="myCard" component={MyCard} />
      <Stack.Screen name="explore" component={Explore} />
      <Stack.Screen name="chooseInterest" component={ChooseInterest} />
      <Stack.Screen name="savedCards" component={SavedCards} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
