const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  // 빌드 환경
  mode: 'production',
  
  // 모듈 설정
  module: {
    rules: [
      // css, sass 파일 로더
      {
        test: /\.(css|sass|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
    ]
  },
  plugins: [
  ]
});