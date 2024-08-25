const convertNumberInputOnChange = (input: string): string => {
  // remove excess 0 before integer, decimal
  input = input.replace(/0*([1-9]\d*|0\.\d+)/, "$1");
  // specify input 18 decimal places
  input = input.replace(/^\D*(\d*(?:\.\d{0,18})?).*$/g, "$1");
  return input;
};

const roundDownDecimals = (number: number, digits: number) => {
  const multiplier = 10 ** digits;
  return Math.floor(number * multiplier) / multiplier;
};

const ServiceUtil = {
  convertNumberInputOnChange,
  roundDownDecimals,
};

export default ServiceUtil;