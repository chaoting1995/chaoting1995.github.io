import { DEFAULT_ADDRESS } from "blockchains/constants/default";
import ServiceFormat from "services/format.service";

export const convertMetricNotationToString = (metricNotationNumberToString: string): string => {
  // Metric Notation, example: 12e+2
  let metricNotationNumber: number = ServiceFormat.toNumber(metricNotationNumberToString);
  if (Math.abs(metricNotationNumber) < 1.0) {
    let e = parseInt(metricNotationNumber.toString().split("e-")[1]);
    if (e) {
      metricNotationNumber *= Math.pow(10, e - 1);
      metricNotationNumberToString = "0." + new Array(e).join("0") + metricNotationNumber.toString().substring(2);
    }
  } else {
    let e = parseInt(metricNotationNumber.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      metricNotationNumber /= Math.pow(10, e);
      metricNotationNumberToString += new Array(e + 1).join("0");
    }
  }
  return metricNotationNumberToString;
};

// export const convertUnixTimestampToFormatTime = (UNIX_timestamp) => {
//   var a = new Date(UNIX_timestamp * 1000);
//   var months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
//   var year = a.getFullYear();
//   var month = months[a.getMonth()];
//   var date = a.getDate();
//   var hour = a.getHours();
//   var min = a.getMinutes();

//   var time = year + "-" + month + "-" + date + " " + hour + ":" + min;
//   return time;
// };

export const truncateAddress = (address: any): string => {
  if (!address) return "";
  if (typeof address !== "string") return "";

  const start = address.substring(0, 4);
  const end = address.substring(address.length - 5, address.length);

  return start + "..." + end;
};

// export const asyncStatusHandler = (asyncStatus) => {
//   return asyncStatus.hasError ? (
//     <span style={{ color: "red" }}>{asyncStatus.error}</span>
//   ) : asyncStatus.loading ? (
//     "loading..."
//   ) : (
//     "loaded"
//   );
// };

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

const isAddressNotEmpty = (address: string | undefined) => address !== undefined && address !== "" && address !== DEFAULT_ADDRESS;

const ServiceUtil = {
  // networkConvert,
  convertMetricNotationToString,
  // convertUnixTimestampToFormatTime,
  truncateAddress,
  // asyncStatusHandler,
  convertNumberInputOnChange,
  roundDownDecimals,
  isAddressNotEmpty
};

export default ServiceUtil;