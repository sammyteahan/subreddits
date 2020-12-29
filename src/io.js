/**
 * subreddit-cli
 *
 * Peruse Reddit from your terminal
 *
 * @module src/io
 */
const ora = require('ora');
const chalk = require('chalk');

const { Identity } = require('./helpers');
const { TRUNCATE_LENGTH } = require('./constants');

// styledTitle :: String
const styledTitle = chalk.hex('#FF4602').bold.inverse;

// baseUrl :: String
const baseUrl = 'https://reddit.com/r/';

// buildUrl :: String -> String
const buildUrl = subreddit => `${baseUrl}${subreddit}`;

// printTitle :: String -> Void
const printTitle = (title) => `
${console.log(`${styledTitle(` ${title} `)} ${chalk.dim(`- ${buildUrl(title)}`)}`)}
${console.log()}
`;

// printLinks :: [Object] -> Object-> Void
const printLinks = children => flags => `
${children.map(link => printLink(link)(flags))}
${console.log()}
`;

// isLongTitle :: String -> Boolean
const isLongTitle = title => title.length >= TRUNCATE_LENGTH;

// truncateTitle :: Object -> String -> String
const truncateTitle = flags => title => {
  if (flags.truncate && isLongTitle(title)) {
    return `${title.slice(0, TRUNCATE_LENGTH)}...`;
  }

  return title;
};

// printLink :: Object -> Object -> Void
const printLink = link => flags =>
  Identity(link)
  .map(link => link.data.title)
  .map(truncateTitle(flags))
  .fold(console.log);

// printSubreddit :: Object -> Object -> Void
const printSubreddit = flags => response => {
  printTitle(response.title);
  printLinks(response.children)(flags);
};

/**
 * @NOTE these ora utilities house some state for now unfortunately.
 * we pass in `a` to preserve composition in the rest of our application
 */
const spinner = ora({ text: '' });
const startSpinner = a => { spinner.start(); return a; };
const stopSpinner = a => { spinner.stop(); return a; };

module.exports = {
  printSubreddit,
  startSpinner,
  stopSpinner,
};
