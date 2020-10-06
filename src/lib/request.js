const fetch = require('node-fetch');

// TODO: figure out how to get JSDocs to work properly
/**
 * Generate a simple request object
 * @typedef {Object} Request
 * @param {string} url The URL
 * @param {string} method The HTTP method to use (defaults to GET)
 * @param {string} [body] Optional HTML markup or plaintext to pass as POST body
 * @param {Object} headers The request headers
 */

/**
 * Generate a simple request object
 * @param {string} url The URL
 * @param {string} [method] The HTTP method to use (defaults to GET)
 * @param {string} [body] Optional HTML markup or plaintext to pass as POST body
 * @returns {Request} The request object
 */
exports.generate = function(url, method = 'GET', body) {
  let headers = {};
  if (body) {
    if (body.startsWith('<'))
      headers = { 'Content-Type': 'text/html' };
    else
      headers = { 'Content-Type': 'text/plain' };
  }

  return {
    url,
    method,
    body,
    headers,
  };
};

/**
 * Wrapper to promisify a fetch call
 * @param {Request} request The request to make
 * @returns The JSON-formatted fetch result
 */
exports.fetch = function (request) {
  return new Promise(async (resolve, reject) => {
    try {
      let params = {
        method: request.method,
        body: request.body,
        headers: request.headers,
      };
      let response = await fetch(request.url, params);
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
};
