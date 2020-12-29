#!/usr/bin/env node

/**
 * subreddit-cli
 *
 * Peruse Reddit from your terminal
 *
 * @module index
 */
const Task = require('data.task');
const { List } = require('immutable-ext');

const info = require('./src/info');
const { init } = require('./src/init');
const { getsubreddit } = require('./src/subreddit');
const { printSubreddit, startSpinner, stopSpinner } = require('./src/io');

const { input, flags } = info;

(() => {
  init(flags.clear);
  input.includes('help') && info.showHelp(0);

  if (!input || input.length === 0) info.showHelp(0);

  List.of(...input)
    .map(startSpinner)
    .traverse(Task.of, getsubreddit)
    .map(stopSpinner)
    .fork(console.error, xs => xs.map(printSubreddit(flags)));
})();