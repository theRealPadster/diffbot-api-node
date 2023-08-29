const request = require('./lib/request');

class Diffbot {
  /**
   * Instantiate a Diffbot
   * @param {string} token The Diffbot API token to use
   * @param {boolean} [test] Enable test mode (only returns requests without executing)
   */
  constructor(token, test = false) {
    if (!token) throw new Error('missing token');
    this.token = token;
    this.test = test;
  }

  /**
   * Execute an analyze API call
   * @param {object} options The analyze options
   * @param {string} options.url Web page URL of the analyze to process
   * @param {string} [options.mode] By default the Analyze API will fully extract all pages that match an existing Automatic API -- articles, products or image pages. Set mode to a specific page-type (e.g., mode=article) to extract content only from that specific page-type. All other pages will simply return the default Analyze fields.
   * @param {string} [options.fallback] Force any non-extracted pages (those with a type of "other") through a specific API. For example, to route all "other" pages through the Article API, pass &fallback=article. Pages that utilize this functionality will return a fallbackType field at the top-level of the response and a originalType field within each extracted object, both of which will indicate the fallback API used.
   * @param {string[]} [options.fields] Specify optional fields to be returned from any fully-extracted pages, e.g.: &fields=querystring,links. See available fields within each API's individual documentation pages.
   * @param {boolean} [options.paging] (*Undocumented*) Pass paging=false to disable automatic concatenation of multiple-page articles. (By default, Diffbot will concatenate up to 20 pages of a single article.)
   * @param {boolean} [options.discussion] Pass discussion=false to disable automatic extraction of comments or reviews from pages identified as articles or products. This will not affect pages identified as discussions.
   * @param {number} [options.timeout] Sets a value in milliseconds to wait for the retrieval/fetch of content from the requested URL. The default timeout for the third-party response is 30 seconds (30000).
   * @param {string} [options.callback] Use for jsonp requests. Needed for cross-domain ajax.
   * @param {string} [options.proxy] Used to specify the IP address of a custom proxy that will be used to fetch the target page, instead of Diffbot's default IPs/proxies. (Ex: &proxy=168.212.226.204)
   * @param {string} [options.proxyAuth] Used to specify the authentication parameters that will be used with the proxy specified in the &proxy parameter. (Ex: &proxyAuth=username:password)
   * @param {string} [options.body] Optional HTML markup to pass as POST body
   * @param {string} [options.customJS] This functionality is currently in beta. See docs for details: https://docs.diffbot.com/docs/en/api-analyze#custom-javascript
   * @param {object} [options.customHeaders] This functionality is currently in beta. See docs for details: https://docs.diffbot.com/docs/en/api-analyze#custom-headers
   * @returns {object} The analyze query results
   */
  analyze(options) {

    if (!options.url)
      throw new Error('missing url');

    let diffbot_url = `https://api.diffbot.com/v3/analyze?token=${this.token}&url=${encodeURIComponent(options.url)}`;

    if (options.mode)
      diffbot_url += `&mode=${options.mode}`;

    if (options.fallback)
      diffbot_url += `&fallback=${options.fallback}`;

    if (options.fields)
      diffbot_url += `&fields=${options.fields.join(',')}`;

    // Use of `paging` for the analyze endpoint is undocumented, but does work and was recommended by Diffbot support
    // See: https://github.com/theRealPadster/diffbot-api-node/issues/16
    if (options.paging != undefined)
      diffbot_url += `&paging=${options.paging}`;

    if (options.discussion != undefined)
      diffbot_url += `&discussion=${options.discussion}`;

    if (options.timeout)
      diffbot_url += `&timeout=${options.timeout}`;

    if (options.callback)
      diffbot_url += `&callback=${options.callback}`;

    if (options.proxy)
      diffbot_url += `&proxy=${options.proxy}`;

    if (options.proxyAuth)
      diffbot_url += `&proxyAuth=${options.proxyAuth}`;

    const method = options.body ? 'POST' : 'GET';

    const customHeaders = options.customHeaders || {};
    if (options.customJS) {
      // strip out newlines and whitespace
      customHeaders['X-Evaluate'] = options.customJS.replace(/(\r?\n|\r)\s+/g, '');
    }

    let req = request.generate(diffbot_url, method, options.body, customHeaders);
    let ret = this.test ? req : request.exec(req);

    return ret;
  }

