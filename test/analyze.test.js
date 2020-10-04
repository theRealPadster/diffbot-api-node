require('dotenv').config();
const Diffbot = require('../src/diffbot.js');
const diffbot = new Diffbot(process.env.DIFFBOT_API_TOKEN);
const expect = require('chai').expect;

describe('Analyze Tests', function() {

  this.timeout(15 * 1000);

  it('should parse the analyzed article', async () => {

    let article = await diffbot.analyze({
      url: 'https://www.theverge.com/2020/8/25/21400240/epic-apple-ruling-unreal-engine-fortnite-temporary-restraining-order',
    });

    expect(article.objects).to.be.an('array');
    expect(article.objects.length).to.be.greaterThan(0);
    expect(article.objects[0].humanLanguage).to.equal('en');
    expect(article.objects[0].author).to.equal('Russell Brandom');
    expect(article.objects[0].siteName).to.equal('The Verge');

    return Promise.resolve(true);
  });
});
