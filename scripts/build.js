const fs = require('fs-extra');
const path = require('path');
const webpack = require('webpack');
const prodConfig = require('../webpack.prod.js');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const paths = {
  appBuild: resolveApp('dist'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html')
}
const compiler = webpack(prodConfig);

function deleteDistFolder() {
  fs.rmdirSync(paths.appBuild, { recursive: true });
}

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
}

deleteDistFolder();
copyPublicFolder();
compiler.run();


