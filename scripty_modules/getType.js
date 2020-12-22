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

Object.defineProperty(getType, 'TYPES', {
  writable: false,
  value: [
    "Bool",
    "Handle",
    "HistoryScript",
    "Number",
    "Object",
    "Point",
    "Rectangle",
    "String"
  ]
});

module.exports = getType;