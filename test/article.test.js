const { diffbot, expect, FAKE_TOKEN } = require('./global');

describe('Article Tests', function() {

  it('should generate the article GET request', async () => {
    const url = 'https://www.theverge.com/2020/8/25/21400240/epic-apple-ruling-unreal-engine-fortnite-temporary-restraining-order';
    const fields = ['links','meta'];
    const paging = false;
    const maxTags = 5;
    const tagConfidence = 0.7;
    const discussion = false;
    const timeout = 60000;
    const callback = 'callbackFn';
    const proxy = '168.212.226.204';
    const proxyAuth = 'username:password';
    const naturalLanguage = ['entities','facts'];

    let request = await diffbot.article({ url, fields, paging, maxTags, tagConfidence, discussion, timeout, callback, proxy, proxyAuth, naturalLanguage });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/article?token=${FAKE_TOKEN}&url=${encodeURIComponent(url)}&fields=${fields.join(',')}&paging=${paging}&maxTags=${maxTags}&tagConfidence=${tagConfidence}&discussion=${discussion}&timeout=${timeout}&callback=${callback}&proxy=${proxy}&proxyAuth=${proxyAuth}&naturalLanguage=${naturalLanguage.join(',')}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object').that.is.empty;

    return Promise.resolve(true);
  });

  it('should generate the article POST request', async () => {
    const body = 'Now is the time for all good robots to come to the aid of their-- oh never mind, run!';

    let request = await diffbot.article({ body });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/article?token=${FAKE_TOKEN}`);
    expect(request.method).to.equal('POST');
    expect(request.body).to.equal(body);
    expect(request.headers).to.be.an('object');
    expect(request.headers['Content-Type']).to.equal('text/plain');

    return Promise.resolve(true);
  });

  it('should error on no url', async () => {
    expect(() => {
      return diffbot.article({});
    }).to.throw('missing url');

    return Promise.resolve(true);
  });
});