  /**
   * Execute an article API call
   * @param {object} options The search options
   * @param {string} [options.url] Web page URL of the article to process (required unless posting plain text)
   * @param {string[]} [options.fields] Used to specify optional fields to be returned by the Article API. See fields: https://www.diffbot.com/dev/docs/article/#fields
   * @param {boolean} [options.paging] Pass paging=false to disable automatic concatenation of multiple-page articles. (By default, Diffbot will concatenate up to 20 pages of a single article.)
   * @param {number} [options.maxTags] Set the maximum number of automatically-generated tags to return. By default a maximum of ten tags will be returned.
   * @param {number} [options.tagConfidence] Set the minimum relevance score of tags to return, between 0.0 and 1.0. By default only tags with a score equal to or above 0.5 will be returned.
   * @param {boolean} [options.discussion] Pass discussion=false to disable automatic extraction of article comments.
   * @param {number} [options.timeout] Sets a value in milliseconds to wait for the retrieval/fetch of content from the requested URL. The default timeout for the third-party response is 30 seconds (30000).
   * @param {string} [options.callback] Use for jsonp requests. Needed for cross-domain ajax.
   * @param {string} [options.proxy] Used to specify the IP address of a custom proxy that will be used to fetch the target page, instead of Diffbot's default IPs/proxies. (Ex: &proxy=168.212.226.204)
   * @param {string} [options.proxyAuth] Used to specify the authentication parameters that will be used with the proxy specified in the &proxy parameter. (Ex: &proxyAuth=username:password)
   * @param {string[]} [options.naturalLanguage] Used to request the output of the Diffbot Natural Language API in the field naturalLanguage. Example: &naturalLanguage=entities,facts,categories,sentiment.
   * @param {string} [options.body] Optional HTML markup to pass as POST body
   * @param {string} [options.customJS] This functionality is currently in beta. See docs for details: https://docs.diffbot.com/docs/en/api-article#custom-javascript
   * @param {object} [options.customHeaders] This functionality is currently in beta. See docs for details: https://docs.diffbot.com/docs/en/api-article#custom-headers
   * @returns {object} The article query results
   */
  article(options) {

    // If we don't have a url, and have no body or have an html body, error
    if (!options.url && (!options.body || options.body.startsWith('<')))
      throw new Error('missing url');

    let diffbot_url = `https://api.diffbot.com/v3/article?token=${this.token}`;

    if (options.url)
      diffbot_url += `&url=${encodeURIComponent(options.url)}`;

    if (options.fields)
      diffbot_url += `&fields=${options.fields.join(',')}`;

    if (options.paging != undefined)
      diffbot_url += `&paging=${options.paging}`;

    if (options.maxTags != undefined)
      diffbot_url += `&maxTags=${options.maxTags}`;

    if (options.tagConfidence)
      diffbot_url += `&tagConfidence=${options.tagConfidence}`;

    if (options.discussion != undefined)
      diffbot_url += `&discussion=${options.discussion}`;

    if (options.timeout)
      diffbot_url += `&timeout=${options.timeout}`;

    if (options.callback)
      diffbot_url += `&callback=${options.callback}`;

    if (options.proxy)
      diffbot_url += `&proxy=${options.proxy}`;

    if (options.proxyAuth)
      diffbot_url += `&proxyAuth=${options.proxyAuth}`;

    if (options.naturalLanguage)
      diffbot_url += `&naturalLanguage=${options.naturalLanguage.join(',')}`;

    const method = options.body ? 'POST' : 'GET';

    const customHeaders = options.customHeaders || {};
    if (options.customJS) {
      // strip out newlines and whitespace
      customHeaders['X-Evaluate'] = options.customJS.replace(/(\r?\n|\r)\s+/g, '');
    }

    let req = request.generate(diffbot_url, method, options.body, customHeaders);
    let ret = this.test ? req : request.exec(req);

    return ret;
  }

