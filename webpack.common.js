const HtmlWebpackPlugin = require('html-webpack-plugin');
const port = process.env.PORT || 3000;

module.exports = {
  // 앱 시작 js 파일
  entry: './src/index.js',

  // 번들링 결과 파일 설정
  output: {
    filename: 'bundle.[hash].js'
  },

  // 모듈 설정
  module: {
    rules: [
      { // pre 설정으로 eslint부터 로드하도록 설정
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      { // js, jsx 파일을 babel-loader로 해석하여 트랜스파일링한다.
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      { // html 파일을 읽을 수 있다.
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },

      // 파일 로더(주로 폰트 파일)
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader'
      },

      // 이미지 로더
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]',
          esModule: false
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader'
      }
    ],
  },
  plugins: [
    // 템플레이트를 사용할 수 있도록 설정
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    })
  ]
}