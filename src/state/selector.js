// selectors.js
import { selector } from "recoil";
import { loginState, popupStatus, accountsState } from "./atoms";

export const loginNextState = selector({
  key: "loginNextState",
  get: ({ get }) => {
    return get(loginState);
  },
});

export const popupNextStatus = selector({
  key: "popupNextStatus",
  get: ({ get }) => {
    return get(popupStatus);
  },
});

export const accountsNextStatus = selector({
  key: "accountsNextStatus",
  get: ({ get }) => {
    return get(popupStatus);
  },
  set: ({ set, get }, newValue) => {
    const currentValue = get(accountsState);
    const updatedValue = [...currentValue, ...newValue];
    set(accountsState, updatedValue);
  },
});
