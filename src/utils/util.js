export function getDate(format) {
  const date = new Date();
  const year = String(date.getFullYear());
  const month = String(date.getMonth());

  let result = "";
  switch (format) {
    case "YYYYMMDDhhmmss":
      break;
    case "YYYYMMDDhhmmssmm":
      break;
    default: // YYYYMMDD
      result = year + month;
      break;
  }

  return result;
}

export function getUid() {
  return (
    getDate("YYYYMMDDhhmmssmm") + String(Math.round(Math.random() * 1000000))
  );
}
