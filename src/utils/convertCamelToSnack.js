export const convertCamelToSnack = (obj) => {
  if (typeof obj !== "object") return obj;

  for (const oldName in obj) {
    const newName = oldName.replace(/([A-Z])/g, function ($1) {
      return "_" + $1.toLowerCase();
    });
    if (newName !== oldName) {
      if (Object.prototype.hasOwnProperty.call(obj, oldName)) {
        obj[newName] = obj[oldName];
        delete obj[oldName];
      }
    }
    if (typeof obj[newName] === "object") {
      obj[newName] = convertCamelToSnack(obj[newName]);
    }
  }
  return obj;
};
