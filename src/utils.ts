export const isNumericString = (value: string): boolean => {
  return /^\d+$/.test(value);
};
