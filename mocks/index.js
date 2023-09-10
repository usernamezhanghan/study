/* eslint-env node */
module.exports = function (app) {
  const bodyParser = require('body-parser');
  app.use(bodyParser.json());
  // support encoded bodies
  app.use(bodyParser.urlencoded({ extended: true }));
  require('./userCenter')(app);
};
