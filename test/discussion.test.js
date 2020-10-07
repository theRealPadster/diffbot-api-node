const { diffbot, expect } = require('./global');

describe('Discussion Tests', function() {

  it('should generate the discussion GET request', async () => {
    const url = 'https://www.theverge.com/2020/8/25/21400240/epic-apple-ruling-unreal-engine-fortnite-temporary-restraining-order';

    let request = await diffbot.discussion({ url });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/discussion?token=${process.env.DIFFBOT_API_TOKEN}&url=${encodeURIComponent(url)}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object').that.is.empty;

    return Promise.resolve(true);
  });

  it('should generate the discussion POST request', async () => {
    const url = 'https://www.theverge.com/2020/8/25/21400240/epic-apple-ruling-unreal-engine-fortnite-temporary-restraining-order';
    const body = '<html><body><h1>Article title</h1><div><h2>Person 1</h2><p>Blah blah</p></div><div><h2>Person 2</h2><p>Hah hah</p></div></body></html>';

    let request = await diffbot.discussion({ url, body });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/discussion?token=${process.env.DIFFBOT_API_TOKEN}&url=${encodeURIComponent(url)}`);
    expect(request.method).to.equal('POST');
    expect(request.body).to.equal(body);
    expect(request.headers).to.be.an('object');
    expect(request.headers['Content-Type']).to.equal('text/html');

    return Promise.resolve(true);
  });
});
