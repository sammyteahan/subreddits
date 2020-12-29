/**
 * subreddit-cli
 *
 * Peruse Reddit from your terminal
 *
 * @module src/subreddit
 */
const axios = require('axios');
const Task = require('data.task');

// baseUrl :: String
const baseUrl = 'https://reddit.com/r/';

// buildUrl :: String -> String
const buildUrl = subreddit => `${baseUrl}${subreddit}.json`;

// get :: String -> Task(Error, Object)
const get = url =>
  new Task((reject, resolve) =>
    axios.get(url)
      .then(response => resolve(response))
      .catch(error => reject(error)))

// getsubreddit :: String -> Task(Error, Object)
const getsubreddit = subreddit =>
  get(buildUrl(subreddit))
  .map(response => response.data.data)
  .map(response => ({ title: subreddit, children: response.children }))

module.exports = { getsubreddit, buildUrl };
