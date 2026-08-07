
export const isEmail = (value) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof value === "string" && regex.test(value);
};

export const required = (value, fieldName = "Campo") => {
  if (value === undefined || value === null || value === "") {
    return `${fieldName} é obrigatório`;
  }
  return null;
};

export const isLength = (value, min = 0, max = Infinity) => {
  if (typeof value !== "string") return false;
  return value.length >= min && value.length <= max;
};
