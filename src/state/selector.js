// selectors.js
import { selector } from "recoil";
import { loginState , popupStatus} from "./atoms";

export const loginNextState = selector({
  key: "loginNextState",
  get: ({ get }) => {
    return get(loginState);
  }
});

export const popupNextStatus = selector({
  key: "popupNextStatus",
  get: ({ get }) => {
    return get(popupStatus);
  }
});