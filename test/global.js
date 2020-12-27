const Diffbot = require('../src/diffbot.js');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const FAKE_TOKEN = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
exports.diffbot = new Diffbot(FAKE_TOKEN, true);
exports.expect = chai.expect;
