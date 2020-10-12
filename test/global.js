require('dotenv').config();
const Diffbot = require('../src/diffbot.js');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

exports.FAKE_TOKEN = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
exports.diffbot = new Diffbot(this.FAKE_TOKEN, true);
exports.expect = chai.expect;
