import { View, StyleSheet, Text, TextInput } from "react-native";
import { Colors } from "../../constants/colors";
import { authFormStyle } from "../../constants/styles";
import { getTheme } from "../../utils/getTheme";

export default function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
}) {
  const theme = getTheme();
  const backgroundColor =
    theme === "dark" ? Colors.backgroundButton : Colors.backgroundButton_light;
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        style={[authFormStyle.container, styles.input, , { backgroundColor }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
  },
  input: {
    width: 300,
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: "white",
    borderRadius: 18,
    fontSize: 16,
    marginBottom: 10,
  },
  label: {
    color: "white",
    marginBottom: 10,
    fontSize: 18,
  },
});
