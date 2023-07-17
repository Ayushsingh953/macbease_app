import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EmailScreen from "../signupScreens/emailScreen";
import PasswordScreen from "../signupScreens/passwordScreen";
import UsernameSreen from "../signupScreens/usernameScreen";

const Stack = createNativeStackNavigator();

export default function SignupScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="email" component={EmailScreen} />
      <Stack.Screen name="username" component={UsernameSreen} />
      <Stack.Screen name="password" component={PasswordScreen} />
    </Stack.Navigator>
  );
}
