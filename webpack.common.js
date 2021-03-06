const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  // 앱 시작 js 파일
  entry: './src/index.js',

  // 번들링 결과 파일 설정
  output: {
    publicPath: '/',
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
      }
    ],
  },
  plugins: [
    // 템플레이트를 사용할 수 있도록 설정
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new Dotenv({      
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true, // hide any errors
      defaults: false // load '.env.defaults' as the default values if empty.
    })
  ],
  // alias 설정
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      containers: path.resolve(__dirname, 'src/containers'),
      modules: path.resolve(__dirname, 'src/modules'),
      routes: path.resolve(__dirname, 'src/routes'),
      assets: path.resolve(__dirname, 'src/assets')
    }
  }
}