  /**
   * Execute a discussion API call
   * @param {object} options The call options
   * @param {string} options.url Web page URL of the discussion to process
   * @param {string[]} [options.fields] Used to specify optional fields to be returned by the Discussion API. See fields: https://www.diffbot.com/dev/docs/discussion/#fields
   * @param {number} [options.timeout] Sets a value in milliseconds to wait for the retrieval/fetch of content from the requested URL. The default timeout for the third-party response is 30 seconds (30000).
   * @param {string} [options.callback] Use for jsonp requests. Needed for cross-domain ajax.
   * @param {number|string} [options.maxPages] Set the maximum number of pages in a thread to automatically concatenate in a single response. Default = 1 (no concatenation). Set maxPages=all to retrieve all pages of a thread regardless of length. Each individual page will count as a separate API call.
   * @param {string} [options.proxy] Used to specify the IP address of a custom proxy that will be used to fetch the target page, instead of Diffbot's default IPs/proxies. (Ex: &proxy=168.212.226.204)
   * @param {string} [options.proxyAuth] Used to specify the authentication parameters that will be used with the proxy specified in the &proxy parameter. (Ex: &proxyAuth=username:password)
   * @param {string} [options.body] Optional HTML markup to pass as POST body
   * @param {string} [options.customJS] This functionality is currently in beta. See docs for details: https://docs.diffbot.com/docs/en/api-discussion#custom-javascript
   * @param {object} [options.customHeaders] This functionality is currently in beta. See docs for details: https://docs.diffbot.com/docs/en/api-discussion#custom-headers
   * @returns {object} The discussion query results
   */
  discussion(options) {

    if (!options.url)
      throw new Error('missing url');

    let diffbot_url = `https://api.diffbot.com/v3/discussion?token=${this.token}&url=${encodeURIComponent(options.url)}`;

    if (options.fields)
      diffbot_url += `&fields=${options.fields.join(',')}`;

    if (options.timeout)
      diffbot_url += `&timeout=${options.timeout}`;

    if (options.callback)
      diffbot_url += `&callback=${options.callback}`;

    if (options.maxPages != undefined)
      diffbot_url += `&maxPages=${options.maxPages}`;

    if (options.proxy)
      diffbot_url += `&proxy=${options.proxy}`;

    if (options.proxyAuth)
      diffbot_url += `&proxyAuth=${options.proxyAuth}`;

    const method = options.body ? 'POST' : 'GET';

    const customHeaders = options.customHeaders || {};
    if (options.customJS) {
      // strip out newlines and whitespace
      customHeaders['X-Evaluate'] = options.customJS.replace(/(\r?\n|\r)\s+/g, '');
    }

    let req = request.generate(diffbot_url, method, options.body, customHeaders);
    let ret = this.test ? req : request.exec(req);

    return ret;
  }

  /**
   * Execute an event API call
   * @param {object} options The event options
   * @param {string} options.url Web page URL of the event to process
   * @param {string[]} [options.fields] Used to specify optional fields to be returned by the Event API. See fields: https://docs.diffbot.com/docs/en/api-event
   * @param {number} [options.timeout] Sets a value in milliseconds to wait for the retrieval/fetch of content from the requested URL. The default timeout for the third-party response is 30 seconds (30000).
   * @param {string} [options.callback] Use for jsonp requests. Needed for cross-domain ajax.
   * @param {string} [options.proxy] Used to specify the IP address of a custom proxy that will be used to fetch the target page, instead of Diffbot's default IPs/proxies. (Ex: &proxy=168.212.226.204)
   * @param {string} [options.proxyAuth] Used to specify the authentication parameters that will be used with the proxy specified in the &proxy parameter. (Ex: &proxyAuth=username:password)
   * @param {string} [options.body] Optional HTML markup to pass as POST body
   * @param {string} [options.customJS] This functionality is currently in beta. See docs for details: https://docs.diffbot.com/docs/en/api-event#custom-javascript
   * @param {object} [options.customHeaders] This functionality is currently in beta. See docs for details: https://docs.diffbot.com/docs/en/api-event#custom-headers
   * @returns {object} The analyze query results
   */
  event(options) {

    if (!options.url)
      throw new Error('missing url');

    let diffbot_url = `https://api.diffbot.com/v3/event?token=${this.token}&url=${encodeURIComponent(options.url)}`;

    if (options.fields)
      diffbot_url += `&fields=${options.fields.join(',')}`;

    if (options.timeout)
      diffbot_url += `&timeout=${options.timeout}`;

    if (options.callback)
      diffbot_url += `&callback=${options.callback}`;

    if (options.proxy)
      diffbot_url += `&proxy=${options.proxy}`;

    if (options.proxyAuth)
      diffbot_url += `&proxyAuth=${options.proxyAuth}`;

    const method = options.body ? 'POST' : 'GET';

    const customHeaders = options.customHeaders || {};
    if (options.customJS) {
      // strip out newlines and whitespace
      customHeaders['X-Evaluate'] = options.customJS.replace(/(\r?\n|\r)\s+/g, '');
    }

    let req = request.generate(diffbot_url, method, options.body, customHeaders);
    let ret = this.test ? req : request.exec(req);

    return ret;
  }

