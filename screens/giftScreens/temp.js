import { Image, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ComposeMsg({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <Image
                    source={require("./assets/pen_icon.png")}
                    resizeMode="cover"
                    style={{ width: 100, height: 100 }}
                />
            </View>
            <View
                style={{
                    width: 300,
                    height: 350,
                    backgroundColor: "orange",
                    alignSelf: "center",
                    borderRadius: 16,
                }}
            >
                <Image
                    source={require("./assets/classical_paper.png")}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        borderRadius: 16,
                    }}
                />
                <TextInput
                    placeholder="Compose Your Message..."
                    style={styles.input}
                    spellCheck={false}
                    autoCorrect={false}
                    placeholderTextColor="#f50a54"
                    multiline
                    textAlignVertical="top"
                />
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFADA",
    },
    text: {
        fontSize: 18,
        fontFamily: "cedarville-cursive",
    },
    input: {
        flex: 1,
        fontFamily: "cedarville-cursive",
        overflow: "hidden",
        marginTop: 15,
        marginHorizontal: 45,
        marginBottom: 100,
        color: "black",
        fontSize: 16,
    },
});