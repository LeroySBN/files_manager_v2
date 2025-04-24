import {createContext} from "react";

export const user = {
  email: "",
  password: "",
  isLoggedIn: false,
};

export function logOut() {
  user.isLoggedIn = false;
}

export const AppContext = createContext({
  user,
  logOut,
});
