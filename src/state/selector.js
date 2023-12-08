// selectors.js
import { selector } from "recoil";
import { loginState } from "./atoms";

export const loginNextState = selector({
  key: "loginNextState",
  get: ({ get }) => {
    return get(loginState);
  }
});