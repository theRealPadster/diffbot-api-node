# diffbot-api-node

[![npm (scoped)](https://img.shields.io/npm/v/diffbot-api-node.svg)](https://www.npmjs.com/package/diffbot-api-node)
![npm bundle size](https://img.shields.io/bundlephobia/min/diffbot-api-node?label=minified%20size)

DiffBot-API-Node is a Promise-based library to use the [DiffBot](https://www.diffbot.com/) REST APIs.

## Features

Currently supports the following features:
* Analyze (no POST support yet)
* Product (no POST support yet)
* Crawl
  * New (with `name`, `seeds`, and `apiUrl` params)
  * Get (retrieve crawl job results)
  * Details (retrieve crawl job details)
* Knowledge Graph

## Install

    npm install diffbot-api-node

## Usage

```javascript
const DiffBot = require('diffbot-api-node')
const diffbot = new DiffBot('your-api-key-goes-here');

  // Analyze
  let a = await diffbot.analyze({
    url: 'https://four-all-ice-creame.myshopify.com/collections/ice-cream-cubes-individual/products/ice-cream-cubes-individual',
    discussion: false,
  });
  console.log(a.humanLanguage);
  console.log(a.title);
  console.log(a.type);
  console.log(a.objects);

  // Product
  let p = await diffbot.product({
    url: 'https://www.amazon.com/Qihua-Universe-Blanket-Blankets-Travelling/dp/B074J5CYTJ',
    discussion: false,
  });
  console.log(p.objects);

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

  // Knowledge Graph
  let kg = await diffbot.knowledgeGraph({
    query: 'type:LocalBusiness location.{country.name:"Canada" city.name:"Ottawa" isCurrent:true}'
  });
  console.log(kg.hits);
  console.log(kg.data);
```
