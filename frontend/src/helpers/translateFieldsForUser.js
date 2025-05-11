export function translateFieldsForUser(fieldName) {
  switch (fieldName) {
    case "backpackName":
      return "Backpack Name";
    case "location":
      return "Location";
    case "privateValue":
      return "Keep Private?";
    case "item_name":
      return "Name of Item";
    case "category":
      return "Category";
    case "description":
      return "Description";
    case "weight_lbs":
      return "Weight (in lbs)";
    case "weight_oz":
      return "Weight (in oz)";
    case "price":
      return "Price";
    default:
      return null;
  }
}
