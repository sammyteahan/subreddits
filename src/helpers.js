/**
 * subreddit-cli
 *
 * Peruse Reddit from your terminal
 *
 * @module src/helpers
 */
const util = require('util');

/**
 * Identity
 */
const Identity = x => ({
  ap: b2 => b2.map(x),
  chain: f => f(x),
  map: f => Identity(f(x)),
  fold: f => f(x),
  [util.inspect.custom]: () => `Identity(${x})`,
});

/**
 * Either Right
 */
const Right = x => ({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  [util.inspect.custom]: () => `Right(${x})`,
});

/**
 * Either Left
 */
const Left = x => ({
  chain: f => Left(x),
  map: f => Left(x),
  fold: (f, g) => f(x),
  [util.inspect.custom]: () => `Left(${x})`,
});

// fromNullable :: a -> Either e a
const fromNullable = x =>
  x != null ? Right(x) : Left(null);

// tryCatch :: function -> Either e a
const tryCatch = f => {
  try {
    return Right(f())
  } catch (e) {
    return Left(e);
  }
};

module.exports = {
  Identity,
  fromNullable,
  tryCatch,
};