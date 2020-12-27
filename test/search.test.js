const { diffbot, expect } = require('./global');

describe('Search Tests', function() {

  const name = 'my-diffbot-crawl';
  const query = 'type:LocalBusiness location.{country.name:"Canada" city.name:"Ottawa" isCurrent:true}';

  it('should generate the search GET request', async () => {
    const num = 'all';
    const start = 1;

    let request = await diffbot.search({ name, query, num, start });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/search?token=${diffbot.token}&col=${encodeURIComponent(name)}&query=${encodeURIComponent(query)}&num=${num}&start=${start}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object').that.is.empty;

    return Promise.resolve(true);
  });

  it('should error on no name', async () => {
    expect(() => {
      return diffbot.search({ query });
    }).to.throw('missing name');

    return Promise.resolve(true);
  });

  it('should error on no query', async () => {
    expect(() => {
      return diffbot.search({ name });
    }).to.throw('missing query');

    return Promise.resolve(true);
  });
});
