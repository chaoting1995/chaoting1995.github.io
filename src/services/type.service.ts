const isArray = <T>(input: unknown): input is Array<T> => {
  return Array.isArray(input);
};

const isBoolean = (input: unknown): input is boolean => {
  return typeof input === "boolean" ? true : false;
};

const isNumber = (input: unknown): input is number => {
  return typeof input === "number" ? true : false;
};

const isString = (input: unknown): input is string => {
  return typeof input === "string" ? true : false;
};

export const ServiceType = {
  isArray,
  isBoolean,
  isNumber,
  isString
};
