/* eslint-env node */
module.exports = function (app) {
  require('./user')(app);
  require('./student')(app);
  require('./account')(app);
};
