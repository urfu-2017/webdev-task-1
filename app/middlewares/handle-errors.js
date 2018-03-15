module.exports = (err, req, res, next) => {
  /* eslint no-unused-vars: 0 */
  console.error(err.stack);

  res.sendStatus(500);
};
