const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const port = process.env.PORT || 3000;

module.exports = merge(common, {
  // 개발환경
  mode: 'development',

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
  devServer: {
    host: 'localhost',
    port: port,
    open: false,
    hot: true
  }
});