  /**
   * Execute an image API call
   * @param {object} options The call options
   * @param {string} options.url Web page URL of the image to process
   * @param {string[]} [options.fields] Used to specify optional fields to be returned by the Image API. See fields: https://www.diffbot.com/dev/docs/image/#fields
   * @param {number} [options.timeout] Sets a value in milliseconds to wait for the retrieval/fetch of content from the requested URL. The default timeout for the third-party response is 30 seconds (30000).
   * @param {string} [options.callback] Use for jsonp requests. Needed for cross-domain ajax.
   * @param {string} [options.proxy] Used to specify the IP address of a custom proxy that will be used to fetch the target page, instead of Diffbot's default IPs/proxies. (Ex: &proxy=168.212.226.204)
   * @param {string} [options.proxyAuth] Used to specify the authentication parameters that will be used with the proxy specified in the &proxy parameter. (Ex: &proxyAuth=username:password)
   * @param {string} [options.body] Optional HTML markup to pass as POST body
   * @param {string} [options.customJS] This functionality is currently in beta. See docs for details: https://docs.diffbot.com/docs/en/api-image#custom-javascript
   * @param {object} [options.customHeaders] This functionality is currently in beta. See docs for details: https://docs.diffbot.com/docs/en/api-image#custom-headers
   * @returns {object} The image query results
   */
  image(options) {

    if (!options.url)
      throw new Error('missing url');

    let diffbot_url = `https://api.diffbot.com/v3/image?token=${this.token}&url=${encodeURIComponent(options.url)}`;

    if (options.fields)
      diffbot_url += `&fields=${options.fields.join(',')}`;

    if (options.timeout)
      diffbot_url += `&timeout=${options.timeout}`;

    if (options.callback)
      diffbot_url += `&callback=${options.callback}`;

    if (options.proxy)
      diffbot_url += `&proxy=${options.proxy}`;

    if (options.proxyAuth)
      diffbot_url += `&proxyAuth=${options.proxyAuth}`;

    const method = options.body ? 'POST' : 'GET';

    const customHeaders = options.customHeaders || {};
    if (options.customJS) {
      // strip out newlines and whitespace
      customHeaders['X-Evaluate'] = options.customJS.replace(/(\r?\n|\r)\s+/g, '');
    }

    let req = request.generate(diffbot_url, method, options.body, customHeaders);
    let ret = this.test ? req : request.exec(req);

    return ret;
  }

  /**
   * Execute a product API call
   * @param {object} options The search options
   * @param {string} options.url Web page URL of the product to process
   * @param {string[]} [options.fields] Used to specify optional fields to be returned by the Product API. See fields: https://www.diffbot.com/dev/docs/product/#fields
   * @param {boolean} [options.discussion] Pass discussion=false to disable automatic extraction of product reviews.
   * @param {number} [options.timeout] Sets a value in milliseconds to wait for the retrieval/fetch of content from the requested URL. The default timeout for the third-party response is 30 seconds (30000).
   * @param {string} [options.callback] Use for jsonp requests. Needed for cross-domain ajax.
   * @param {string} [options.proxy] Used to specify the IP address of a custom proxy that will be used to fetch the target page, instead of Diffbot's default IPs/proxies. (Ex: &proxy=168.212.226.204)
   * @param {string} [options.proxyAuth] Used to specify the authentication parameters that will be used with the proxy specified in the &proxy parameter. (Ex: &proxyAuth=username:password)
   * @param {string} [options.body] Optional HTML markup to pass as POST body
   * @param {string} [options.customJS] This functionality is currently in beta. See docs for details: https://docs.diffbot.com/docs/en/api-product#custom-javascript
   * @param {object} [options.customHeaders] This functionality is currently in beta. See docs for details: https://docs.diffbot.com/docs/en/api-product#custom-headers
   * @returns {object} The product query results
   */
  product(options) {

    if (!options.url)
      throw new Error('missing url');

    let diffbot_url = `https://api.diffbot.com/v3/product?token=${this.token}&url=${encodeURIComponent(options.url)}`;

    if (options.fields)
      diffbot_url += `&fields=${options.fields.join(',')}`;

    if (options.discussion != undefined)
      diffbot_url += `&discussion=${options.discussion}`;

    if (options.timeout)
      diffbot_url += `&timeout=${options.timeout}`;

    if (options.callback)
      diffbot_url += `&callback=${options.callback}`;

    if (options.proxy)
      diffbot_url += `&proxy=${options.proxy}`;

    if (options.proxyAuth)
      diffbot_url += `&proxyAuth=${options.proxyAuth}`;

    const method = options.body ? 'POST' : 'GET';

    const customHeaders = options.customHeaders || {};
    if (options.customJS) {
      // strip out newlines and whitespace
      customHeaders['X-Evaluate'] = options.customJS.replace(/(\r?\n|\r)\s+/g, '');
    }

    let req = request.generate(diffbot_url, method, options.body, customHeaders);
    let ret = this.test ? req : request.exec(req);

    return ret;
  }

