const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require(require.resolve("html-webpack-plugin", {
  paths: [process.cwd()],
}));
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "bizfly";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
      new Dotenv({
        path: `.env.${process.env.APP_ENV}`,
        defaults: true,
      }),
    ],
    externals: [
      "vue",
      "bizfly-ui",
      "single-spa",
      "single-spa-vue",
      "vue-router",
      "vuex",
      "axios",
      "js-cookie",
      "vue-i18n",
      "dayjs",
      "ravenjs",
      "vue-raven",
      /^@bizfly\/.+$/,
    ],
  });
};
