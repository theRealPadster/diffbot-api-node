require('dotenv').config();
const Diffbot = require('../src/diffbot.js');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

exports.diffbot = new Diffbot(process.env.DIFFBOT_API_TOKEN, true);
exports.expect = chai.expect;
