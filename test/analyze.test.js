const { diffbot, expect } = require('./global');

describe('Analyze Tests', function() {

  it('should generate the analyze GET request', async () => {
    const url = 'https://www.theverge.com/2020/8/25/21400240/epic-apple-ruling-unreal-engine-fortnite-temporary-restraining-order';

    let request = await diffbot.analyze({ url });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/analyze?token=${process.env.DIFFBOT_API_TOKEN}&url=${encodeURIComponent(url)}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object').that.is.empty;

    return Promise.resolve(true);
  });
});
