import BigNumber from 'bignumber.js';

export const multiplyToInteger = (a: BigNumber.Value, b: BigNumber.Value): bigint => {
  return BigInt(new BigNumber(a).multipliedBy(b).toFixed(0, BigNumber.ROUND_CEIL));
};

export const multiplyToFixed = (a: BigNumber.Value, b: BigNumber.Value, decimals = 8): string => {
  return new BigNumber(a).multipliedBy(b).toFixed(decimals, BigNumber.ROUND_CEIL);
};

export const divideToFixed = (a: BigNumber.Value, b: BigNumber.Value, decimals = 8): string => {
  return new BigNumber(a).dividedBy(b).toFixed(decimals, BigNumber.ROUND_CEIL);
};

export const toPreciseNumber = (value: BigNumber.Value, decimals: BigNumber.Value): number => {
  return new BigNumber(new BigNumber(value).toFixed(new BigNumber(decimals).toNumber())).toNumber();
};

export const toIntegerNumber = (value: BigNumber.Value): number => toPreciseNumber(value, 0);

export const toUnitInteger = (value: BigNumber.Value, decimals: number): bigint => {
  return BigInt(new BigNumber(value).multipliedBy(new BigNumber(10).pow(decimals)).integerValue().toString());
};

export const fromUnitInteger = (value: BigNumber.Value, decimals: number): number => {
  return new BigNumber(value).dividedBy(new BigNumber(10).pow(decimals)).toNumber();
};
