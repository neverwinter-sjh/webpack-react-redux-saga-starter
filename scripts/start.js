// const fs = require('fs-extra');
// const path = require('path');
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

require('./env');

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

const fs = require('fs');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const redirectServedPath = require('react-dev-utils/redirectServedPathMiddleware');
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
  },
  before(app, server) {
    // Keep `evalSourceMapMiddleware` and `errorOverlayMiddleware`
    // middlewares before `redirectServedPath` otherwise will not have any effect
    // This lets us fetch source contents from webpack for the error overlay
    app.use(evalSourceMapMiddleware(server));
    // This lets us open files from the runtime error overlay.
    app.use(errorOverlayMiddleware());

    if (fs.existsSync(paths.proxySetup)) {
      // This registers user provided middleware for proxy reasons
      require(paths.proxySetup)(app);
    }
  },
  after(app) {
    // Redirect to `PUBLIC_URL` or `homepage` from `package.json` if url not match
    app.use(redirectServedPath(paths.publicUrlOrPath));

    // This service worker file is effectively a 'no-op' that will reset any
    // previous service worker registered for the same host:port combination.
    // We do this in development to avoid hitting the production cache if
    // it used the same host and port.
    // https://github.com/facebook/create-react-app/issues/2272#issuecomment-302832432
    app.use(noopServiceWorkerMiddleware(paths.publicUrlOrPath));
  },
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







