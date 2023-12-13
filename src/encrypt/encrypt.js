import CryptoJS from 'crypto-js';

export function encrypt(text,secret) {
  let encrypted = CryptoJS.AES.encrypt(text, secret).toString();
  return encrypted;
}

export function decrypt(encrypted,secret) {
    let decrypted = CryptoJS.AES.decrypt(encrypted, secret).toString(CryptoJS.enc.Utf8);
    return decrypted;
}

export function encryptSHA256(text) {
    return CryptoJS.SHA256(text).toString();
}
