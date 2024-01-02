export type SizeRange = {
  min: SizeValue;
  max: SizeValue;
};

type PixelSize = `${number}px`;

type RemSize = `${number}rem`;

export type Unit = "px" | "rem";
export type SizeValue = PixelSize | RemSize;
export type FontSizeConfig = [min: SizeValue, max: SizeValue, lineHeigth?: string] | FontSizeObject;

export type FontSizeObject = SizeRange &
  Partial<{
    lineHeight: string;
    letterSpacing: string;
    fontWeight: string | number;
  }>;

export type FluidFontOptions = {
  /**
   * Represents a range of sizes that includes min and max size of viewport.
   */
  viewport: SizeRange;

  /**
   * Can be an array representing a range of font sizes with option for line-height or an object with additional options.
   * @example
   * fluidFonts({
   *   viewport: { min: "320px", max: "1200px" },
   *   fontSizes: {
   *     // Using min and max values.
   *     base: ["16px", "22px"],
   *
   *     // Using min, max and lineHeight values.
   *     medium: ["18px", "24px", "1.5"],
   *
   *     // Using object config.
   *     large: {
   *       min: "24px",
   *       max: "32px",
   *       lineHeight: "1.6",
   *       fontWeight: "bold",
   *     },
   *   },
   *   unit: "rem",
   * });
   */
  fontSizes: Record<string, FontSizeConfig>;

  /**
   * Unit of measurement for font sizes
   * @default "rem"
   */
  unit?: Unit;
};
