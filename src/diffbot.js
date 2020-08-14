const fetch = require('node-fetch');

class DiffBot {
  constructor(token) {
    if (!token) throw new Error('missing token');
    this.token = token;
  }

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

  knowledgeGraph(options) {
    let diffbot_url = `https://kg.diffbot.com/kg/dql_endpoint?token=${this.token}&query=${encodeURIComponent(options.query)}`;

    // process extras
    if (options.from) {
      diffbot_url += `&from=${options.from}`;
    }

    if (options.nonCanonicalFacts) {
      diffbot_url += `&nonCanonicalFacts=${options.nonCanonicalFacts}`;
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
