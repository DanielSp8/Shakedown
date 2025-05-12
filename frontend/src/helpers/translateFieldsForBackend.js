export function translateFieldsForBackend(fieldName) {
  switch (fieldName) {
    case "Item Name":
    case "itemName":
      return "item_name";
    case "category":
    case "Category":
      return "category";
    case "description":
    case "Description":
      return "description";
    case "weightLbs":
    case "WeightLbs":
      return "weight_lbs";
    case "weightOz":
    case "WeightOz":
      return "weight_oz";
    case "privateValue":
      return "private_value";
    case "price":
    case "Price":
      return "price";
    default:
      return null;
  }
}
