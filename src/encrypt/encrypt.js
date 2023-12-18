import CryptoJS from "crypto-js";

export function encrypt(text, secret) {
  let encrypted = CryptoJS.AES.encrypt(text, secret);
  // The toString() method with no arguments will return the CipherParams object formatted as an OpenSSL-compatible string
  return encrypted.toString();
}

export function decrypt(encrypted, secret) {
  let bytes = CryptoJS.AES.decrypt(encrypted, secret);
  let decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
}

export function encryptSHA256(text) {
  return CryptoJS.SHA256(text).toString();
}
