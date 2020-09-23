const axios = require('axios').default;

/**
 * Wrapper for axios calls
 * @param {string} url The url to fetch
 * @param {string} [method] The HTTP method to use (defaults to GET)
 * @returns The JSON-formatted result
 */
module.exports = function (url, method = 'GET') {
  return new Promise(async (resolve, reject) => {
    axios({
      method,
      url,
    })
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
