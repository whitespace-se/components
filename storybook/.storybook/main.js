const path = require("path");

const sourceDir = path.resolve(
  require.resolve("@whitespace/components/src"),
  "..",
);

module.exports = {
  stories: [sourceDir + "/**/*.stories.mdx"],
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
  webpackFinal: async (config, { configType }) => {
    config.module.rules[0].include.push(/@whitespace\/components\/src/);
    config.module.rules[0].exclude = [
      /node_modules\/(?!@whitespace\/components\/src)/,
    ];
    return config;
  },
};
