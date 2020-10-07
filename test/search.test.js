const { diffbot, expect } = require('./global');

describe('Search Tests', function() {

  it('should generate the search GET request', async () => {
    const name = 'my-diffbot-crawl';
    const query = 'type:LocalBusiness location.{country.name:"Canada" city.name:"Ottawa" isCurrent:true}';
    const num = 'all';
    const start = 1;

    let request = await diffbot.search({ name, query, num, start });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/search?token=${process.env.DIFFBOT_API_TOKEN}&col=${encodeURIComponent(name)}&query=${encodeURIComponent(query)}&num=${num}&start=${start}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object').that.is.empty;

    return Promise.resolve(true);
  });
});
