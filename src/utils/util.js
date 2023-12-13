export function getDate(format) {
  const date = new Date();
  const year = String(date.getFullYear());
  const month = String(date.getMonth()+1);
  const day = String(date.getDate());

  let result = "";
  switch (format) {
    case "YYYYMMDDhhmmss":
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
    getDate() + String(Math.round(Math.random() * 1000000))
  );
}


export function deepCopy(obj){
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
};

export function vaildPassword(pwA, pwB){
  // null check
  if(!pwA || !pwB) return false;
  
  // diff check
  if(pwA !== pwB) return false;
  
  return true;
}