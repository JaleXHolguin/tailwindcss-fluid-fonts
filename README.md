<div align="center">
 <h1>TailwindCSS Fluid Fonts</h1>
</div>

<div align="center">
  <a href="https://github.com/JaleXHolguin/tailwindcss-fluid-fonts/blob/main/LICENSE">
    <img alt="License" src="https://badgen.net/github/license/JaleXHolguin/tailwindcss-fluid-fonts" />
  </a>
  <br />
  <br />
</div>

The TailwindCSS Fluid Fonts plugin offers a solution for managing fluid font sizes in your project. With an easy-to-use setup, this plugin perfectly suits your responsive design needs.

- [Install](#install)
- [Add plugin config](#add-plugin-config)
  - [Viewport _(Required)_](#viewport-required)
  - [Font Sizes _(Required)_](#font-sizes-required)
  - [Unit _(Optional: Default: "rem")_](#unit-optional-default-rem)

## Install

Install tailwindcss-fluid-fonts with the npm package manager:

```shell
npm i -D tailwindcss-fluid-fonts
```

Import and add the plugin in your [Tailwind Config](https://tailwindcss.com/docs/configuration#plugins):

```ts
import type { Config } from "tailwindcss";
import fluidFonts from "tailwindcss-fluid-fonts";

const config: Config = {
  plugins: [
    fluidFonts({
      viewport: {
        min: "375px",
        max: "1536px",
      },
    }),
  ],
};
export default config;
```

## Add plugin config

### Viewport _(Required)_

Represents a range of sizes that includes min and max size of viewport.

```ts
const config: Config = {
  plugins: [
    fluidFonts({
      viewport: {
        min: "375px",
        max: "1536px",
      },
    }),
  ],
};
```

### Font Sizes _(Required)_

Add a name for the font size, and as a value, you can add an array with the following structure `[minFontSize, maxFontsize, lineHeight]`. The third value **lineHeight** is optional:

**_Example:_**

```ts
const config: Config = {
  plugins: [
    fluidFonts({
      fontSizes: {
        // Without lineHeight
        "3xl": ["24px", "33px"],
        // With lineHeight
        "4xl": ["27px", "36px", "1.6"],
      },
    }),
  ],
};
```

When using the classes **text-3xl** or **text-4xl**, they will apply the following CSS:

```css
/** 3xl does not add lineHeight*/
.text-3xl {
  font-size: clamp(... /* Fluid size calc */);
}

/** 4xl adds lineHeight*/
.text-4xl {
  font-size: clamp(... /* Fluid size calc */);
  line-height: 1.6;
}
```

Or instead of using the array type `[minFontSize, maxFontsize, lineHeight]`, you can use an object with the following options:

- **min**: minimum font size with its respective unit **_px_** or **_rem_**.
- **max**: maximum font size with its respective unit **_px_** or **_rem_**.
- **lineHeight** **_(Optional)_**:additional option for line height.
- **letterSpacing** **_(Optional)_**: additional option for letter spacing.
- **fontWeight** **_(Optional)_**: additional option to define font weight.

**_Example:_**

```ts
const config: Config = {
  plugins: [
    fluidFonts({
      fontSizes: {
        "3xl": {
          min: "24px",
          max: "33px",
          lineHeight: "1.6",
          letterSpacing: "1px",
          fontWeight: "medium",
        },
        "4xl": {
          min: "27px",
          max: "36px",
          lineHeight: "1.6",
        },
      },
    }),
  ],
};
```

When using the classes text-3xl or text-4xl, they will apply the following CSS:

```css
/** 3xl calculates font size using min and max values and adds the defined extra properties: lineHeight, letterSpacing, and fontWeight */
.text-3xl {
  font-size: clamp(... /* Fluid size calc */);
  line-height: 1.6;
  letter-spacing: 1px;
  font-weight: medium;
}

/** 4xl calculates font size using min and max values and adds the defined extra property: lineHeight */
.text-4xl {
  font-size: clamp(... /* Fluid size calc */);
  line-height: 1.6;
}
```

### Unit _(Optional: Default: "rem")_

Unit used as output for font sizes can be **_px_** or **_rem_**:

**_Example:_**

If font size values **(min and max)** are defined in **_px_** and **unit** is defined in **_rem_**, the value of the `font-size` property in the CSS will be defined using **_rem_**;

```ts
const config: Config = {
  plugins: [
    fluidFonts({
      fontSizes: {
        "4xl": ["27px", "36px"],
      },
      viewport: {
        min: "375px",
        max: "1536px",
      },
      unit: "rem", //Default
    }),
  ],
};
```

Output if the unit is **rem**:

```css
.text-4xl {
  font-size: clamp(
    1.6875rem,
    calc(1.6875rem + (2.25 - 1.6875) * ((100vw - 23.4375rem) / (96 - 23.4375))),
    2.25rem
  );
}
```

Output if the unit is **px**:

```css
.text-4xl {
  /** The calc base value MUST be stated in REM to maintain accessibility */
  font-size: clamp(27px, calc(1.6875rem + (36 - 27) * ((100vw - 375px) / (1536 - 375))), 36px);
}
```

If font size values **(min and max)** are defined in **_rem_** and **unit** is defined in **_px_**, the value of the `font-size` property in the CSS will be defined using **_px_**;
