import React from "react";
import { useState } from "react";
import { StyleSheet, View, Text, Dimensions, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Animatable from "react-native-animatable";


const { width, height } = Dimensions.get("window");

const animation1 = {
    0: { opacity: 0, translateX: -300 },
    1: { opacity: 1, translateX: 0 }
};

const animation2 = {
    0: { opacity: 0, translateX: 300 },
    1: { opacity: 1, translateX: 0 }
};

const msg = "We at Macbease believe in making you feel better.If someone used this platform in unfair way you can report it to us or block the person from sending you anything in the future. ";

const arr = [
    {
        key: 1,
        value: "Yes,I loved it."
    },
    {
        key: 2,
        value: "Block this sender."
    }

];

export default function ReviewModal({ setReviewModal, reviewModal }) {
    const [info, setInfo] = useState(false);
    const [option, setOption] = useState();
    const [isLoading, setIsLoading] = useState(false);
    function getRightTick(value) {
        if ((value === 1 && option === 1) || (value === 2 && option === 2)) {
            return (
                <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }, styles.tickButton, { borderWidth: 2, borderColor: "#2cf185" }]} onPress={() => setOption(null)}>
                    <FontAwesome5 name="check" size={14} color="black" />
                </Pressable>
            )
        }
        else {
            return (
                <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }, styles.tickButton]} onPress={() => setOption(value)}>
                    <FontAwesome5 name="check" size={14} color="black" />
                </Pressable>
            )
        }
    }

    function handleSubmitEvent() {
        setTimeout(() => {
            setReviewModal(false);
        }, 3000);
    }


    function getCorrectContent() {
        if (info) {
            return (
                <>
                    <Animatable.View
                        style={styles.infoBox}
                        animation={animation1}
                        delay={600}
                        useNativeDriver
                    >
                        <Text style={styles.infoText}>{msg}</Text>
                    </Animatable.View>
                    <Animatable.View
                        animation={animation2}
                        delay={600}
                        useNativeDriver
                    >
                        <Pressable onPress={() => setInfo(false)} style={({ pressed }) => [styles.okay, pressed && { opacity: 0.5 }]}>
                            <Text style={styles.infoText}>Okay!</Text>
                        </Pressable>
                    </Animatable.View>
                </>
            )
        }
        else {
            return (
                <>
                    <View style={styles.infoBox}>
                        <Animatable.View
                            style={styles.ratingCard}
                            key={arr[0].key}
                            animation={animation1}
                            delay={600}
                            useNativeDriver
                        >
                            <Text style={styles.ratingText}>{arr[0].value}</Text>
                            {getRightTick(1)}
                        </Animatable.View>
                        <Animatable.View
                            style={styles.ratingCard}
                            key={arr[1].key}
                            animation={animation2}
                            delay={600}
                            useNativeDriver
                        >
                            <Text style={styles.ratingText}>{arr[1].value}</Text>
                            {getRightTick(2)}
                        </Animatable.View>
                    </View>
                    <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }, styles.submit]} onPress={() => { setIsLoading(true); handleSubmitEvent() }}>
                        {isLoading ? <Text style={styles.infoText}>Loading</Text> : <Text style={styles.infoText}>Submit</Text>}
                    </Pressable>
                </>
            )
        }
    }

    return (
        <View style={styles.modalContainer}>
            <Text style={styles.title}>How was your experience?</Text>
            <View style={styles.info}>
                <Pressable onPress={() => setInfo(true)}>
                    <AntDesign name="infocirlce" size={18} color="#444" />
                </Pressable>
            </View>
            {getCorrectContent()}
        </View>
    )
};

const styles = StyleSheet.create({
    submit: {
        height: 30,
        width: 120,
        borderRadius: 12,
        marginLeft: (width - 30) / 2 - 60,
        marginTop: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8eacb"
    },
    tickButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        position: "absolute",
        left: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8eacb"
    },
    ratingText: {
        fontWeight: "bold",
    },
    ratingCard: {
        width: 300,
        height: 60,
        marginVertical: 12,
        borderRadius: 12,
        backgroundColor: "white",
        paddingRight: 12,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    okay: {
        width: width - 320,
        height: 30,
        marginLeft: (width / 2) - ((width - 290) / 2),
        marginTop: 30,
        backgroundColor: "#f8eacb",
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    infoText: {
        fontWeight: "bold",
        fontSize: 16,
        letterSpacing: 1.6,
        lineHeight: 22,
        textAlign: "center",
        color: "#444"

    },
    infoBox: {
        width: width - 100,
        height: 200,
        marginLeft: 30,
        marginTop: 22,
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8eacb",
        padding: 20
    },
    info: {
        position: "absolute",
        top: 24,
        left: width - 80
    },
    title: {
        fontWeight: "bold",
        marginTop: 20,
        textAlign: "center",
        fontSize: 22,
        color: "#444"
    },
    modalContainer: {
        marginTop: height - 400,
        height: 420,
        width: width - 30,
        marginLeft: 15,
        marginTop: 18,
        borderRadius: 12,
        backgroundColor: "#e2e2dc"
    }
});