  /**
   * Execute a video API call
   * @param {object} options The call options
   * @param {string} options.url Web page URL of the video to process
   * @param {string[]} [options.fields] Used to specify optional fields to be returned by the Video API. See fields: https://www.diffbot.com/dev/docs/video/#fields
   * @param {number} [options.timeout] Sets a value in milliseconds to wait for the retrieval/fetch of content from the requested URL. The default timeout for the third-party response is 30 seconds (30000).
   * @param {string} [options.callback] Use for jsonp requests. Needed for cross-domain ajax.
   * @param {string} [options.proxy] Used to specify the IP address of a custom proxy that will be used to fetch the target page, instead of Diffbot's default IPs/proxies. (Ex: &proxy=168.212.226.204)
   * @param {string} [options.proxyAuth] Used to specify the authentication parameters that will be used with the proxy specified in the &proxy parameter. (Ex: &proxyAuth=username:password)
   * @param {string} [options.body] Optional HTML markup to pass as POST body
   * @param {string} [options.customJS] This functionality is currently in beta. See docs for details: https://docs.diffbot.com/docs/en/api-video#custom-javascript
   * @param {object} [options.customHeaders] This functionality is currently in beta. See docs for details: https://docs.diffbot.com/docs/en/api-video#custom-headers
   * @returns {object} The video query results
   */
  video(options) {

    if (!options.url)
      throw new Error('missing url');

    let diffbot_url = `https://api.diffbot.com/v3/video?token=${this.token}&url=${encodeURIComponent(options.url)}`;

    if (options.fields)
      diffbot_url += `&fields=${options.fields.join(',')}`;

    if (options.timeout)
      diffbot_url += `&timeout=${options.timeout}`;

    if (options.callback)
      diffbot_url += `&callback=${options.callback}`;

    if (options.proxy)
      diffbot_url += `&proxy=${options.proxy}`;

    if (options.proxyAuth)
      diffbot_url += `&proxyAuth=${options.proxyAuth}`;

    const method = options.body ? 'POST' : 'GET';

    const customHeaders = options.customHeaders || {};
    if (options.customJS) {
      // strip out newlines and whitespace
      customHeaders['X-Evaluate'] = options.customJS.replace(/(\r?\n|\r)\s+/g, '');
    }

    let req = request.generate(diffbot_url, method, options.body, customHeaders);
    let ret = this.test ? req : request.exec(req);

    return ret;
  }

  /**
   * Execute a query against the Knowledge Graph
   * @param {object} options The search options
   * @param {string} options.query The DQL knowledge base query
   * @param {string} [options.type] Type of search: "query", "text", or "queryTextFallback"
   * @param {number} [options.size] Max number of results in page
   * @param {number} [options.from] Ordinal position of first result to return. (First position is 0.) Default is 0.
   * @param {string} [options.jsonmode] jsonmode=extended returns origin information for facts
   * @param {boolean} [options.nonCanonicalFacts] Return non-canonical facts. Default is no non-canonical facts.
   * @param {boolean} [options.noDedupArticles] Indicates that articles should not be deduplicated but all of them returned
   * @returns {object} The query results
   */
  knowledgeGraph(options) {

    if (!options.query)
      throw new Error('missing query');
    else if (options.jsonmode && options.jsonmode != 'extended')
      throw new Error('invalid jsonmode');

    let diffbot_url = `https://kg.diffbot.com/kg/v3/dql?token=${this.token}&query=${encodeURIComponent(options.query)}`;

    if (options.type)
      diffbot_url += `&type=${options.type}`;

    if (options.size)
      diffbot_url += `&size=${options.size}`;

    if (options.from)
      diffbot_url += `&from=${options.from}`;

    if (options.jsonmode)
      diffbot_url += `&jsonmode=${options.jsonmode}`;

    if (options.nonCanonicalFacts != undefined)
      diffbot_url += `&nonCanonicalFacts=${+options.nonCanonicalFacts}`;

    if (options.noDedupArticles != undefined)
      diffbot_url += `&noDedupArticles=${+options.noDedupArticles}`;

    let req = request.generate(diffbot_url);
    let ret = this.test ? req : request.exec(req);

    return ret;
  }

