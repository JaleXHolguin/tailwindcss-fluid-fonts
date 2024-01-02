import { describe, expect, it } from "vitest";
import { normalizeUnit } from "./normalize-unit";

describe("normalizeUnit", () => {
  it("should return the same value if the unit is already in pixels", () => {
    const result = normalizeUnit("15px", "px");
    expect(result).toBe(15);
  });

  it("should convert pixels to rem when the unit parameter is rem", () => {
    const result = normalizeUnit("15px", "rem");
    expect(result).toBe(0.9375);
  });

  it("should return the same value if the unit is already in rem", () => {
    const result = normalizeUnit("1rem", "rem");
    expect(result).toBe(1);
  });

  it("should convert rem to pixels when the unit parameter is px", () => {
    const result = normalizeUnit("1rem", "px");
    expect(result).toBe(16);
  });

  it("should handle a decimal value in pixels and convert to rem with precision", () => {
    const result = normalizeUnit("12.5px", "rem");
    expect(result).toBe(0.78125);
  });

  it("should handle a decimal value in rem and convert to pixels with precision", () => {
    const result = normalizeUnit("2.5rem", "px");
    expect(result).toBe(40);
  });

  it("should handle zero value in pixels and return '0rem'", () => {
    const result = normalizeUnit("0px", "rem");
    expect(result).toBe(0);
  });

  it("should handle zero value in rem and return '0px'", () => {
    const result = normalizeUnit("0rem", "px");
    expect(result).toBe(0);
  });

  it("should handle negative value in pixels and convert to rem with precision", () => {
    const result = normalizeUnit("-24px", "rem");
    expect(result).toBe(-1.5);
  });

  it("should handle negative value in rem and convert to pixels with precision", () => {
    const result = normalizeUnit("-1.5rem", "px");
    expect(result).toBe(-24);
  });
});
