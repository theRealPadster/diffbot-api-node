# diffbot-api-node

DiffBot-API-Node is a Promise-based library to use the the [DiffBot](https://www.diffbot.com/) REST APIs.

## Features
Currently supports the following features:
* Product (no POST support yet)
* Crawl (Only new crawls, with name, seeds, and apiUrl params)
* Knowledge Graph


## Install

    npm install diffbot-api-node

## Example

```javascript
const DiffBot = require('diffbot')
const diffbot = new DiffBot('your-api-key-goes-here');

  // Product
  let p = await diffbot.product({
    url: 'https://www.amazon.com/Qihua-Universe-Blanket-Blankets-Travelling/dp/B074J5CYTJ',
    discussion: false,
  });
  console.log(p.objects);

  // Crawl (new)
  let crawl = await diffbot.crawl().new({
    name: 'my-new-crawl',
    seeds: [
      'https://www.cruisebar.com.au/',
      'https://www.sydneyharbourdinnercruises.com.au/',
    ],
  });
  console.log(crawl.response);
  console.log(crawl.jobs);

  // Knowledge Graph
  let kg = await diffbot.knowledgeGraph({
    query: 'type:LocalBusiness location.{country.name:"Canada" city.name:"Ottawa" isCurrent:true}'
  });
  console.kg(p.hits);
  console.kg(p.data);
```
