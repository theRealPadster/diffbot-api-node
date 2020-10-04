const fetch = require('node-fetch');

/**
 * Wrapper to promisify a fetch call
 * @param {string} url The url to fetch
 * @param {string} [method] The HTTP method to use (defaults to GET)
 * @param {string} [body] Optional HTML markup to pass as POST body
 * @returns The JSON-formatted fetch result
 */
module.exports = function (url, method, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let params = { method };
      if (body) {
        params.body = body;
        params.headers = body.startsWith('<') ?
          { 'Content-Type': 'text/html' }
          : { 'Content-Type': 'text/plain' };
      }
      let response = await fetch(url, params);
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
