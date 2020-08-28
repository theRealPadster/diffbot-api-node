# diffbot-api-node

[![npm (scoped)](https://img.shields.io/npm/v/diffbot-api-node.svg)](https://www.npmjs.com/package/diffbot-api-node)
![npm bundle size](https://img.shields.io/bundlephobia/min/diffbot-api-node?label=minified%20size)

Diffbot-API-Node is a Promise-based library to use the [Diffbot](https://www.diffbot.com/) REST APIs.

## Features

Currently supports the following features:
* Analyze (no POST support yet)
* Product (no POST support yet)
* Article (no POST support yet)
* Knowledge Graph
* Crawl
  * New (with `name`, `seeds`, and `apiUrl` params)
  * Get (retrieve crawl job results)
  * Details (retrieve crawl job details)

## Install

    npm install diffbot-api-node

## Usage

```javascript
const Diffbot = require('diffbot-api-node')
const diffbot = new Diffbot('your-api-key-goes-here');
```

### Analyze API
```javascript
  let analyze = await diffbot.analyze({
    url: 'https://four-all-ice-creame.myshopify.com/collections/ice-cream-cubes-individual/products/ice-cream-cubes-individual',
    discussion: false,
  });
  console.log(analyze.humanLanguage);
  console.log(analyze.title);
  console.log(analyze.type);
  console.log(analyze.objects);
```

### Product API
```javascript
  let product = await diffbot.product({
    url: 'https://www.amazon.com/Resistance-Avalon-Social-Deduction-Game/dp/B009SAAV0C',
    discussion: false,
  });
  console.log(product.objects);
```

### Article API
```javascript
  let article = await diffbot.article({
    url: 'https://www.theverge.com/2020/8/25/21400240/epic-apple-ruling-unreal-engine-fortnite-temporary-restraining-order',
  });
  console.log(article.objects[0].authors);
  console.log(article.objects[0].publisherRegion);
  console.log(article.objects[0].sentiment);
  console.log(article.objects[0].tags);
```

### Knowledge Graph API
```javascript
  // Knowledge Graph
  let kg = await diffbot.knowledgeGraph({
    query: 'type:LocalBusiness location.{country.name:"Canada" city.name:"Ottawa" isCurrent:true}'
  });
  console.log(kg.hits);
  console.log(kg.data);
```


### Crawl API
```javascript
  // Crawl (new)
  let crawl = await diffbot.crawl().new({
    name: 'my-diffbot-crawl',
    seeds: [
      'https://www.cruisebar.com.au/',
      'https://www.sydneyharbourdinnercruises.com.au/',
    ],
  });
  console.log(crawl.response);
  console.log(crawl.jobs);

  // Crawl (get)
  let crawlData = await diffbot.crawl().get({
    name: 'my-diffbot-crawl',
  });
  console.log(crawlData);

  // Crawl (details)
  let crawlDetails = await diffbot.crawl().details({
    name: 'my-diffbot-crawl',
  });
  console.log(crawlDetails.jobs);
```

## Testing

You must make a `.env` file with your diffbot API token in order to run the test suite.

e.g. `echo "DIFFBOT_API_TOKEN=YOURTOKENGOESHERE" > .env`

Then just run `mocha`.
