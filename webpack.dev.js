const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  // 개발환경
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    './src/index.js',
  ],

  // 모듈 설정
  module: {
    rules: [
      // css, sass 파일 로더
      {
        test: /\.(css|sass|scss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
    ]
  },
  plugins: [
    // css 추출
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
  ],

  // 개발용 서버 설정
  // devServer: {
  //   host: 'localhost',
  //   port: port,
  //   open: false,
  //   hot: true,
  //   historyApiFallback: true,
  //   noInfo: true,
  //   stats: {
  //     cached: false,
  //     cachedAssets: false,
  //     chunks: false,
  //     chunkModules: false,
  //     chunkOrigins: false,
  //     modules: false
  //   }
  // },

  devtool: 'inline-source-map'  
});