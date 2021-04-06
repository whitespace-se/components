module.exports = {
  stories: ["../../pkg/src/**/*.stories.mdx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          postcssOptions: {
            plugins: [
              require("postcss-preset-env")({
                preserve: true,
                stage: 0,
              }),
            ],
          },
        },
      },
    },
    "@whitespace/storybook-addon-html",
    "storybook-css-modules-preset",
  ],
};
