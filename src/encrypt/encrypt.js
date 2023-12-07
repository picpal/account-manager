import CryptoJS from 'crypto-js';

const secret = 'secretkey'; // replace with your secret key

export function encrypt(text) {
  let encrypted = CryptoJS.AES.encrypt(text, secret).toString();
  return encrypted;
}

export function decrypt(encrypted) {
    let decrypted = CryptoJS.AES.decrypt(encrypted, secret).toString(CryptoJS.enc.Utf8);
    return decrypted;
}

export function encryptSHA256(text) {
    return CryptoJS.SHA256(text).toString();
}
