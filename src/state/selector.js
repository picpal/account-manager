// selectors.js
import { selector } from "recoil";
import { loginState, accountsState } from "./atoms";

export const loginNextState = selector({
  key: "loginNextState",
  get: ({ get }) => {
    return get(loginState);
  },
});

export const accountsNextStatus = selector({
  key: "accountsNextStatus",
  get: ({ get }) => {
    return get(accountsState);
  },
  set: ({ set, get }, newValue) => {
    // const currentValue = get(accountsState);
    // console.log(currentValue);
    // console.log(newValue)
    // const updatedValue = [...currentValue, ...newValue];
    set(accountsState, newValue);
  },
});
