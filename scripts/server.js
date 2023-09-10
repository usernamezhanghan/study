/* eslint-env node */
'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const args = require('minimist')(process.argv.slice(2));
const port = args.p || args.port || 3002;
const prefix = args.pre || args.prefix || '';

const app = express();

// support CORS
app.use(cors({ origin: '*' }));
// support json encoded bodies
app.use(bodyParser.json());
// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// global parameters demo
// app.locals.session = { userName: 'test' };
require('../mocks')(app, prefix);

app.listen(port, () => {
  console.log(`mock server listening on port ${port}`);
});
