import BigNumber from "bignumber.js";

export function shortenAddress(address, chars = 6) {
  return address
    ? `${address.substring(0, chars)}...${address.substring(
        address.length - chars
      )}`
    : "";
}

// 精度转化
export function nToBN(value, decimals = 18) {
  return new BigNumber(value).times(new BigNumber(10).pow(decimals)).toString();
}

// 精度转化
export function bNToN(value, decimals = 18) {
  return new BigNumber(value).div(new BigNumber(10).pow(decimals)).toString();
}
