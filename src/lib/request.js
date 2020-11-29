const axios = require('axios');

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
 * @param {Object} [customHeaders] Optional additional request headers object
 * @returns {Request} The request object
 */
exports.generate = function(url, method = 'GET', body, customHeaders) {
  let headers = { ...customHeaders };
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
 * Wrapper for axios calls
 * @param {Request} request The request to make
 * @returns The JSON-formatted result
 */
exports.exec = function (request) {
  return new Promise(async (resolve, reject) => {
    let params = {
      method: request.method,
      url: request.url,
      data: request.body,
      headers: request.headers,
    };

    axios(params)
      .then(response => resolve(response.data))
      .catch(err => {
        reject(err);
      });
  });
};
