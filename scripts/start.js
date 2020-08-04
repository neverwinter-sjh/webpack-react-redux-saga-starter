// const fs = require('fs-extra');
// const path = require('path');
const chalk = require('react-dev-utils/chalk');
const webpack = require('webpack');
const packageJson = require('../package.json');
const WebpackDevServer = require('webpack-dev-server');
const clearConsole = require('react-dev-utils/clearConsole');
const devConfig = require('../webpack.dev.js');
const paths = require('./paths');
// const openBrowser = require('react-dev-utils/openBrowser');
const { prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');
const compiler = webpack(devConfig);
const port = 3000;
const HOST = process.env.HOST || '0.0.0.0';
const devServerConfig = {
  host: 'localhost',
  port: port,
  open: false,
  hot: true,
  historyApiFallback: true,
  noInfo: true,
  stats: {
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    modules: false
  }
}
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const urls = prepareUrls(
  protocol,
  HOST,
  port,
  paths.publicUrlOrPath.slice(0, -1)
);
const devServer = new WebpackDevServer(compiler, devServerConfig);
const hasYarn = require('has-yarn');
const buildMethod = hasYarn('../') ? 'yarn build' : 'npm run build';

devServer.listen(port, HOST, err => {
  if (err) {
    return console.log(err);
  }  
  clearConsole();
  console.log(chalk.cyan('Starting the development server...\n'));    
  // openBrowser(urls.localUrlForBrowser);
});

compiler.plugin('done', function() {
  clearConsole();
  console.log(`
${chalk.green('Compiled successfully!')}

You can now view ${packageJson.name} in the browser.

Local:            ${urls.localUrlForBrowser}
On Your Network:  ${urls.lanUrlForConfig}:${port}

Note that the development build is not optimized.
To create a production build, use ${chalk.blue(buildMethod)}.
  `);
  
});

// "dev": "cross-env webpack-dev-server --config webpack.dev.js",







