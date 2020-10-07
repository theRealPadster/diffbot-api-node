const { diffbot, expect } = require('./global');

describe('Video Tests', function() {

  it('should generate the video GET request', async () => {
    const url = 'https://www.youtube.com/watch?v=HeiPdaTQTfo';

    const request = await diffbot.video({ url });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/video?token=${process.env.DIFFBOT_API_TOKEN}&url=${encodeURIComponent(url)}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object').that.is.empty;

    return Promise.resolve(true);
  });

  it('should generate the video POST request', async () => {
    const url = 'https://www.youtube.com/watch?v=HeiPdaTQTfo';
    const body = '<html><body><video><source src="movie.mp4" type="video/mp4"></video></body></html>';

    const request = await diffbot.video({ url, body });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/video?token=${process.env.DIFFBOT_API_TOKEN}&url=${encodeURIComponent(url)}`);
    expect(request.method).to.equal('POST');
    expect(request.body).to.equal(body);
    expect(request.headers).to.be.an('object');
    expect(request.headers['Content-Type']).to.equal('text/html');

    return Promise.resolve(true);
  });
});
