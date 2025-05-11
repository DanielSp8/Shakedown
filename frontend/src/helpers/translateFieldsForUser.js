export function translateFieldsForUser(fieldName) {
  switch (fieldName) {
    case "backpackName":
      return "Backpack Name";
    case "location":
      return "Location";
    case "privateValue":
      return "Keep Private?";
    case "itemName":
      return "Name of Item";
    case "category":
      return "Category";
    case "description":
      return "Description";
    case "weightLbs":
      return "Weight (in lbs)";
    case "weightOz":
      return "Weight (in oz)";
    case "price":
      return "Price";
    default:
      return null;
  }
}
