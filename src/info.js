/**
 * subreddit-cli
 *
 * Peruse Reddit from your terminal
 *
 * @module src/info
 */
const meow = require('meow');
const chalk = require('chalk');

const { green, yellow, cyan } = chalk;

const flags = {
  truncate: {
    type: 'boolean',
    default: false,
    alias: 't',
    desc: 'Truncates post titles',
  },
  'no-truncate': {
    type: 'boolean',
    default: true,
    desc: 'Show full title lengths'
  },
  clear: {
    type: 'boolean',
    default: true,
    desc: 'Clears console',
  },
  version: {
    type: 'boolean',
    alias: 'v',
    default: false,
    desc: 'Prints cli version',
  },
};

const helpText = `
  Usage
    ${green('subreddits')} ${cyan('<list_of_subreddits>')} ${yellow('[--option]')}

  Options
    ${yellow('-t')}, ${yellow('--truncate')}    Truncate post titles
    ${yellow('-v')}, ${yellow('--version')}     Display CLI version

  Examples
    ${green('subreddits')} ${cyan('javascript')} ${cyan('python')}
    ${green('subreddits')} ${cyan('elixir')} ${yellow('--truncate')}
    ${green('subreddits')} ${cyan('python')} ${cyan('elixir')} ${yellow('--no-clear')}
    ${green('subreddits')} ${cyan('ruby')} ${yellow('-t')} ${yellow('--no-clear')}
`;

const options = Object.freeze({
  inferType: true,
  hardRejection: false,
  flags,
});

module.exports = meow(helpText, options);