  // TODO: clean up weird architecture
  crawl() {
    return {
      token: this.token,
      test: this.test,
      /**
       * Generate a new Crawlbot crawl job
       * @param {object} options The search options
       * @param {string} options.name Job name. This should be a unique identifier and can be used to modify your crawl or retrieve its output.
       * @param {string[]} options.seeds Seed URL(s). If the seed contains a non-www subdomain ("http://blog.diffbot.com" or "http://support.diffbot.com") Crawlbot will restrict spidering to the specified subdomain.
       * @param {string} [options.apiUrl] Full Diffbot API URL through which to process pages. E.g., &apiUrl=https://api.diffbot.com/v3/article to process matching links via the Article API. The Diffbot API URL can include querystring parameters to tailor the output. For example, &apiUrl=https://api.diffbot.com/v3/product?fields=querystring,meta will process matching links using the Product API, and also return the querystring and meta fields. Uses the Analyze API (Smart Processing) by default.
       * @param {string} [options.urlCrawlPattern] Specify ||-separated strings to limit pages crawled to those whose URLs contain any of the content strings. You can use the exclamation point to specify a negative string, e.g. !product to exclude URLs containing the string "product," and the ^ and $ characters to limit matches to the beginning or end of the URL. The use of a urlCrawlPattern will allow Crawlbot to spider outside of the seed domain; it will follow all matching URLs regardless of domain.
       * @param {string} [options.urlCrawlRegEx] Specify a regular expression to limit pages crawled to those URLs that contain a match to your expression. This will override any urlCrawlPattern value.
       * @param {string} [options.urlProcessPattern] Specify ||-separated strings to limit pages processed to those whose URLs contain any of the content strings. You can use the exclamation point to specify a negative string, e.g. !/category to exclude URLs containing the string "/category," and the ^ and $ characters to limit matches to the beginning or end of the URL.
       * @param {string} [options.urlProcessRegEx] Specify a regular expression to limit pages processed to those URLs that contain a match to your expression. This will override any urlProcessPattern value.
       * @param {string} [options.pageProcessPattern] Specify ||-separated strings to limit pages processed to those whose HTML contains any of the content strings.
       * @param {boolean} [options.useCanonical] Pass useCanonical=false to disable deduplication of pages based on a canonical link definition.
       * @param {boolean} [options.obeyRobots] Pass obeyRobots=false to ignore a site's robots.txt instructions.
       * @param {boolean} [options.restrictDomain] Pass restrictDomain=false to allow limited crawling across subdomains/domains. See more here: https://docs.diffbot.com/docs/en/guides-restrict-domain.
       * @param {boolean} [options.useProxies] Set value to true to force the use of proxy IPs for the crawl. This will utilize proxy servers for both crawling and processing of pages.
       * @param {number} [options.maxHops] Specify the depth of your crawl. A maxHops=0 will limit processing to the seed URL(s) only -- no other links will be processed; maxHops=1 will process all (otherwise matching) pages whose links appear on seed URL(s); maxHops=2 will process pages whose links appear on those pages; and so on. By default (maxHops=-1) Crawlbot will crawl and process links at any depth.
       * @param {number} [options.maxToCrawl] Specify max pages to spider. Default: 100,000.
       * @param {number} [options.maxToProcess] Specify max pages to process through Diffbot APIs. Default: 100,000.
       * @param {number} [options.maxToCrawlPerSubdomain] Specify max pages to spider per subdomain. Default: no limit (-1)
       * @param {number} [options.maxToProcessPerSubdomain] Specify max pages to process per subdomain. Default: no limit (-1)
       * @param {string} [options.notifyEmail] Send a message to this email address when the crawl hits the maxToCrawl or maxToProcess limit, or when the crawl completes.
       * @param {string} [options.notifyWebhook] Pass a URL to be notified when the crawl hits the maxToCrawl or maxToProcess limit, or when the crawl completes. You will receive a POST with X-Crawl-Name and X-Crawl-Status in the headers, and the job's JSON metadata in the POST body. Note that in webhook POSTs the parent jobs will not be sent—only the individual job object will be returned.
       * @param {number} [options.crawlDelay] Wait this many seconds between each URL crawled from a single IP address. Specify the number of seconds as an integer or floating-point number (e.g., crawlDelay=0.25).
       * @param {number} [options.repeat] Specify the number of days as a floating-point (e.g. repeat=7.0) to repeat this crawl. By default crawls will not be repeated.
       * @param {number} [options.seedRecrawlFrequency] Useful for specifying a frequency, in number of days, to recrawl seed urls, which is independent of the overall recrawl frequency given by repeat. Defaults to seedRecrawlFrequency=-1 to use the default frequency.
       * @param {boolean} [options.onlyProcessIfNew] By default repeat crawls will only process new (previously unprocessed) pages. Set to false to process all content on repeat crawls.
       * @param {number} [options.maxRounds] Specify the maximum number of crawl repeats. By default (maxRounds=0) repeating crawls will continue indefinitely.
       * @returns {object} The response and crawl job objects
       */
      new: function(options) {
        if (!options.name)
          throw new Error('missing name');
        else if (!options.seeds || !options.seeds.length)
          throw new Error('missing seeds');

        let diffbot_url = `https://api.diffbot.com/v3/crawl?token=${this.token}`
          + `&name=${encodeURIComponent(options.name)}`
          + `&seeds=${encodeURIComponent(options.seeds.join(' '))}`;

        if (options.apiUrl)
          diffbot_url += `&apiUrl=${encodeURIComponent(options.apiUrl)}`;
        else
          diffbot_url += `&apiUrl=${encodeURIComponent('https://api.diffbot.com/v3/analyze?mode=auto')}`;

        // TODO: Do I need to uri encode all patterns/regexes?
        if (options.urlCrawlPattern)
          diffbot_url += `&urlCrawlPattern=${encodeURIComponent(options.urlCrawlPattern)}`;

        if (options.urlCrawlRegEx)
          diffbot_url += `&urlCrawlRegEx=${encodeURIComponent(options.urlCrawlRegEx)}`;

        if (options.urlProcessPattern)
          diffbot_url += `&urlProcessPattern=${encodeURIComponent(options.urlProcessPattern)}`;

        if (options.urlProcessRegEx)
          diffbot_url += `&urlProcessRegEx=${encodeURIComponent(options.urlProcessRegEx)}`;

        if (options.pageProcessPattern)
          diffbot_url += `&pageProcessPattern=${encodeURIComponent(options.pageProcessPattern)}`;

        // TODO: add support for customHeaders

        if (options.useCanonical != undefined)
          diffbot_url += `&useCanonical=${+options.useCanonical}`;

        if (options.obeyRobots != undefined)
          diffbot_url += `&obeyRobots=${+options.obeyRobots}`;

        if (options.restrictDomain != undefined)
          diffbot_url += `&restrictDomain=${+options.restrictDomain}`;

        if (options.useProxies != undefined)
          diffbot_url += `&useProxies=${+options.useProxies}`;

        if (options.maxHops != undefined)
          diffbot_url += `&maxHops=${options.maxHops}`;

        if (options.maxToCrawl != undefined)
          diffbot_url += `&maxToCrawl=${options.maxToCrawl}`;

        if (options.maxToProcess != undefined)
          diffbot_url += `&maxToProcess=${options.maxToProcess}`;

        if (options.maxToCrawlPerSubdomain != undefined)
          diffbot_url += `&maxToCrawlPerSubdomain=${options.maxToCrawlPerSubdomain}`;

        if (options.maxToProcessPerSubdomain != undefined)
          diffbot_url += `&maxToProcessPerSubdomain=${options.maxToProcessPerSubdomain}`;

        if (options.notifyEmail)
          diffbot_url += `&notifyEmail=${encodeURIComponent(options.notifyEmail)}`;

        if (options.notifyWebhook)
          diffbot_url += `&notifyWebhook=${encodeURIComponent(options.notifyWebhook)}`;

        if (options.crawlDelay != undefined)
          diffbot_url += `&crawlDelay=${options.crawlDelay}`;

        if (options.repeat != undefined)
          diffbot_url += `&repeat=${options.repeat}`;

        if (options.seedRecrawlFrequency != undefined)
          diffbot_url += `&seedRecrawlFrequency=${options.seedRecrawlFrequency}`;

        if (options.onlyProcessIfNew != undefined)
          diffbot_url += `&onlyProcessIfNew=${+options.onlyProcessIfNew}`;

        if (options.maxRounds != undefined)
          diffbot_url += `&maxRounds=${options.maxRounds}`;

        let req = request.generate(diffbot_url, 'POST');
        let ret = this.test ? req : request.exec(req);

        return ret;
      },
      /**
       * Download a Crawlbot crawl job's results
       * @param {object} options The options
       * @param {string} options.name Name of the crawl whose data you wish to download.
       * @param {string} [options.format] Request format=csv to download the extracted data in CSV format (default: json). Note that CSV files will only contain top-level fields.
       * @param {string} [options.type] Request type=urls to retrieve the crawl URL Report (CSV).
       * @param {number} [options.num] Pass an integer value (e.g. num=100) to request a subset of URLs, most recently crawled first.
       * @returns The crawl job's results
       */
      get: function(options) {
        // TODO: Do I police the optional fields or leave the user to get a 400 error?
        if (!options.name)
          throw new Error('missing name');
        else if (options.format && !['csv','json'].includes(options.format))
          throw new Error('invalid format');
        else if (options.type && options.type != 'urls')
          throw new Error('invalid type');

        let diffbot_url = `https://api.diffbot.com/v3/crawl/data?token=${this.token}`
          + `&name=${encodeURIComponent(options.name)}`;

        if (options.format)
          diffbot_url += `&format=${encodeURIComponent(options.format)}`;

        if (options.type)
          diffbot_url += `&type=${encodeURIComponent(options.type)}`;

        if (options.num)
          diffbot_url += `&num=${options.num}`;

        let req = request.generate(diffbot_url);
        let ret = this.test ? req : request.exec(req);

        return ret;
      },
      /**
       * Pause a Crawlbot crawl job
       * @param {string} name Job name as defined when the crawl was created.
       * @returns The operation results
       */
      pause: function(options) {
        // TODO: Do I police the optional fields or leave the user to get a 400 error?
        if (!options.name)
          throw new Error('missing name');

        let diffbot_url = `https://api.diffbot.com/v3/crawl?token=${this.token}`
          + `&name=${encodeURIComponent(options.name)}`
          + '&pause=1';

        let req = request.generate(diffbot_url, 'POST');
        let ret = this.test ? req : request.exec(req);

        return ret;
      },
      /**
       * Resume a paused Crawlbot crawl job
       * @param {string} name Job name as defined when the crawl was created.
       * @returns The operation results
       */
      resume: function(options) {
        // TODO: Do I police the optional fields or leave the user to get a 400 error?
        if (!options.name)
          throw new Error('missing name');

        let diffbot_url = `https://api.diffbot.com/v3/crawl?token=${this.token}`
          + `&name=${encodeURIComponent(options.name)}`
          + '&pause=0';

        let req = request.generate(diffbot_url, 'POST');
        let ret = this.test ? req : request.exec(req);

        return ret;
      },
      /**
       * Restart a Crawlbot crawl job. Removes all crawled data while maintaining crawl settings.
       * @param {string} name Job name as defined when the crawl was created.
       * @returns The operation results
       */
      restart: function(options) {
        // TODO: Do I police the optional fields or leave the user to get a 400 error?
        if (!options.name)
          throw new Error('missing name');

        let diffbot_url = `https://api.diffbot.com/v3/crawl?token=${this.token}`
          + `&name=${encodeURIComponent(options.name)}`
          + '&restart=1';

        let req = request.generate(diffbot_url, 'POST');
        let ret = this.test ? req : request.exec(req);

        return ret;
      },
      /**
       * Delete a Crawlbot crawl job and its data
       * @param {string} name Job name as defined when the crawl was created.
       * @returns The operation results
       */
      delete: function(options) {
        // TODO: Do I police the optional fields or leave the user to get a 400 error?
        if (!options.name)
          throw new Error('missing name');

        let diffbot_url = `https://api.diffbot.com/v3/crawl?token=${this.token}`
          + `&name=${encodeURIComponent(options.name)}`
          + '&delete=1';

        let req = request.generate(diffbot_url, 'POST');
        let ret = this.test ? req : request.exec(req);

        return ret;
      },
      /**
       * Get Crawlbot job details
       * @param {object} options The options
       * @param {string} [options.name] Name of crawl to retrieve.
       * @returns {object} This will return a JSON response of your token's crawls (and Bulk API) jobs in the jobs object. If you have specified a single job name, only one job's details will be returned.
       */
      details: function(options) {

        let diffbot_url = `https://api.diffbot.com/v3/crawl?token=${this.token}`;

        if (options.name)
          diffbot_url += `&name=${encodeURIComponent(options.name)}`;

        let req = request.generate(diffbot_url);
        let ret = this.test ? req : request.exec(req);

        return ret;
      },
    };
  }

