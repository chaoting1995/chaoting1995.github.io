export type Status = {
  message: string;
  hasError: boolean;
};

export const STATUS_LOADED: Status = {
  message: "",
  hasError: false,
};

export const STATUS_LOADING: Status = {
  message: "",
  hasError: false,
};

export const STATUS_ERROR: Status = {
  message: "",
  hasError: true,
};

export type ResultWithStatus<T> = {
  data: T;
  status: Status;
};

export const getResultWithStatus = <T>(defaultResult: T): ResultWithStatus<T>  => {
  return {
    data: defaultResult,
    status: STATUS_LOADED
  }
};

