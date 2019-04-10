module.exports = {
  // github pages で公開するための設定
  publicPath: './',
  outputDir: 'docs',

  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/sass/style.scss";`
      }
    }
  },
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined
}
