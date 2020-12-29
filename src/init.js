/**
 * subreddit-cli
 *
 * Peruse Reddit from your terminal
 *
 * @module src/init
 */
const welcome = require('cli-welcome');

const pkgJson = require('../package.json');

const init = clear => {
  welcome({
    title: 'Subreddit CLI',
    tagLine: 'Hi there! 👋',
    description: pkgJson.description,
    version: pkgJson.version,
    bgColor: '#DAE0E6',
    color: '#000000',
    bold: true,
    clear,
  });
};

module.exports = { init };