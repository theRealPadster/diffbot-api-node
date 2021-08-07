const { diffbot, expect } = require('./global');

describe('Analyze Tests', function() {

  it('should generate the analyze GET request', async () => {
    const url = 'https://www.theverge.com/2020/8/25/21400240/epic-apple-ruling-unreal-engine-fortnite-temporary-restraining-order';
    const mode = 'article';
    const fallback = 'article';
    const fields = ['querystring','links'];
    const paging = false;
    const discussion = false;
    const timeout = 60000;
    const callback = 'callbackFn';
    const proxy = '168.212.226.204';
    const proxyAuth = 'username:password';

    let request = await diffbot.analyze({ url, mode, fallback, fields, paging, discussion, timeout, callback, proxy, proxyAuth });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/analyze?token=${diffbot.token}&url=${encodeURIComponent(url)}&mode=${mode}&fallback=${fallback}&fields=${fields.join(',')}&paging=${paging}&discussion=${discussion}&timeout=${timeout}&callback=${callback}&proxy=${proxy}&proxyAuth=${proxyAuth}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object').that.is.empty;

    return Promise.resolve(true);
  });

  it('should generate the analyze GET request with custom JS', async () => {
    const url = 'https://www.theverge.com/2020/8/25/21400240/epic-apple-ruling-unreal-engine-fortnite-temporary-restraining-order';
    function start(){};
    function end(){};
    const customJS = function() {
      start();
      setTimeout(function() {
        var loadMoreNode = document.querySelector('a.loadMore');
        if (loadMoreNode != null) {
          loadMoreNode.click();
          setTimeout(function() {
            end();
          }, 800);
        } else {
          end();
        }
      }, 500);
    }.toString();

    let request = await diffbot.analyze({ url, customJS });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/analyze?token=${diffbot.token}&url=${encodeURIComponent(url)}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object');
    expect(request.headers['X-Forward-X-Evaluate']).to.equal(customJS.replace(/(\r?\n|\r)\s+/g, ''));

    return Promise.resolve(true);
  });

  it('should error on no url', async () => {
    expect(() => {
      return diffbot.analyze({});
    }).to.throw('missing url');

    return Promise.resolve(true);
  });
});
