export function getDate(format) {
  const date = new Date();
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  const time = String(date.getTime());

  let result = "";
  switch (format) {
    case "YYYYMMDDhhmmss":
      result = year + month + day + time;
      break;
    case "YYYYMMDDhhmmssmm":
      break;
    default: // YYYYMMDD
      result = year + month + day;
      break;
  }

  return result;
}

export function getUid() {
  return (
    getDate("YYYYMMDDhhmmss") + String(Math.round(Math.random() * 1000000))
  );
}

export function deepCopy(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  const copy = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }

  return copy;
}

export function vaildPassword(pwA, pwB) {
  // null check
  if (!pwA || !pwB) return false;

  // diff check
  if (pwA !== pwB) return false;

  return true;
}

export const generateCharactersString = () => {
  let characters = "";

  // Add uppercase letters
  for (let i = 65; i <= 90; i++) {
    characters += String.fromCharCode(i);
  }

  // Add lowercase letters
  for (let i = 97; i <= 122; i++) {
    characters += String.fromCharCode(i);
  }

  // Add numbers
  for (let i = 0; i <= 9; i++) {
    characters += i.toString();
  }

  return characters;
};

export const generateRandomString = () => {
  const characters = generateCharactersString();

  let result = "";
  const length = Math.floor(Math.random() * 11) + 10;
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
};

export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (e) {
    return false;
  }
};
