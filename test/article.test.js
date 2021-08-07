const { diffbot, expect, customJS } = require('./global');

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

    expect(request.url).to.equal(`https://api.diffbot.com/v3/article?token=${diffbot.token}&url=${encodeURIComponent(url)}&fields=${fields.join(',')}&paging=${paging}&maxTags=${maxTags}&tagConfidence=${tagConfidence}&discussion=${discussion}&timeout=${timeout}&callback=${callback}&proxy=${proxy}&proxyAuth=${proxyAuth}&naturalLanguage=${naturalLanguage.join(',')}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object').that.is.empty;

    return Promise.resolve(true);
  });

  it('should generate the article GET request with custom JS', async () => {
    const url = 'https://www.theverge.com/2020/8/25/21400240/epic-apple-ruling-unreal-engine-fortnite-temporary-restraining-order';

    let request = await diffbot.article({ url, customJS });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/article?token=${diffbot.token}&url=${encodeURIComponent(url)}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object');
    expect(request.headers['X-Forward-X-Evaluate']).to.equal(customJS.replace(/(\r?\n|\r)\s+/g, ''));

    return Promise.resolve(true);
  });

  it('should generate the article POST request', async () => {
    const body = 'Now is the time for all good robots to come to the aid of their-- oh never mind, run!';

    let request = await diffbot.article({ body });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/article?token=${diffbot.token}`);
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
