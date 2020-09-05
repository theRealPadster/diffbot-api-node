class Crawlbot {
  /**
   * Instantiate a Crawlbot
   * @param {string} token The Diffbot API token to use
   * @param {string} name The name of the job
   */
  constructor (token, name) {
    if (!token) throw new Error('missing token');
    if (!name) throw new Error('missing name');
    this.token = token;
    this.name = name;
  }

  /**
   * Generate a new Crawlbot crawl job
   * @param {Object} options The search options
   * @param {string} options.name Job name. This should be a unique identifier and can be used to modify your crawl or retrieve its output.
   * @param {string[]} options.seeds Seed URL(s). If the seed contains a non-www subdomain ("http://blog.diffbot.com" or "http://support.diffbot.com") Crawlbot will restrict spidering to the specified subdomain.
   * @param {string} [options.apiUrl] Full Diffbot API URL through which to process pages. E.g., &apiUrl=https://api.diffbot.com/v3/article to process matching links via the Article API. The Diffbot API URL can include querystring parameters to tailor the output. For example, &apiUrl=https://api.diffbot.com/v3/product?fields=querystring,meta will process matching links using the Product API, and also return the querystring and meta fields. Uses the Analyze API (Smart Processing) by default.
   * @param {boolean} [options.useCanonical] Pass useCanonical=false to disable deduplication of pages based on a canonical link definition.
   * @param {number} [options.maxHops] Specify the depth of your crawl. A maxHops=0 will limit processing to the seed URL(s) only -- no other links will be processed; maxHops=1 will process all (otherwise matching) pages whose links appear on seed URL(s); maxHops=2 will process pages whose links appear on those pages; and so on. By default (maxHops=-1) Crawlbot will crawl and process links at any depth.
   * @param {number} [options.maxToCrawl] Specify max pages to spider. Default: 100,000.
   * @param {number} [options.maxToProcess] Specify max pages to process through Diffbot APIs. Default: 100,000.
   * @param {string} [options.notifyWebhook] Pass a URL to be notified when the crawl hits the maxToCrawl or maxToProcess limit, or when the crawl completes. You will receive a POST with X-Crawl-Name and X-Crawl-Status in the headers, and the job's JSON metadata in the POST body. Note that in webhook POSTs the parent jobs will not be sent—only the individual job object will be returned.
   * @returns {Object} The response and crawl job objects
   */
  new(options) {
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
    if(options.useCanonical != undefined){
      diffbot_url += `&useCanonical=${+options.useCanonical}`;
    }
    if(options.maxHops != undefined){
      diffbot_url += `&maxHops=${options.maxHops}`;
    }
    if(options.maxToCrawl != undefined){
      diffbot_url += `&maxToCrawl=${options.maxToCrawl}`;
    }
    if(options.maxToProcess != undefined){
      diffbot_url += `&maxToProcess=${options.maxToProcess}`;
    }
    if(options.notifyWebhook){
      diffbot_url += `&notifyWebhook=${options.notifyWebhook}`;
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
  }

  /**
   * Download a Crawlbot crawl job's results
   * @param {Object} options The options
   * @param {string} options.name Name of the crawl whose data you wish to download.
   * @param {format} [options.format] Request format=csv to download the extracted data in CSV format (default: json). Note that CSV files will only contain top-level fields.
   * @param {string} [options.type] Request type=urls to retrieve the crawl URL Report (CSV).
   * @param {number} [options.num] Pass an integer value (e.g. num=100) to request a subset of URLs, most recently crawled first.
   * @returns The crawl job's results
   */
  get(options) {
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
  }

  /**
   * Pause a Crawlbot crawl job
   * @param {string} name Job name as defined when the crawl was created.
   * @returns The operation results
   */
  pause(options) {
    // TODO: Do I police the optional fields or leave the user to get a 400 error?
    if (!options.name) {
      throw new Error('missing name');
    }

    let diffbot_url = `https://api.diffbot.com/v3/crawl?token=${this.token}`
      + `&name=${encodeURIComponent(options.name)}`
      + `&pause=1`;

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
  }

  /**
   * Resume a paused Crawlbot crawl job
   * @param {string} name Job name as defined when the crawl was created.
   * @returns The operation results
   */
  resume(options) {
    // TODO: Do I police the optional fields or leave the user to get a 400 error?
    if (!options.name) {
      throw new Error('missing name');
    }

    let diffbot_url = `https://api.diffbot.com/v3/crawl?token=${this.token}`
      + `&name=${encodeURIComponent(options.name)}`
      + `&pause=0`;

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
  }

  /**
   * Delete a Crawlbot crawl job and its data
   * @param {string} name Job name as defined when the crawl was created.
   * @returns The operation results
   */
  delete(options) {
    // TODO: Do I police the optional fields or leave the user to get a 400 error?
    if (!options.name) {
      throw new Error('missing name');
    }

    let diffbot_url = `https://api.diffbot.com/v3/crawl?token=${this.token}`
      + `&name=${encodeURIComponent(options.name)}`
      + `&delete=1`;

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
  }

  /**
   * Get Crawlbot job details
   * @param {Object} options The options
   * @param {string} [options.name] Name of crawl to retrieve.
   * @returns {Object} This will return a JSON response of your token's crawls (and Bulk API) jobs in the jobs object. If you have specified a single job name, only one job's details will be returned.
   */
  details(options) {

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
  }
}
