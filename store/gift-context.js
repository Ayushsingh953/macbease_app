import { createContext, useState } from "react";

export const GiftContext = createContext({
  path: "",
  envelopeData: [],
  giftData: [],
  message: "",
  selectedData: {},
  setPath: (path) => {},
  setEnvelopeData: (envelopes) => {},
  setGiftData: (gifts) => {},
  setComposedMessage: (message) => {},
  setSelectedData: (data) => {},
});

function GiftContextProvider({ children }) {
  const [pathSelected, setPathSelected] = useState();
  const [envelopes, setEnvelopes] = useState([]);
  const [gifts, setGifts] = useState([]);
  const [message, setMessage] = useState();
  const [selectedItem, setSelectedItem] = useState({});

  function setPath(path) {
    setPathSelected(path);
  }

  function setEnvelopeData(envelopes) {
    setEnvelopes(envelopes);
  }

  function setGiftData(gifts) {
    setGifts(gifts);
  }

  function setComposedMessage(message) {
    setMessage(message);
  }
  function setSelectedData(data) {
    setSelectedItem(data);
  }

  const value = {
    path: pathSelected,
    envelopeData: envelopes,
    giftData: gifts,
    message: message,
    selectedData: selectedItem,
    setPath: setPath,
    setEnvelopeData: setEnvelopeData,
    setGiftData: setGiftData,
    setComposedMessage: setComposedMessage,
    setSelectedData: setSelectedData,
  };

  return <GiftContext.Provider value={value}>{children}</GiftContext.Provider>;
}

export default GiftContextProvider;
