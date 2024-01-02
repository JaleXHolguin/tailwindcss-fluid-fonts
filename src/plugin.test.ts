import { describe, expect, it } from "vitest";
import { format, getPluginCss } from "./plugin.utils";
import type { FluidFontOptions } from "./types";

describe("fluidFonts", () => {
  const html = String.raw;

  it("should generate utility classes with responsive font size using array config (only min and max values)", async () => {
    const options: FluidFontOptions = {
      fontSizes: {
        "4xl": ["27px", "36px"],
      },
      viewport: {
        min: "375px",
        max: "1536px",
      },
      unit: "rem", //Default
    };

    const expected = `
      .text-4xl {
        font-size: clamp(
          1.6875rem,
          calc(1.6875rem + (2.25 - 1.6875) * ((100vw - 23.4375rem) / (96 - 23.4375))),
          2.25rem
        );
      }
    `;

    // Generate CSS using the utility and areas provided with media queries
    const css = await getPluginCss(
      {
        content: [
          {
            raw: html`<h1 class="text-4xl">Title</h1>`,
          },
        ],
      },
      options,
    );

    expect(css).toBe(await format(expected));
  });

  it("should generate utility classes with responsive font size and lineHeight using array config (min, max and linheight values)", async () => {
    const options: FluidFontOptions = {
      fontSizes: {
        "4xl": ["27px", "36px", "1.6"],
      },
      viewport: {
        min: "375px",
        max: "1536px",
      },
    };

    const expected = `
      .text-4xl {
        font-size: clamp(
          1.6875rem,
          calc(1.6875rem + (2.25 - 1.6875) * ((100vw - 23.4375rem) / (96 - 23.4375))),
          2.25rem
        );
        line-height: 1.6;
      }
    `;

    // Generate CSS using the utility and areas provided with media queries
    const css = await getPluginCss(
      {
        content: [
          {
            raw: html`<h1 class="text-4xl">Title</h1>`,
          },
        ],
      },
      options,
    );

    expect(css).toBe(await format(expected));
  });

  it("should generate utility classes with responsive font size and additional styles using object config", async () => {
    const options: FluidFontOptions = {
      fontSizes: {
        "3xl": {
          min: "24px",
          max: "33px",
          lineHeight: "1.6",
          letterSpacing: "1px",
          fontWeight: "medium",
        },
        "4xl": ["27px", "36px", "1.6"],
      },
      viewport: {
        min: "375px",
        max: "1536px",
      },
    };

    const expected = `
      .text-3xl {
        font-size: clamp(
          1.5rem,
          calc(1.5rem + (2.0625 - 1.5) * ((100vw - 23.4375rem) / (96 - 23.4375))),
          2.0625rem
        );
        line-height: 1.6;
        letter-spacing: 1px;
        font-weight: medium;
      }
      .text-4xl {
        font-size: clamp(
          1.6875rem,
          calc(1.6875rem + (2.25 - 1.6875) * ((100vw - 23.4375rem) / (96 - 23.4375))),
          2.25rem
        );
        line-height: 1.6;
      }
    `;

    // Generate CSS using the utility and areas provided with media queries
    const css = await getPluginCss(
      {
        content: [
          {
            raw: html`<div>
              <h1 class="text-4xl">Title</h1>
              <h2 class="text-3xl">Secondary Title</h2>
            </div>`,
          },
        ],
      },
      options,
    );

    expect(css).toBe(await format(expected));
  });
});
