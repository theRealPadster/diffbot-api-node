const { diffbot, expect } = require('./global');

describe('Search Tests', function() {

  it('should generate the search GET request', async () => {
    const name = 'my-diffbot-crawl';
    const query = 'type:LocalBusiness location.{country.name:"Canada" city.name:"Ottawa" isCurrent:true}';

    let request = await diffbot.search({ name, query });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/search?token=${process.env.DIFFBOT_API_TOKEN}&col=${encodeURIComponent(name)}&query=${encodeURIComponent(query)}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object').that.is.empty;

    return Promise.resolve(true);
  });
});
