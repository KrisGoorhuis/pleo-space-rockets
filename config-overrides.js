
// This file fixes an issue with CRA's webpack config and .mjs files not being imported properly
// via https://github.com/reactioncommerce/reaction-component-library/issues/399#issuecomment-467860022
module.exports = function override(webpackConfig) {
   webpackConfig.module.rules.push({
     test: /\.mjs$/,
     include: /node_modules/,
     type: "javascript/auto"
   });
 
   return webpackConfig;
 }