const fs = require('fs-extra');
const path = require('path');
const chalk = require('react-dev-utils/chalk');
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
const deleteDistFolder = () => {
  fs.rmdirSync(paths.appBuild, { recursive: true });
}
const copyPublicFolder = () => {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
}
const build = () => {
  console.log('Creating an optimized production build...');
  console.time('Build done in');
  deleteDistFolder();
  copyPublicFolder();
  compiler.run((err, stats) => {
    if (err) console.log(chalk.yello(err));
    console.timeEnd('Build done in');  
    console.log(chalk.green('Compiled successfully.\n'));
  }); 
}

build();








