const axios = require('axios').default;

/**
 * Wrapper for axios calls
 * @param {string} url The url to fetch
 * @param {string} [method] The HTTP method to use (defaults to GET)
 * @param {string} [data] Optional HTML markup to pass as POST body
 * @returns The JSON-formatted result
 */
module.exports = function (url, method = 'GET', data) {
  return new Promise(async (resolve, reject) => {
    let params = {
      method,
      url,
      data,
      headers: data ? { 'Content-Type': 'text/html' } : undefined,
    };

    axios(params)
      .then(response => {
        if(response.status == 200){
          resolve(response.data)
        }
        else{
          reject(response);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}
