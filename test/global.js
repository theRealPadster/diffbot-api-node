require('dotenv').config();
const Diffbot = require('../src/diffbot.js');

exports.diffbot = new Diffbot(process.env.DIFFBOT_API_TOKEN, true);
exports.expect = require('chai').expect;
