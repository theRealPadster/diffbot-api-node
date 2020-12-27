const { diffbot, expect, FAKE_TOKEN } = require('./global');

const name = 'testcrawl';
const seeds = ['https://example.com','https://google.com'];

describe('Crawl Tests', function() {

  describe('New Crawl', function() {

    const apiUrl = 'https://api.diffbot.com/v3/analyze?mode=auto';

    it('should generate the new crawl request', async () => {

      const urlCrawlPattern = '!product||sandwich';
      const urlCrawlRegEx = 'product';
      const urlProcessPattern = '!/category';
      const urlProcessRegEx = '/products';
      const pageProcessPattern = 'sandwich';
      const useCanonical = false;
      const obeyRobots = false;
      const restrictDomain = false;
      const useProxies = true;
      const maxHops = 0;
      const maxToCrawl = 1000;
      const maxToProcess = 100;
      const maxToCrawlPerSubdomain = 500;
      const maxToProcessPerSubdomain = 50;
      const notifyEmail = 'foo@bar.com';
      const notifyWebhook = 'https://foo.com/webhook';
      const crawlDelay = 0.25;
      const repeat = 7.0;
      const seedRecrawlFrequency = 2;
      const onlyProcessIfNew = false;
      const maxRounds = 10;

      const request = await diffbot.crawl().new({ name, seeds, apiUrl, urlCrawlPattern, urlCrawlRegEx, urlProcessPattern, urlProcessRegEx, pageProcessPattern, useCanonical, obeyRobots, restrictDomain, useProxies, maxHops, maxToCrawl, maxToProcess, maxToCrawlPerSubdomain, maxToProcessPerSubdomain, notifyEmail, notifyWebhook, crawlDelay, repeat, seedRecrawlFrequency, onlyProcessIfNew, maxRounds });

      expect(request.url).to.equal(`https://api.diffbot.com/v3/crawl?token=${FAKE_TOKEN}&name=${encodeURIComponent(name)}&seeds=${encodeURIComponent(seeds.join(' '))}&apiUrl=${encodeURIComponent(apiUrl)}&urlCrawlPattern=${encodeURIComponent(urlCrawlPattern)}&urlCrawlRegEx=${encodeURIComponent(urlCrawlRegEx)}&urlProcessPattern=${encodeURIComponent(urlProcessPattern)}&urlProcessRegEx=${encodeURIComponent(urlProcessRegEx)}&pageProcessPattern=${encodeURIComponent(pageProcessPattern)}&useCanonical=${+useCanonical}&obeyRobots=${+obeyRobots}&restrictDomain=${+restrictDomain}&useProxies=${+useProxies}&maxHops=${maxHops}&maxToCrawl=${maxToCrawl}&maxToProcess=${maxToProcess}&maxToCrawlPerSubdomain=${maxToCrawlPerSubdomain}&maxToProcessPerSubdomain=${maxToProcessPerSubdomain}&notifyEmail=${encodeURIComponent(notifyEmail)}&notifyWebhook=${encodeURIComponent(notifyWebhook)}&crawlDelay=${crawlDelay}&repeat=${repeat}&seedRecrawlFrequency=${seedRecrawlFrequency}&onlyProcessIfNew=${+onlyProcessIfNew}&maxRounds=${maxRounds}`);
      expect(request.method).to.equal('POST');
      expect(request.body).to.be.undefined;
      expect(request.headers).to.be.an('object').that.is.empty;

      return Promise.resolve(true);
    });

    it('should generate the new crawl request with default API URL', async () => {

      const request = await diffbot.crawl().new({ name, seeds });

      expect(request.url).to.equal(`https://api.diffbot.com/v3/crawl?token=${FAKE_TOKEN}&name=${encodeURIComponent(name)}&seeds=${encodeURIComponent(seeds.join(' '))}&apiUrl=${encodeURIComponent(apiUrl)}`);
      expect(request.method).to.equal('POST');
      expect(request.body).to.be.undefined;
      expect(request.headers).to.be.an('object').that.is.empty;

      return Promise.resolve(true);
    });

    it('should error on new crawl request with no name', async () => {

      expect(() => {
        return diffbot.crawl().new({ seeds });
      }).to.throw('missing name');

      return Promise.resolve(true);
    });

    it('should error on new crawl request with no seeds', async () => {

      expect(() => {
        return diffbot.crawl().new({ name });
      }).to.throw('missing seeds');

      return Promise.resolve(true);
    });
  });

  describe('Get Crawl', function() {

    const format = 'csv';

    it('should generate the get crawl request', async () => {
      const type = 'urls';
      const num = 100;

      const request = await diffbot.crawl().get({ name, format, type, num });

      expect(request.url).to.equal(`https://api.diffbot.com/v3/crawl/data?token=${FAKE_TOKEN}&name=${encodeURIComponent(name)}&format=${encodeURIComponent(format)}&type=${encodeURIComponent(type)}&num=${num}`);
      expect(request.method).to.equal('GET');
      expect(request.body).to.be.undefined;
      expect(request.headers).to.be.an('object').that.is.empty;

      return Promise.resolve(true);
    });

    it('should error on get crawl request with no name', async () => {

      expect(() => {
        return diffbot.crawl().get({});
      }).to.throw('missing name');

      return Promise.resolve(true);
    });

    it('should error on get crawl request with invalid format', async () => {

      expect(() => {
        return diffbot.crawl().get({ name, format: 'txt' });
      }).to.throw('invalid format');

      return Promise.resolve(true);
    });

    it('should error on get crawl request with invalid type', async () => {

      expect(() => {
        return diffbot.crawl().get({ name, format, type: 'pages' });
      }).to.throw('invalid type');

      return Promise.resolve(true);
    });
  });

  describe('Pause Crawl', function() {

    it('should generate the pause crawl request', async () => {

      const request = await diffbot.crawl().pause({ name });

      expect(request.url).to.equal(`https://api.diffbot.com/v3/crawl?token=${FAKE_TOKEN}&name=${encodeURIComponent(name)}&pause=1`);
      expect(request.method).to.equal('POST');
      expect(request.body).to.be.undefined;
      expect(request.headers).to.be.an('object').that.is.empty;

      return Promise.resolve(true);
    });

    it('should error on pause crawl request with no name', async () => {

      expect(() => {
        return diffbot.crawl().pause({});
      }).to.throw('missing name');

      return Promise.resolve(true);
    });
  });

  describe('Resume Crawl', function() {

    it('should generate the resume crawl request', async () => {

      const request = await diffbot.crawl().resume({ name });

      expect(request.url).to.equal(`https://api.diffbot.com/v3/crawl?token=${FAKE_TOKEN}&name=${encodeURIComponent(name)}&pause=0`);
      expect(request.method).to.equal('POST');
      expect(request.body).to.be.undefined;
      expect(request.headers).to.be.an('object').that.is.empty;

      return Promise.resolve(true);
    });

    it('should error on resume crawl request with no name', async () => {

      expect(() => {
        return diffbot.crawl().resume({});
      }).to.throw('missing name');

      return Promise.resolve(true);
    });
  });

  describe('Restart Crawl', function() {

    it('should generate the restart crawl request', async () => {

      const request = await diffbot.crawl().restart({ name });

      expect(request.url).to.equal(`https://api.diffbot.com/v3/crawl?token=${FAKE_TOKEN}&name=${encodeURIComponent(name)}&restart=1`);
      expect(request.method).to.equal('POST');
      expect(request.body).to.be.undefined;
      expect(request.headers).to.be.an('object').that.is.empty;

      return Promise.resolve(true);
    });

    it('should error on restart crawl request with no name', async () => {

      expect(() => {
        return diffbot.crawl().restart({});
      }).to.throw('missing name');

      return Promise.resolve(true);
    });
  });

  describe('Delete Crawl', function() {

    it('should generate the delete crawl request', async () => {

      const request = await diffbot.crawl().delete({ name });

      expect(request.url).to.equal(`https://api.diffbot.com/v3/crawl?token=${FAKE_TOKEN}&name=${encodeURIComponent(name)}&delete=1`);
      expect(request.method).to.equal('POST');
      expect(request.body).to.be.undefined;
      expect(request.headers).to.be.an('object').that.is.empty;

      return Promise.resolve(true);
    });

    it('should error on delete crawl request with no name', async () => {

      expect(() => {
        return diffbot.crawl().delete({});
      }).to.throw('missing name');

      return Promise.resolve(true);
    });
  });

  describe('Crawl Details', function() {

    it('should generate the crawl details request', async () => {

      const request = await diffbot.crawl().details({ name });

      expect(request.url).to.equal(`https://api.diffbot.com/v3/crawl?token=${FAKE_TOKEN}&name=${encodeURIComponent(name)}`);
      expect(request.method).to.equal('GET');
      expect(request.body).to.be.undefined;
      expect(request.headers).to.be.an('object').that.is.empty;

      return Promise.resolve(true);
    });
  });
});
