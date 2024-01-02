import { SizeValue, Unit } from "./types";

export const normalizeUnit = (value: SizeValue, targetUnit: Unit): number => {
  const numericValue = parseFloat(value);

  if (value.includes("px") && targetUnit === "rem") {
    return numericValue / 16;
  } else if (value.includes("rem") && targetUnit === "px") {
    return numericValue * 16;
  }

  // If it is already in the desired unit or if it is not "px" or "rem", simply return the original value.
  return numericValue;
};
