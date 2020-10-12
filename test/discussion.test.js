const { diffbot, expect, FAKE_TOKEN } = require('./global');

describe('Discussion Tests', function() {

  it('should generate the discussion GET request', async () => {
    const url = 'https://www.theverge.com/2020/8/25/21400240/epic-apple-ruling-unreal-engine-fortnite-temporary-restraining-order';
    const fields = ['links','meta'];
    const timeout = 60000;
    const callback = 'callbackFn';
    const maxPages = 3;

    let request = await diffbot.discussion({ url, fields, timeout, callback, maxPages });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/discussion?token=${FAKE_TOKEN}&url=${encodeURIComponent(url)}&fields=${fields.join(',')}&timeout=${timeout}&callback=${callback}&maxPages=${maxPages}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object').that.is.empty;

    return Promise.resolve(true);
  });

  it('should generate the discussion POST request', async () => {
    const url = 'https://www.theverge.com/2020/8/25/21400240/epic-apple-ruling-unreal-engine-fortnite-temporary-restraining-order';
    const body = '<html><body><h1>Article title</h1><div><h2>Person 1</h2><p>Blah blah</p></div><div><h2>Person 2</h2><p>Hah hah</p></div></body></html>';

    let request = await diffbot.discussion({ url, body });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/discussion?token=${FAKE_TOKEN}&url=${encodeURIComponent(url)}`);
    expect(request.method).to.equal('POST');
    expect(request.body).to.equal(body);
    expect(request.headers).to.be.an('object');
    expect(request.headers['Content-Type']).to.equal('text/html');

    return Promise.resolve(true);
  });

  it('should error on no url', async () => {
    expect(() => {
      return diffbot.discussion({});
    }).to.throw('missing url');

    return Promise.resolve(true);
  });
});
