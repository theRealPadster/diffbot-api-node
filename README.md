# diffbot-api-node

[![npm (scoped)](https://img.shields.io/npm/v/diffbot-api-node.svg)](https://www.npmjs.com/package/diffbot-api-node)
![npm bundle size](https://img.shields.io/bundlephobia/min/diffbot-api-node?label=minified%20size)

Diffbot-API-Node is a Promise-based library to use the [Diffbot](https://www.diffbot.com/) REST APIs.

## Features

Currently supports the following features:
* Analyze (with HTML POST support)
* Article (with HTML POST support)
* Discussion (with HTML POST support)
* Image (with HTML POST support)
* Product (with HTML POST support)
* Knowledge Graph
* Crawl
  * New (supported params: `name`, `seeds`, `apiUrl`, `useCanonical`, `maxHops`, `maxToCrawl`, `maxToProcess`, `notifyWebhook`)
  * Get (retrieve crawl job results)
  * Details (retrieve crawl job details)
  * Pause
  * Resume
  * Restart
  * Delete
* Search

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
    body: 'optional-html-post-body-goes-here',
  });
  console.log(analyze.humanLanguage);
  console.log(analyze.title);
  console.log(analyze.type);
  console.log(analyze.objects);
```

### Article API
```javascript
  let article = await diffbot.article({
    url: 'https://www.theverge.com/2020/8/25/21400240/epic-apple-ruling-unreal-engine-fortnite-temporary-restraining-order',
    body: 'optional-html-post-body-goes-here',
  });
  console.log(article.objects[0].authors);
  console.log(article.objects[0].publisherRegion);
  console.log(article.objects[0].sentiment);
  console.log(article.objects[0].tags);
```

### Discussion API
```javascript
  let discussion = await diffbot.discussion({
    url: 'https://www.theverge.com/2020/8/25/21400240/epic-apple-ruling-unreal-engine-fortnite-temporary-restraining-order',
    body: 'optional-html-post-body-goes-here',
  });
  console.log(discussion.objects[0].title);
  console.log(discussion.objects[0].posts);
  console.log(discussion.objects[0].participants);
  console.log(discussion.objects[0].sentiment);
```

### Image API
```javascript
  let image = await diffbot.image({
    url: 'https://www.deviantart.com/up-tchi/art/Coral-village-852927725',
    body: 'optional-html-post-body-goes-here',
  });
  console.log(image.objects[0].title);
  console.log(image.objects[0].url);
  console.log(image.objects[0].naturalHeight);
```

### Product API
```javascript
  let product = await diffbot.product({
    url: 'https://www.amazon.com/Resistance-Avalon-Social-Deduction-Game/dp/B009SAAV0C',
    body: 'optional-html-post-body-goes-here',
    discussion: false,
  });
  console.log(product.objects);
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

  // Crawl (pause)
  let crawlPause = await diffbot.crawl().pause({
    name: 'my-diffbot-crawl',
  });
  console.log(crawlPause);

  // Crawl (resume)
  let crawlResume = await diffbot.crawl().resume({
    name: 'my-diffbot-crawl',
  });
  console.log(crawlResume);

  // Crawl (restart)
  let crawlRestart = await diffbot.crawl().restart({
    name: 'my-diffbot-crawl',
  });
  console.log(crawlRestart);

  // Crawl (delete)
  let crawlDeletion = await diffbot.crawl().delete({
    name: 'my-diffbot-crawl',
  });
  console.log(crawlDeletion);
```

### Search API
```javascript
  let search = await diffbot.search({
    name: 'my-diffbot-crawl',
    query: 'type:product',
  });
  console.log(article.objects[0].title);
  console.log(article.objects[0].pageUrl);
```

## Testing

You must make a `.env` file with your diffbot API token in order to run the test suite.

e.g. `echo "DIFFBOT_API_TOKEN=YOURTOKENGOESHERE" > .env`

Then just run `mocha`.
