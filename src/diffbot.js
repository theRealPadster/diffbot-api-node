const fetch = require('node-fetch');

class DiffBot {
  /**
   * Instantiate a DiffBot
   * @param {string} token The DiffBot API token to use
   */
  constructor(token) {
    if (!token) throw new Error('missing token');
    this.token = token;
  }

  /**
   * Execute a product API call
   * @param {Object} options The search options
   * @param {string} options.url Web page URL of the product to process
   * @param {string[]} [options.fields] Used to specify optional fields to be returned by the Product API.
   * @param {boolean} [options.discussion] Pass discussion=false to disable automatic extraction of product reviews.
   * @param {number} [options.timeout] Sets a value in milliseconds to wait for the retrieval/fetch of content from the requested URL. The default timeout for the third-party response is 30 seconds (30000).
   * @param {string} [options.callback] Use for jsonp requests. Needed for cross-domain ajax.
   * @returns {Object} The product query results
   */
  product(options) {

    if (!options.url) {
      throw new Error("missing url");
    }

    let diffbot_url = `http://api.diffbot.com/v3/product?token=${this.token}&url=${encodeURIComponent(options.url)}`;

    if (options.fields) {
      diffbot_url += `&fields=${options.fields.join(',')}`;
    }

    if (options.discussion) {
      diffbot_url += `&discussion=${options.discussion}`;
    }

    if (options.timeout) {
      diffbot_url += `&timeout=${options.timeout}`;
    }

    if (options.callback) {
      diffbot_url += `&callback=${callback}`;
    }

    // TODO: add support for passing the markup in a POST
    // if (options.html) {
    //   diffbot_url += "&html=1";
    // }

    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(diffbot_url);
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


  /**
   * Execute a query against the Knowledge Graph
   * @param {Object} options The search options
   * @param {string} options.query The DQL knowledge base query
   * @param {number} [options.from] Ordinal position of first result to return. (First position is 0.) Default is 0.
   * @param {boolean} [options.nonCanonicalFacts] Return non-canonical facts. Default is no non-canonical facts.
   * @param {number} [options.size] Max number of results in page
   * @param {string} [options.type] Type of search: "query", "text", or "queryTextFallback"
   * @returns {Object} The query results
   */
  knowledgeGraph(options) {
    let diffbot_url = `https://kg.diffbot.com/kg/dql_endpoint?token=${this.token}&query=${encodeURIComponent(options.query)}`;

    // process extras
    if (options.from) {
      diffbot_url += `&from=${options.from}`;
    }

    if (options.nonCanonicalFacts) {
      diffbot_url += `&nonCanonicalFacts=${+options.nonCanonicalFacts}`;
    }

    if (options.size) {
      diffbot_url += `&size=${options.size}`;
    }

    if (options.type) {
      diffbot_url += `&type=${options.type}`;
    }

    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(diffbot_url);
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

  // TODO: clean up weird architecture
  crawl() {
    return {
      token: this.token,
      /**
       * Generate a new Crawlbot crawl job
       * @param {Object} options The search options
       * @param {string} options.name Job name. This should be a unique identifier and can be used to modify your crawl or retrieve its output.
       * @param {string[]} options.seeds Seed URL(s). Separate multiple URLs with whitespace to spider multiple sites within the same crawl. If the seed contains a non-www subdomain ("http://blog.diffbot.com" or "http://support.diffbot.com") Crawlbot will restrict spidering to the specified subdomain.
       * @param {string} [options.apiUrl] Full Diffbot API URL through which to process pages. E.g., &apiUrl=https://api.diffbot.com/v3/article to process matching links via the Article API. The Diffbot API URL can include querystring parameters to tailor the output. For example, &apiUrl=https://api.diffbot.com/v3/product?fields=querystring,meta will process matching links using the Product API, and also return the querystring and meta fields. Uses the Analyze API (Smart Processing) by default.
       * @returns {Object} The response and crawl job objects
       */
      new: function(options) {
        if (!options.name) {
          throw new Error('missing name');
        } else if (!options.seeds) {
          throw new Error('missing seeds');
        }

        let diffbot_url = `http://api.diffbot.com/v3/crawl?token=${this.token}`
          + `&name=${encodeURIComponent(options.name)}`
          + `&seeds=${encodeURIComponent(options.seeds.join(' '))}`;

        if (options.apiUrl) {
          diffbot_url += `&apiUrl=${encodeURIComponent(options.apiUrl)}`;
        } else {
          diffbot_url += `&apiUrl=${encodeURIComponent('https://api.diffbot.com/v3/analyze?mode=auto')}`;
        }

        console.log(diffbot_url);

        // TODO: add supprt for the other optional params
        // urlCrawlPattern, urlCrawlRegEx, urlProcessPattern, urlProcessRegEx, pageProcessPattern
        // and possibly some of the others (https://docs.diffbot.com/docs/en/api-crawlbot-api)

        return new Promise(async (resolve, reject) => {
          try {
            let response = await fetch(diffbot_url, {
              method: 'POST'
            });
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
      },
    }
  }
}

module.exports = DiffBot;
