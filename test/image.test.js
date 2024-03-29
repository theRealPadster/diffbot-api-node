const { diffbot, expect, customJS, customHeaders } = require('./global');

describe('Image Tests', function() {

  it('should generate the image GET request', async () => {
    const url = 'https://www.deviantart.com/up-tchi/art/Coral-village-852927725';
    const fields = ['links','meta'];
    const timeout = 60000;
    const callback = 'callbackFn';
    const proxy = '168.212.226.204';
    const proxyAuth = 'username:password';

    const request = await diffbot.image({ url, fields, timeout, callback, proxy, proxyAuth });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/image?token=${diffbot.token}&url=${encodeURIComponent(url)}&fields=${fields.join(',')}&timeout=${timeout}&callback=${callback}&proxy=${proxy}&proxyAuth=${proxyAuth}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object').that.is.empty;

    return Promise.resolve(true);
  });

  it('should generate the image GET request with custom headers', async () => {
    const url = 'https://www.deviantart.com/up-tchi/art/Coral-village-852927725';

    let request = await diffbot.image({ url, customJS, customHeaders });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/image?token=${diffbot.token}&url=${encodeURIComponent(url)}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object');
    expect(request.headers['X-Forward-X-Evaluate']).to.equal(customJS.replace(/(\r?\n|\r)\s+/g, ''));
    expect(request.headers['X-Forward-User-Agent']).to.equal(customHeaders['User-Agent']);

    return Promise.resolve(true);
  });

  it('should generate the image POST request', async () => {
    const url = 'https://www.google.com/';
    const body = '<html><body><h2>This is the Google logo</h2><div><img src="images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"></div></body></html>';

    const request = await diffbot.image({ url, body });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/image?token=${diffbot.token}&url=${encodeURIComponent(url)}`);
    expect(request.method).to.equal('POST');
    expect(request.body).to.equal(body);
    expect(request.headers).to.be.an('object');
    expect(request.headers['Content-Type']).to.equal('text/html');

    return Promise.resolve(true);
  });

  it('should error on no url', async () => {
    expect(() => {
      return diffbot.image({});
    }).to.throw('missing url');

    return Promise.resolve(true);
  });
});
