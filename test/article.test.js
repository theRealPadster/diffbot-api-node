const { diffbot, expect } = require('./global');

describe('Article Tests', function() {

  it('should generate the article GET request', async () => {
    const url = 'https://www.theverge.com/2020/8/25/21400240/epic-apple-ruling-unreal-engine-fortnite-temporary-restraining-order';

    let request = await diffbot.article({ url });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/article?token=${process.env.DIFFBOT_API_TOKEN}&url=${encodeURIComponent(url)}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object').that.is.empty;

    return Promise.resolve(true);
  });

  it('should generate the article POST request', async () => {
    const body = 'Now is the time for all good robots to come to the aid of their-- oh never mind, run!';

    let request = await diffbot.article({ body });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/article?token=${process.env.DIFFBOT_API_TOKEN}`);
    expect(request.method).to.equal('POST');
    expect(request.body).to.equal(body);
    expect(request.headers).to.be.an('object');
    expect(request.headers['Content-Type']).to.equal('text/plain');

    return Promise.resolve(true);
  });
});