  /**
   * Search a Crawlbot crawl job's results
   * @param {object} options The options
   * @param {string} options.name Name of the crawl whose data you wish to download.
   * @param {string} options.query Search query. Must be URL-encoded. Please see query operators: https://www.diffbot.com/dev/docs/search/#query
   * @param {number|string} [options.num] Number of results to return. Default is 20. To return all results in the search, pass num=all.
   * @param {number} [options.start] Ordinal position of first result to return. (First position is 0.) Default is 0.
   * @returns The search results
   */
  search(options) {
    // TODO: Do I police the optional fields or leave the user to get a 400 error?
    if (!options.name)
      throw new Error('missing name');
    else if (!options.query)
      throw new Error('missing query');

    let diffbot_url = `https://api.diffbot.com/v3/search?token=${this.token}`
      + `&col=${encodeURIComponent(options.name)}`
      + `&query=${encodeURIComponent(options.query)}`;

    if (options.num != undefined)
      diffbot_url += `&num=${options.num}`;

    if (options.start != undefined)
      diffbot_url += `&start=${options.start}`;

    let req = request.generate(diffbot_url);
    let ret = this.test ? req : request.exec(req);

    return ret;
  }

  /**
   * Execute an account API call
   * @param {object} options The account options
   * @param {number} [options.days] Pass the number of days (&days=365) for which you would like to retrieve API call volumes (default = 31).
   * @param {boolean} [options.invoices] Pass &invoices=true to return invoice and payment history.
   * @returns {object} The account query results
   */
  account(options) {

    let diffbot_url = `https://api.diffbot.com/v4/account?token=${this.token}`;

    if (options.days)
      diffbot_url += `&days=${options.days}`;

    if (options.invoices != undefined)
      diffbot_url += `&invoices=${options.invoices}`;

    let req = request.generate(diffbot_url);
    let ret = this.test ? req : request.exec(req);

    return ret;
  }
}

module.exports = Diffbot;
