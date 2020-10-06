const { diffbot, expect } = require('./global');

describe('Article Tests', function() {

  this.timeout(20 * 1000);

  it('should parse the article', async () => {

    let article = await diffbot.article({
      url: 'https://www.theverge.com/2020/8/25/21400240/epic-apple-ruling-unreal-engine-fortnite-temporary-restraining-order',
    });

    expect(article.objects).to.be.an('array');
    expect(article.objects.length).to.be.greaterThan(0);
    expect(article.objects[0].humanLanguage).to.equal('en');
    expect(article.objects[0].author).to.equal('Russell Brandom');
    expect(article.objects[0].siteName).to.equal('The Verge');

    return Promise.resolve(true);
  });

  it('should parse the posted text', async () => {

    let article = await diffbot.article({
      body: 'Now is the time for all good robots to come to the aid of their-- oh never mind, run!',
    });

    expect(article.objects).to.be.an('array');
    expect(article.objects.length).to.be.greaterThan(0);
    expect(article.objects[0].humanLanguage).to.equal('en');

    return Promise.resolve(true);
  });
});
