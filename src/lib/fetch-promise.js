const fetch = require('node-fetch');

/**
 * Wrapper to promisify a fetch call
 * @param {string} url The url to fetch
 * @param {string} [method] The HTTP method to use (defaults to GET)
 * @returns The JSON-formatted fetch result
 */
module.exports = function (url, method = 'GET') {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(url, { method });
      if (!response.ok) {
        throw new Error('response not ok.');
      }
      // TODO: add some better error handling
      const parsed = await response.json();
      resolve(parsed);
    } catch(err) {
      reject(err);
    }
  });
}
