export const toNumber = (value: unknown): number => {
  const numberValue = Number(value);

  return isNaN(numberValue) ? 0 : numberValue;
};
