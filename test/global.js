const Diffbot = require('../src/diffbot.js');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised').default;
chai.use(chaiAsPromised);

function start(){}
function end(){}
const customJS = function() {
  start();
  setTimeout(function() {
    var loadMoreNode = document.querySelector('a.loadMore');
    if (loadMoreNode != null) {
      loadMoreNode.click();
      setTimeout(function() {
        end();
      }, 800);
    } else {
      end();
    }
  }, 500);
};

const FAKE_TOKEN = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
exports.diffbot = new Diffbot(FAKE_TOKEN, true);
exports.expect = chai.expect;
exports.customJS = customJS.toString();
exports.customHeaders = { 'User-Agent': 'Diffbot' };
