module.exports = function (webpackEnv) {
   return {
      module: {
         rules: [
            {
               type: 'javascript/auto',
               test: /\.mjs$/,
               use: []
            },
         ]
      }
   }
};