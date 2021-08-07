const { diffbot, expect, customJS } = require('./global');

describe('Event Tests', function() {

  const url = 'https://www.eventbrite.ca/e/relit-2020-bring-your-brave-tickets-109259768910';

  it('should generate the event GET request', async () => {
    const fields = ['querystring','links'];
    const timeout = 60000;
    const callback = 'callbackFn';
    const proxy = '168.212.226.204';
    const proxyAuth = 'username:password';

    let request = await diffbot.event({ url, fields, timeout, callback, proxy, proxyAuth });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/event?token=${diffbot.token}&url=${encodeURIComponent(url)}&fields=${fields.join(',')}&timeout=${timeout}&callback=${callback}&proxy=${proxy}&proxyAuth=${proxyAuth}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object').that.is.empty;

    return Promise.resolve(true);
  });

  it('should generate the event GET request with custom JS', async () => {
    let request = await diffbot.event({ url, customJS });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/event?token=${diffbot.token}&url=${encodeURIComponent(url)}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object');
    expect(request.headers['X-Forward-X-Evaluate']).to.equal(customJS.replace(/(\r?\n|\r)\s+/g, ''));

    return Promise.resolve(true);
  });

  it('should generate the event POST request', async () => {
    const body = '<html><body><h2>Event title</h2><p>Event details etc...</p></body></html>';

    const request = await diffbot.event({ url, body });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/event?token=${diffbot.token}&url=${encodeURIComponent(url)}`);
    expect(request.method).to.equal('POST');
    expect(request.body).to.equal(body);
    expect(request.headers).to.be.an('object');
    expect(request.headers['Content-Type']).to.equal('text/html');

    return Promise.resolve(true);
  });


  it('should error on no url', async () => {
    expect(() => {
      return diffbot.event({});
    }).to.throw('missing url');

    return Promise.resolve(true);
  });
});
