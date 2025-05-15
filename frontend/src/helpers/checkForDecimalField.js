export function checkForDecimalField(fieldName) {
  switch (fieldName) {
    case "weightLbs":
    case "weightOz":
    case "price":
      return true;
    default:
      return false;
  }
}
