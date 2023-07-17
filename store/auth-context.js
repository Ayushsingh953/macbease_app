import { createContext, useState } from "react";

export const AuthContext = createContext({
  theme: "",
  token: "",
  isAuthenticated: false,
  email: "",
  username: "",
  registration: 0,
  password: "",
  setEmail: (email) => {},
  setUsername: (username) => {},
  setRegistration: (registration) => {},
  setPassword: (password) => {},
  authenticate: (token) => {},
  logout: () => {},
  setTheme: (theme) => {},
});

function AuthContextProvider({ children }) {
  const [deviceTheme, setDeviceTheme] = useState();
  const [authToken, setAuthToken] = useState("");
  const [authEmail, setAuthEmail] = useState();
  const [authUsername, setAuthUsername] = useState();
  const [authRegistration, setAuthRegistration] = useState();
  const [authPassword, setAuthPassword] = useState();

  function setTheme(theme) {
    setDeviceTheme(theme);
  }

  function setEmail(email) {
    setAuthEmail(email);
  }

  function setUsername(username) {
    setAuthUsername(username);
  }

  function setRegistration(registration) {
    setAuthRegistration(registration);
  }

  function setPassword(password) {
    const promise = new Promise((resolve, reject) => {
      try {
        setAuthPassword(password);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
    return promise;
  }

  function authenticate(token) {
    setAuthToken(token);
  }

  function logout() {
    setAuthToken();
  }

  const value = {
    theme: deviceTheme,
    token: authToken,
    isAuthenticated: !!authToken,
    email: authEmail,
    username: authUsername,
    registration: authRegistration,
    password: authPassword,
    setEmail: setEmail,
    setUsername: setUsername,
    setRegistration: setRegistration,
    setPassword: setPassword,
    authenticate: authenticate,
    logout: logout,
    setTheme: setTheme,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
