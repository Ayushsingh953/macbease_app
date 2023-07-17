import { createContext, useState } from "react";

export const PropContext = createContext({
  message: "",
  id: "",
  bookedId: "",
  otp: 0,
  setMessage: (message) => {},
  setId: (id) => {},
  setBookedId: (bookedId) => {},
  setOtp: (otp) => {},
});

function PropContextProvider({ children }) {
  const [propMessage, setPropMessage] = useState();
  const [propId, setPropId] = useState();
  const [bookedPropId, setBookedPropId] = useState();
  const [bookingOpt, setBookingOpt] = useState();

  function setMessage(message) {
    setPropMessage(message);
  }

  function setId(id) {
    setPropId(id);
  }

  function setBookedId(bookedId) {
    setBookedPropId(bookedId);
  }

  function setOtp(otp) {
    setBookingOpt(otp);
  }

  const value = {
    message: propMessage,
    id: propId,
    bookedId: bookedPropId,
    otp: bookingOpt,
    setBookedId: setBookedId,
    setOtp: setOtp,
    setMessage: setMessage,
    setId: setId,
  };

  return <PropContext.Provider value={value}>{children}</PropContext.Provider>;
}

export default PropContextProvider;
