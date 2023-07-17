import { useContext } from "react";
import { AuthContext } from "../store/auth-context";

export function getTheme() {
  const authCtx = useContext(AuthContext);
  const theme = authCtx.theme;
  return theme;
}
