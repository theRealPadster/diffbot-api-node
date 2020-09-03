const fetch = require('node-fetch');
const axios = require('axios');
const { response } = require('express');

const sleep = require('util').promisify(setTimeout);

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

    let diffbot_url = `https://api.diffbot.com/v3/product?token=${this.token}&url=${encodeURIComponent(options.url)}`;

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
    console.log(options);
    let diffbot_url = `https://kg.diffbot.com/kg/dql_endpoint?token=${this.token}&query=${encodeURIComponent(options.query)}&size=1000`;

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

    console.log(diffbot_url);

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
      new: async function(options) {
        console.log(options);
        if (!options.name) {
          throw new Error('missing name');
        } else if (!options.seeds) {
          throw new Error('missing seeds');
        }
        let websites = options.seeds.split(' ');
        const webhookURL = 'https://96e7875aace1.ngrok.io/step3webhook'
        const maxToCrawl = websites.length*1000;
        const maxToProcess = maxToCrawl;
        let diffbot_url = `https://api.diffbot.com/v3/crawl?token=${this.token}`
          + `&name=${encodeURIComponent(options.name)}`
          + `&seeds=${encodeURIComponent(options.seeds)}`
          + `&notifyWebhook=${webhookURL}`;

        if (options.apiUrl) {
          diffbot_url += `&apiUrl=${encodeURIComponent(options.apiUrl)}`;
        } else {
          diffbot_url += `&apiUrl=${encodeURIComponent('https://api.diffbot.com/v3/analyze?mode=auto')}`;
        }
        if(options.maxHops){
          diffbot_url += `&maxHops=${options.maxHops}`;
        }
        else{
          diffbot_url += `&maxHops=3`;
        }
        if(options.maxToProcess){
          diffbot_url += `&maxToProcess=${options.maxToProcess}`;
        }
        else{
          diffbot_url += `&maxToProcess=${maxToProcess}`;
        }
        if(options.useCanonical){
          diffbot_url += `&useCanonical=${options.useCanonical}`;
        }
        else{
          diffbot_url += `&useCanonical=1`;
        }
        if(options.maxToCrawl){
          diffbot_url += `&maxToCrawl=${options.maxToCrawl}`;
        }
        else{
          diffbot_url += `&maxToCrawl=${maxToCrawl}`;
        }

        console.log(diffbot_url);
        //await sleep(2000);
        // TODO: add supprt for the other optional params
        // urlCrawlPattern, urlCrawlRegEx, urlProcessPattern, urlProcessRegEx, pageProcessPattern
        // and possibly some of the others (https://docs.diffbot.com/docs/en/api-crawlbot-api)
        return new Promise(async (resolve, reject) => {
          axios.post(diffbot_url)
        .then(response =>{
          //console.log(response);
          if(response.status == 200){
            // console.log(response.data);
            //console.log("Axios response++++++".response.data,"Axios response");
            resolve(response.data)
          }
          else{
            reject(response);
          }
        })
        .catch(err => {
          reject(err);
        })
          // try {
          //   let response = await fetch(diffbot_url, {
          //     method: 'POST'
          //   });
          //   if (!response.ok) {
          //     throw new Error('response not ok.');
          //   }
          //   // TODO: add some better error handling
          //   const parsed = await response.json();
          //   resolve(parsed);
          // } catch(err) {
          //   console.log("ERROR in parsing req::",err);
          //   reject(err);
          // }
        });
      },
      //To check status of existing job
      status: async function(options){
        console.log(options.jobname);
        if (!options.jobname) {
          throw new Error('missing name');
        }
        let diffbot_url = `https://api.diffbot.com/v3/crawl?token=${this.token}`
          + `&name=${encodeURIComponent(options.jobname)}`;
      
        if (options.apiUrl) {
          diffbot_url += `&apiUrl=${encodeURIComponent(options.apiUrl)}`;
        } else {
          diffbot_url += `&apiUrl=${encodeURIComponent('https://api.diffbot.com/v3/analyze?mode=auto')}`;
        }

        await sleep(200);

        return new Promise(async (resolve, reject) => {
          
        axios.post(diffbot_url)
        .then(response =>{
          if(response.status == 200){
            resolve(response.data)
          }
          else{
            reject(response);
          }
        })
        .catch(err => {
          reject(err);
        })
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
        else{
          diffbot_url += `&format=${encodeURIComponent('json')}`;
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
       * Crawlbot data filtered by search API
       * @param {Object} options The options
       * @param {string} options.name Name of the crawl whose data you wish to download.
       * @param {format} [options.format] Request format=csv to download the extracted data in CSV format (default: json). Note that CSV files will only contain top-level fields.
       * @param {string} [options.type] Request type=urls to retrieve the crawl URL Report (CSV).
       * @param {number} [options.num] Pass an integer value (e.g. num=100) to request a subset of URLs, most recently crawled first.
       * @returns The crawl job's results
       */
      search: function(options) {
        // TODO: Do I police the optional fields or leave the user to get a 400 error?
        if (!options.name) {
          throw new Error('missing name');
        } else if (!options.query){
          throw new Error('missing query');
        }

        let diffbot_url = `https://api.diffbot.com/v3/search?token=${this.token}`
          + `&col=${encodeURIComponent(options.name)}`
          + `&query=${encodeURIComponent(options.query)}`;

        if (options.num) {
          diffbot_url += `&num=${options.num}`;
        }
        else{
          diffbot_url += `&num=all`;
        }

        return new Promise(async (resolve, reject) => {
            
          axios.get(diffbot_url)
          .then(response =>{
            if(response.status == 200){
              resolve(response.data)
            }
            else{
              reject(response);
            }
          })
          .catch(err => {
            reject(err);
          })
        });
      },
      /* Delete job and data when products retrieved */
      delete: function(options) {
        // TODO: Do I police the optional fields or leave the user to get a 400 error?
        if (!options.name) {
          throw new Error('missing name');
        }

        let diffbot_url = `https://api.diffbot.com/v3/crawl?token=${this.token}`
          + `&name=${encodeURIComponent(options.name)}`
          + `&delete=1`;

        return new Promise(async (resolve, reject) => {
          console.log(diffbot_url);
            
          axios.post(diffbot_url)
          .then(response =>{
            if(response.status == 200){
              resolve(response.data)
            }
            else{
              reject(response);
            }
          })
          .catch(err => {
            reject(err);
          })
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

module.exports = DiffBot;
