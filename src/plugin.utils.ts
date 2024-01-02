import merge from "lodash.merge";
import postcss from "postcss";
import prettier from "prettier";
import tailwindcss, { type Config } from "tailwindcss";

import { fluidFonts } from "./plugin";
import type { FluidFontOptions } from "./types";

export const format = (input: string) => {
  return prettier.format(input, {
    parser: "css",
    printWidth: 100,
  });
};

export const getPluginCss = async (config: Config, pluginOptions: FluidFontOptions) => {
  const tailwindConfig = merge(config, {
    plugins: [fluidFonts(pluginOptions)],
  });

  const { css } = await postcss(tailwindcss(tailwindConfig)).process("@tailwind utilities;", {
    from: undefined,
  });

  return format(css);
};
