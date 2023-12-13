import { atom } from "recoil";

export const loginState = atom({
  key: "loginState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const popupStatus = atom({
  key: "popupStatus", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const accountsState = atom({
  key: "accountsState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const filterAccountsState = atom({
  key: "filterAccountsState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
