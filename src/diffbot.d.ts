export = Diffbot;
declare class Diffbot {
    /**
     * Instantiate a Diffbot
     * @param {string} token The Diffbot API token to use
     * @param {boolean} [test] Enable test mode (only returns requests without executing)
     */
    constructor(token: string, test?: boolean);
    token: string;
    test: boolean;
    /**
     * Execute an analyze API call
     * @param {Object} options The analyze options
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
     * @returns {Object} The analyze query results
     */
    analyze(options: {
        url: string;
        mode?: string;
        fallback?: string;
        fields?: string[];
        paging?: boolean;
        discussion?: boolean;
        timeout?: number;
        callback?: string;
        proxy?: string;
        proxyAuth?: string;
        body?: string;
    }): any;
    /**
     * Execute an article API call
     * @param {Object} options The search options
     * @param {string} [options.url] Web page URL of the article to process (required unless posting plain text)
     * @param {string[]} [options.fields] Used to specify optional fields to be returned by the Article API.
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
     * @returns {Object} The article query results
     */
    article(options: {
        url?: string;
        fields?: string[];
        paging?: boolean;
        maxTags?: number;
        tagConfidence?: number;
        discussion?: boolean;
        timeout?: number;
        callback?: string;
        proxy?: string;
        proxyAuth?: string;
        naturalLanguage?: string[];
        body?: string;
    }): any;
    /**
     * Execute a discussion API call
     * @param {Object} options The call options
     * @param {string} options.url Web page URL of the discussion to process
     * @param {string[]} [options.fields] Used to specify optional fields to be returned by the Discussion API. See fields: https://www.diffbot.com/dev/docs/discussion/#fields
     * @param {number} [options.timeout] Sets a value in milliseconds to wait for the retrieval/fetch of content from the requested URL. The default timeout for the third-party response is 30 seconds (30000).
     * @param {string} [options.callback] Use for jsonp requests. Needed for cross-domain ajax.
     * @param {number|string} [options.maxPages] Set the maximum number of pages in a thread to automatically concatenate in a single response. Default = 1 (no concatenation). Set maxPages=all to retrieve all pages of a thread regardless of length. Each individual page will count as a separate API call.
     * @param {string} [options.proxy] Used to specify the IP address of a custom proxy that will be used to fetch the target page, instead of Diffbot's default IPs/proxies. (Ex: &proxy=168.212.226.204)
     * @param {string} [options.proxyAuth] Used to specify the authentication parameters that will be used with the proxy specified in the &proxy parameter. (Ex: &proxyAuth=username:password)
     * @param {string} [options.body] Optional HTML markup to pass as POST body
     * @returns {Object} The discussion query results
     */
    discussion(options: {
        url: string;
        fields?: string[];
        timeout?: number;
        callback?: string;
        maxPages?: number | string;
        proxy?: string;
        proxyAuth?: string;
        body?: string;
    }): any;
    /**
     * Execute an event API call
     * @param {Object} options The event options
     * @param {string} options.url Web page URL of the event to process
     * @param {string[]} [options.fields] Used to specify optional fields to be returned by the Event API. See fields: https://docs.diffbot.com/docs/en/api-event
     * @param {number} [options.timeout] Sets a value in milliseconds to wait for the retrieval/fetch of content from the requested URL. The default timeout for the third-party response is 30 seconds (30000).
     * @param {string} [options.callback] Use for jsonp requests. Needed for cross-domain ajax.
     * @param {string} [options.proxy] Used to specify the IP address of a custom proxy that will be used to fetch the target page, instead of Diffbot's default IPs/proxies. (Ex: &proxy=168.212.226.204)
     * @param {string} [options.proxyAuth] Used to specify the authentication parameters that will be used with the proxy specified in the &proxy parameter. (Ex: &proxyAuth=username:password)
     * @param {string} [options.body] Optional HTML markup to pass as POST body
     * @param {string} [options.customJS] This functionality is currently in beta. See docs for details: https://docs.diffbot.com/docs/en/api-event#custom-javascript
     * @returns {Object} The analyze query results
     */
    event(options: {
        url: string;
        fields?: string[];
        timeout?: number;
        callback?: string;
        proxy?: string;
        proxyAuth?: string;
        body?: string;
        customJS?: string;
    }): any;
    /**
     * Execute an image API call
     * @param {Object} options The call options
     * @param {string} options.url Web page URL of the image to process
     * @param {string[]} [options.fields] Used to specify optional fields to be returned by the Image API. See fields: https://www.diffbot.com/dev/docs/image/#fields
     * @param {number} [options.timeout] Sets a value in milliseconds to wait for the retrieval/fetch of content from the requested URL. The default timeout for the third-party response is 30 seconds (30000).
     * @param {string} [options.callback] Use for jsonp requests. Needed for cross-domain ajax.
     * @param {string} [options.proxy] Used to specify the IP address of a custom proxy that will be used to fetch the target page, instead of Diffbot's default IPs/proxies. (Ex: &proxy=168.212.226.204)
     * @param {string} [options.proxyAuth] Used to specify the authentication parameters that will be used with the proxy specified in the &proxy parameter. (Ex: &proxyAuth=username:password)
     * @param {string} [options.body] Optional HTML markup to pass as POST body
     * @returns {Object} The image query results
     */
    image(options: {
        url: string;
        fields?: string[];
        timeout?: number;
        callback?: string;
        proxy?: string;
        proxyAuth?: string;
        body?: string;
    }): any;
    /**
     * Execute a product API call
     * @param {Object} options The search options
     * @param {string} options.url Web page URL of the product to process
     * @param {string[]} [options.fields] Used to specify optional fields to be returned by the Product API.
     * @param {boolean} [options.discussion] Pass discussion=false to disable automatic extraction of product reviews.
     * @param {number} [options.timeout] Sets a value in milliseconds to wait for the retrieval/fetch of content from the requested URL. The default timeout for the third-party response is 30 seconds (30000).
     * @param {string} [options.callback] Use for jsonp requests. Needed for cross-domain ajax.
     * @param {string} [options.proxy] Used to specify the IP address of a custom proxy that will be used to fetch the target page, instead of Diffbot's default IPs/proxies. (Ex: &proxy=168.212.226.204)
     * @param {string} [options.proxyAuth] Used to specify the authentication parameters that will be used with the proxy specified in the &proxy parameter. (Ex: &proxyAuth=username:password)
     * @param {string} [options.body] Optional HTML markup to pass as POST body
     * @returns {Object} The product query results
     */
    product(options: {
        url: string;
        fields?: string[];
        discussion?: boolean;
        timeout?: number;
        callback?: string;
        proxy?: string;
        proxyAuth?: string;
        body?: string;
    }): any;
    /**
     * Execute a video API call
     * @param {Object} options The call options
     * @param {string} options.url Web page URL of the video to process
     * @param {string[]} [options.fields] Used to specify optional fields to be returned by the Video API. See fields: https://www.diffbot.com/dev/docs/video/#fields
     * @param {number} [options.timeout] Sets a value in milliseconds to wait for the retrieval/fetch of content from the requested URL. The default timeout for the third-party response is 30 seconds (30000).
     * @param {string} [options.callback] Use for jsonp requests. Needed for cross-domain ajax.
     * @param {string} [options.proxy] Used to specify the IP address of a custom proxy that will be used to fetch the target page, instead of Diffbot's default IPs/proxies. (Ex: &proxy=168.212.226.204)
     * @param {string} [options.proxyAuth] Used to specify the authentication parameters that will be used with the proxy specified in the &proxy parameter. (Ex: &proxyAuth=username:password)
     * @param {string} [options.body] Optional HTML markup to pass as POST body
     * @returns {Object} The video query results
     */
    video(options: {
        url: string;
        fields?: string[];
        timeout?: number;
        callback?: string;
        proxy?: string;
        proxyAuth?: string;
        body?: string;
    }): any;
    /**
     * Execute a query against the Knowledge Graph
     * @param {Object} options The search options
     * @param {string} options.query The DQL knowledge base query
     * @param {string} [options.type] Type of search: "query", "text", or "queryTextFallback"
     * @param {number} [options.size] Max number of results in page
     * @param {number} [options.from] Ordinal position of first result to return. (First position is 0.) Default is 0.
     * @param {string} [options.jsonmode] jsonmode=extended returns origin information for facts
     * @param {boolean} [options.nonCanonicalFacts] Return non-canonical facts. Default is no non-canonical facts.
     * @param {boolean} [options.noDedupArticles] Indicates that articles should not be deduplicated but all of them returned
     * @returns {Object} The query results
     */
    knowledgeGraph(options: {
        query: string;
        type?: string;
        size?: number;
        from?: number;
        jsonmode?: string;
        nonCanonicalFacts?: boolean;
        noDedupArticles?: boolean;
    }): any;
    crawl(): {
        token: string;
        test: boolean;
        /**
         * Generate a new Crawlbot crawl job
         * @param {Object} options The search options
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
         * @returns {Object} The response and crawl job objects
         */
        new: (options: {
            name: string;
            seeds: string[];
            apiUrl?: string;
            urlCrawlPattern?: string;
            urlCrawlRegEx?: string;
            urlProcessPattern?: string;
            urlProcessRegEx?: string;
            pageProcessPattern?: string;
            useCanonical?: boolean;
            obeyRobots?: boolean;
            restrictDomain?: boolean;
            useProxies?: boolean;
            maxHops?: number;
            maxToCrawl?: number;
            maxToProcess?: number;
            maxToCrawlPerSubdomain?: number;
            maxToProcessPerSubdomain?: number;
            notifyEmail?: string;
            notifyWebhook?: string;
            crawlDelay?: number;
            repeat?: number;
            seedRecrawlFrequency?: number;
            onlyProcessIfNew?: boolean;
            maxRounds?: number;
        }) => any;
        /**
         * Download a Crawlbot crawl job's results
         * @param {Object} options The options
         * @param {string} options.name Name of the crawl whose data you wish to download.
         * @param {format} [options.format] Request format=csv to download the extracted data in CSV format (default: json). Note that CSV files will only contain top-level fields.
         * @param {string} [options.type] Request type=urls to retrieve the crawl URL Report (CSV).
         * @param {number} [options.num] Pass an integer value (e.g. num=100) to request a subset of URLs, most recently crawled first.
         * @returns The crawl job's results
         */
        get: (options: {
            name: string;
            format?: any;
            type?: string;
            num?: number;
        }) => any;
        /**
         * Pause a Crawlbot crawl job
         * @param {string} name Job name as defined when the crawl was created.
         * @returns The operation results
         */
        pause: (options: any) => any;
        /**
         * Resume a paused Crawlbot crawl job
         * @param {string} name Job name as defined when the crawl was created.
         * @returns The operation results
         */
        resume: (options: any) => any;
        /**
         * Restart a Crawlbot crawl job. Removes all crawled data while maintaining crawl settings.
         * @param {string} name Job name as defined when the crawl was created.
         * @returns The operation results
         */
        restart: (options: any) => any;
        /**
         * Delete a Crawlbot crawl job and its data
         * @param {string} name Job name as defined when the crawl was created.
         * @returns The operation results
         */
        delete: (options: any) => any;
        /**
         * Get Crawlbot job details
         * @param {Object} options The options
         * @param {string} [options.name] Name of crawl to retrieve.
         * @returns {Object} This will return a JSON response of your token's crawls (and Bulk API) jobs in the jobs object. If you have specified a single job name, only one job's details will be returned.
         */
        details: (options: {
            name?: string;
        }) => any;
    };
    /**
     * Search a Crawlbot crawl job's results
     * @param {Object} options The options
     * @param {string} options.name Name of the crawl whose data you wish to download.
     * @param {string} options.query Search query. Must be URL-encoded. Please see query operators: https://www.diffbot.com/dev/docs/search/#query
     * @param {number|string} [options.num] Number of results to return. Default is 20. To return all results in the search, pass num=all.
     * @param {number} [options.start] Ordinal position of first result to return. (First position is 0.) Default is 0.
     * @returns The search results
     */
    search(options: {
        name: string;
        query: string;
        num?: number | string;
        start?: number;
    }): any;
    /**
     * Execute an account API call
     * @param {Object} options The account options
     * @param {number} [options.days] Pass the number of days (&days=365) for which you would like to retrieve API call volumes (default = 31).
     * @param {boolean} [options.invoices] Pass &invoices=true to return invoice and payment history.
     * @returns {Object} The account query results
     */
    account(options: {
        days?: number;
        invoices?: boolean;
    }): any;
}
