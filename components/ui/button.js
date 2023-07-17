import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";
import { authFormStyle } from "../../constants/styles";
import { getTheme } from "../../utils/getTheme";

export default function Button({ title, onPress }) {
  const theme = getTheme();

  const styles = StyleSheet.create({
    container: {
      width: 250,
      height: 50,
      marginBottom: 15,
      backgroundColor:
        theme === "dark"
          ? Colors.backgroundButton
          : Colors.backgroundButton_light,
    },
    pressed: {
      opacity: 0.75,
      backgroundColor:
        theme === "dark"
          ? Colors.backgroundButtonPressed
          : Colors.backgroundButtonPressed_light,
    },
  });

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        authFormStyle.container,
        styles.container,
        pressed && styles.pressed,
      ]}
    >
      <Text style={authFormStyle.title}>{title}</Text>
    </Pressable>
  );
}
