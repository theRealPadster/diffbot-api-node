const { diffbot, expect } = require('./global');

describe('Image Tests', function() {

  it('should generate the image POST request', async () => {
    const url = 'https://www.google.com/';
    const body = '<html><body><h2>This is the Google logo</h2><div><img src="images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"></div></body></html>';

    const request = await diffbot.image({ url, body });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/image?token=${process.env.DIFFBOT_API_TOKEN}&url=${encodeURIComponent(url)}`);
    expect(request.method).to.equal('POST');
    expect(request.body).to.equal(body);
    expect(request.headers).to.be.an('object');
    expect(request.headers['Content-Type']).to.equal('text/html');

    return Promise.resolve(true);
  });
});
