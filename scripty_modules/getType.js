function getType(obj) {
  switch (typeof obj) {
    case "boolean":
      return "Bool";
    case "string":
      return "String";
    case "object":
      return "Object";
    default:
      return obj.GetType().Name;
  }
};

module.exports = getType;