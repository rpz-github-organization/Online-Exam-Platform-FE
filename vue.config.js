
module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://121.36.18.182:10086',
        changeOrigin: true,
      },
    },
  },
};
