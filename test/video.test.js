const { diffbot, expect, customJS } = require('./global');

describe('Video Tests', function() {

  it('should generate the video GET request', async () => {
    const url = 'https://www.youtube.com/watch?v=HeiPdaTQTfo';
    const fields = ['links','meta'];
    const timeout = 60000;
    const callback = 'callbackFn';
    const proxy = '168.212.226.204';
    const proxyAuth = 'username:password';

    const request = await diffbot.video({ url, fields, timeout, callback, proxy, proxyAuth });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/video?token=${diffbot.token}&url=${encodeURIComponent(url)}&fields=${fields.join(',')}&timeout=${timeout}&callback=${callback}&proxy=${proxy}&proxyAuth=${proxyAuth}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object').that.is.empty;

    return Promise.resolve(true);
  });

  it('should generate the video GET request with custom JS', async () => {
    const url = 'https://www.youtube.com/watch?v=HeiPdaTQTfo';

    let request = await diffbot.video({ url, customJS });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/video?token=${diffbot.token}&url=${encodeURIComponent(url)}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object');
    expect(request.headers['X-Forward-X-Evaluate']).to.equal(customJS.replace(/(\r?\n|\r)\s+/g, ''));

    return Promise.resolve(true);
  });

  it('should generate the video POST request', async () => {
    const url = 'https://www.youtube.com/watch?v=HeiPdaTQTfo';
    const body = '<html><body><video><source src="movie.mp4" type="video/mp4"></video></body></html>';

    const request = await diffbot.video({ url, body });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/video?token=${diffbot.token}&url=${encodeURIComponent(url)}`);
    expect(request.method).to.equal('POST');
    expect(request.body).to.equal(body);
    expect(request.headers).to.be.an('object');
    expect(request.headers['Content-Type']).to.equal('text/html');

    return Promise.resolve(true);
  });

  it('should error on no url', async () => {
    expect(() => {
      return diffbot.video({});
    }).to.throw('missing url');

    return Promise.resolve(true);
  });
});
