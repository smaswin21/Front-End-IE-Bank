const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: "source-map"
  },
  publicPath: './',
  outputDir: process.env.NODE_ENV === 'development' ? 'dist-dev' :
             process.env.NODE_ENV === 'uat' ? 'dist-uat' :
             'dist', // fallback to dist for production
})