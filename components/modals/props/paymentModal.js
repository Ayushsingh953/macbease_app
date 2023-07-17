import axios from "axios";
import { useContext } from "react";
import { View, StyleSheet, Dimensions, Text, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { center } from "../../../constants/styles";
import SimpleFlatButton from "../../ui/simpleFlatButton";
import { PropContext } from "../../../store/prop-context";
import { URL } from "../../../utils/backend_config";
import { AuthContext } from "../../../store/auth-context";

const { width, height } = Dimensions.get("window");

function PaymentModal({
  color,
  setModalActive,
  setModalState,
  modalProp,
  day,
  pickedSlots,
}) {
  const authCtx = useContext(AuthContext);
  const propCtx = useContext(PropContext);
  const message = propCtx.message;
  const id = propCtx.id;

  async function paymentHandler() {
    console.log(pickedSlots);
    if (pickedSlots.length === 0) {
      route = "placeNightOrder";
    } else {
      route = "placeOrder";
    }
    setModalState("searching");

    const data = {
      paymentSuccessful: true,
      propId: id,
      prop: modalProp,
      day: day,
      slotIndex: pickedSlots.reverse(),
    };

    const USER_TOKEN = authCtx.token;

    const config = {
      headers: {
        authorization: `Bearer ${USER_TOKEN}`,
      },
    };

    try {
      const res = await axios.post(`${URL}/props/${route}`, data, config);
      console.log("Data " + res.data);
      propCtx.setBookedId(res.data.bookedProp);
      propCtx.setOtp(res.data.otp);
      setModalState("otp");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={[styles.modalContainer, { borderColor: color }]}>
      <Pressable
        style={({ pressed }) => [
          styles.backButton,
          pressed && { opacity: 0.5 },
        ]}
        onPress={() => {
          setModalState("chooseSlot");
          //   setModalActive(false);
        }}
      >
        <FontAwesome5 name="backspace" size={20} color="#676754" />
      </Pressable>
      <View
        style={[
          styles.paymentContainer,
          { borderColor: color, shadowColor: color },
          center,
        ]}
      >
        <View>
          <Text style={[styles.text]}>{message}</Text>
          <Text style={[styles.text]}>Prop Id is {id}</Text>
        </View>
      </View>

      <View style={[styles.bottomText, center]}>
        <SimpleFlatButton
          width={100}
          color="lightblue"
          onPress={paymentHandler}
        >
          Pay
        </SimpleFlatButton>
      </View>
    </View>
  );
}

export default PaymentModal;

const styles = StyleSheet.create({
  modalContainer: {
    height: 340,
    width: width - 20,
    marginLeft: 10,
    backgroundColor: "#fffcfcf9",
    marginTop: height - 340,
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    display: "flex",
    alignItems: "center",
    paddingTop: 30,
  },
  paymentContainer: {
    width: 200,
    height: 150,
    borderRadius: 22,
    backgroundColor: "white",
    borderWidth: 0,
    shadowOffset: { height: 1, width: 3 },
    shadowRadius: 12,
    shadowOpacity: 0.9,
    elevation: 4,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#444",
    height: 40,
    width: "100%",
    textAlign: "center",
  },
  bottomText: {
    marginTop: 80,
    width: 320,
    height: 40,
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 20,
  },
});
