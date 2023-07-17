import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import { getTheme } from "../../utils/getTheme";

export default function IconButton({ name, color, size, onPress }) {
  const borderStyle = {
    width: size * 1.75,
    maxHeight: size * 2,
    borderRadius: size * 1.5,
  };
  const theme = getTheme();

  const styles = StyleSheet.create({
    buttonContainer: {
      borderWidth: 3,
      borderColor: "white",
      padding: 10,
      alignItems: "center",
      backgroundColor:
        theme === "dark"
          ? Colors.backgroundButton
          : Colors.backgroundButton_light,
    },
    pressed: {
      opacity: 0.7,
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
        borderStyle,
        styles.buttonContainer,
        pressed && styles.pressed,
      ]}
    >
      <Ionicons name={name} color={color} size={size} />
    </Pressable>
  );
}
