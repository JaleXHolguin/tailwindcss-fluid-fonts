import plugin from "tailwindcss/plugin";
import type { ThemeConfig } from "tailwindcss/types/config";
import type { FluidFontOptions, FontSizeConfig, SizeRange } from "./types";
import { normalizeUnit } from "./normalize-unit";

const defaultViewportRange: SizeRange = {
  min: "375px",
  max: "1440px",
};

export const fluidFonts = plugin.withOptions(
  (_: FluidFontOptions) => () => {},
  ({ fontSizes, viewport, unit = "rem" }) => {
    const fontSize: ThemeConfig["fontSize"] = {};

    const resolveFluidFont = (fontSizeConfig: FontSizeConfig) => {
      const { min, max } = Array.isArray(fontSizeConfig)
        ? { min: fontSizeConfig[0], max: fontSizeConfig[1] }
        : fontSizeConfig;
      const { min: minVw, max: maxVw } = viewport || defaultViewportRange;

      const minFontSize = normalizeUnit(min, unit);
      const maxFontSize = normalizeUnit(max, unit);
      const minViewport = normalizeUnit(minVw, unit);
      const maxViewport = normalizeUnit(maxVw, unit);

      /** The calc base value MUST be stated in REM to maintain accessibility  */
      const baseValue = normalizeUnit(min, "rem");

      return `clamp(${minFontSize}${unit}, calc(${baseValue}rem + (${maxFontSize} - ${minFontSize}) * ((100vw - ${minViewport}${unit}) / (${maxViewport} - ${minViewport}))), ${maxFontSize}${unit})`;
    };

    for (const size in fontSizes) {
      const config = fontSizes[size];

      if (
        !config ||
        (typeof config === "object" && config !== null && Object.keys(config).length === 0) ||
        (Array.isArray(config) && config.length < 2)
      ) {
        // There is no configuration or no elements in the configuration object or array, it moves to the next element in the loop.
        continue;
      }

      const clamp = resolveFluidFont(config);

      if (Array.isArray(config)) {
        const [, , lineHeight] = config;
        fontSize[size] = lineHeight ? [clamp, lineHeight] : clamp;
      } else {
        fontSize[size] = [clamp, { ...config }];
      }
    }

    return {
      theme: {
        extend: { fontSize },
      },
    };
  },
);
