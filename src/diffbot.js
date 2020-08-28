const fetch = require('node-fetch');

class Diffbot {
  /**
   * Instantiate a Diffbot
   * @param {string} token The Diffbot API token to use
   */
  constructor(token) {
    if (!token) throw new Error('missing token');
    this.token = token;
  }

  /**
   * Execute an analyze API call
   * @param {Object} options The analyze options
   * @param {string} options.url Web page URL of the analyze to process
   * @param {string} [options.mode] By default the Analyze API will fully extract all pages that match an existing Automatic API -- articles, products or image pages. Set mode to a specific page-type (e.g., mode=article) to extract content only from that specific page-type. All other pages will simply return the default Analyze fields.
   * @param {string} [options.fallback] Force any non-extracted pages (those with a type of "other") through a specific API. For example, to route all "other" pages through the Article API, pass &fallback=article. Pages that utilize this functionality will return a fallbackType field at the top-level of the response and a originalType field within each extracted object, both of which will indicate the fallback API used.
   * @param {string[]} [options.fields] Specify optional fields to be returned from any fully-extracted pages, e.g.: &fields=querystring,links. See available fields within each API's individual documentation pages.
   * @param {boolean} [options.discussion] Pass discussion=false to disable automatic extraction of comments or reviews from pages identified as articles or products. This will not affect pages identified as discussions.
   * @param {number} [options.timeout] Sets a value in milliseconds to wait for the retrieval/fetch of content from the requested URL. The default timeout for the third-party response is 30 seconds (30000).
   * @param {string} [options.callback] Use for jsonp requests. Needed for cross-domain ajax.
   * @returns {Object} The analyze query results
   */
  analyze(options) {

    if (!options.url) {
      throw new Error('missing url');
    }

    let diffbot_url = `https://api.diffbot.com/v3/analyze?token=${this.token}&url=${encodeURIComponent(options.url)}`;

    if (options.mode) {
      diffbot_url += `&mode=${options.mode}`;
    }

    if (options.fallback) {
      diffbot_url += `&fallback=${options.fallback}`;
    }

    if (options.fields) {
      diffbot_url += `&fields=${options.fields.join(',')}`;
    }

    if (options.discussion != undefined) {
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
    //   diffbot_url += '&html=1';
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
      throw new Error('missing url');
    }

    let diffbot_url = `https://api.diffbot.com/v3/product?token=${this.token}&url=${encodeURIComponent(options.url)}`;

    if (options.fields) {
      diffbot_url += `&fields=${options.fields.join(',')}`;
    }

    if (options.discussion != undefined) {
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
    //   diffbot_url += '&html=1';
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
   * Execute an article API call
   * @param {Object} options The search options
   * @param {string} options.url Web page URL of the article to process
   * @param {string[]} [options.fields] Used to specify optional fields to be returned by the Article API.
   * @param {boolean} [options.paging] Pass paging=false to disable automatic concatenation of multiple-page articles. (By default, Diffbot will concatenate up to 20 pages of a single article.)
   * @param {number} [options.maxTags] Set the maximum number of automatically-generated tags to return. By default a maximum of ten tags will be returned.
   * @param {number} [options.tagConfidence] Set the minimum relevance score of tags to return, between 0.0 and 1.0. By default only tags with a score equal to or above 0.5 will be returned.
   * @param {boolean} [options.discussion] Pass discussion=false to disable automatic extraction of article comments.
   * @param {number} [options.timeout] Sets a value in milliseconds to wait for the retrieval/fetch of content from the requested URL. The default timeout for the third-party response is 30 seconds (30000).
   * @param {string} [options.callback] Use for jsonp requests. Needed for cross-domain ajax.
   * @returns {Object} The article query results
   */
  article(options) {

    if (!options.url) {
      throw new Error('missing url');
    }

    let diffbot_url = `https://api.diffbot.com/v3/article?token=${this.token}&url=${encodeURIComponent(options.url)}`;

    if (options.fields) {
      diffbot_url += `&fields=${options.fields.join(',')}`;
    }

    // TODO: test if it works to pass paging=true
    if (options.paging != undefined) {
      diffbot_url += `&paging=${options.paging}`;
    }

    if (options.maxTags) {
      diffbot_url += `&maxTags=${options.maxTags}`;
    }

    if (options.tagConfidence) {
      diffbot_url += `&tagConfidence=${options.tagConfidence}`;
    }

    if (options.discussion != undefined) {
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
    //   diffbot_url += '&html=1';
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

        let diffbot_url = `https://api.diffbot.com/v3/crawl?token=${this.token}`
          + `&name=${encodeURIComponent(options.name)}`
          + `&seeds=${encodeURIComponent(options.seeds.join(' '))}`;

        if (options.apiUrl) {
          diffbot_url += `&apiUrl=${encodeURIComponent(options.apiUrl)}`;
        } else {
          diffbot_url += `&apiUrl=${encodeURIComponent('https://api.diffbot.com/v3/analyze?mode=auto')}`;
        }

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
      /**
       * Download a Crawlbot crawl job's results
       * @param {Object} options The options
       * @param {string} options.name Name of the crawl whose data you wish to download.
       * @param {format} [options.format] Request format=csv to download the extracted data in CSV format (default: json). Note that CSV files will only contain top-level fields.
       * @param {string} [options.type] Request type=urls to retrieve the crawl URL Report (CSV).
       * @param {number} [options.num] Pass an integer value (e.g. num=100) to request a subset of URLs, most recently crawled first.
       * @returns The crawl job's results
       */
      get: function(options) {
        // TODO: Do I police the optional fields or leave the user to get a 400 error?
        if (!options.name) {
          throw new Error('missing name');
        } else if (options.format && !['csv','json'].includes(options.format)) {
          throw new Error('invalid format');
        } else if (options.type && options.type != 'urls') {
          throw new Error('invalid type');
        }

        let diffbot_url = `https://api.diffbot.com/v3/crawl/data?token=${this.token}`
          + `&name=${encodeURIComponent(options.name)}`;

        if (options.format) {
          diffbot_url += `&format=${encodeURIComponent(options.format)}`;
        }

        if (options.type) {
          diffbot_url += `&type=${encodeURIComponent(options.type)}`;
        }

        if (options.num) {
          diffbot_url += `&num=${encodeURIComponent(options.num)}`;
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
      },
      /**
       * Get Crawlbot job details
       * @param {Object} options The options
       * @param {string} [options.name] Name of crawl to retrieve.
       * @returns {Object} This will return a JSON response of your token's crawls (and Bulk API) jobs in the jobs object. If you have specified a single job name, only one job's details will be returned.
       */
      details: function(options) {

        let diffbot_url = `https://api.diffbot.com/v3/crawl?token=${this.token}`;

        if(options.name) {
          diffbot_url += `&name=${encodeURIComponent(options.name)}`;
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
      },
    }
  }
}

module.exports = Diffbot;
