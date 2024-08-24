const toString = (input: unknown, defaultValue?: string): string => {
  if (input === 0) {
    return '0';
  }

  return input ? input.toString() : defaultValue ? defaultValue : '';
};

const toIntegerNumber = (input: unknown, defaultValue?: number, radix?: number): number => {
  radix = radix ? radix : 10;
  input = parseInt(String(input), radix);

  if (isNaN(Number(input))) {
    return defaultValue ? defaultValue : 0;
  } else {
    return Number(input);
  }
};

const toNumber = (input: unknown, defaultValue?: number): number => {
  if (typeof input !== 'number') {
    input = Number(input);
  }

  if (isNaN(Number(input))) {
    return defaultValue ? defaultValue : 0;
  } else {
    return input;
  }
};

const toBoolean = (input: unknown, defaultValue?: boolean): boolean => {
  if (typeof input === 'string') {
    if (input === 'true') {
      input = true;
    } else if (input === 'false') {
      input = false;
    }
  }
  if (input === null || input === undefined) {
    return defaultValue ? defaultValue : false;
  } else {
    return input ? true : false;
  }
};

const toUppercaseFirstLetter = (string: string): string => {
  return string.replace(/^./, string[0].toUpperCase());
};

const toRoundDown = (input: unknown, decimal: number) => {
  input = Number(input);
  if (isNaN(Number(input))) input = 0;
  return Math.floor((Number(input) + Number.EPSILON) * Math.pow(10, decimal)) / Math.pow(10, decimal);
};

const toArray = <T>(inputs: unknown): Array<T> => {
  let items: Array<T> = [];

  if (!Array.isArray(inputs)) {
    console.warn(`Inputs must be array`, { inputs }, 'ServiceFormat', 'toArray');
    return items;
  }
  
  items = inputs;

  return items;
};

const toObjectArray = <T>(inputs: T[], parser: (input: T) => T | undefined): Array<T> => {
  const items: Array<T> = [];

  if (!Array.isArray(inputs)) {
    console.warn(`Inputs must be array`, { inputs }, 'ServiceFormat', 'toObjectArray');
    return items;
  }

  if (inputs.length <= 0) {
    return items;
  }

  for (const input of inputs) {
    const value = parser(input);

    if (value) {
      items.push(value);
    }
  }

  return items;
};

const ServiceFormat = {
  toString,
  toIntegerNumber,
  toNumber,
  toBoolean,
  toUppercaseFirstLetter,
  toRoundDown,
  toArray,
  toObjectArray,
};

export default ServiceFormat;
