const { diffbot, expect } = require('./global');

describe('Analyze Tests', function() {

  it('should generate the analyze GET request', async () => {
    const url = 'https://www.theverge.com/2020/8/25/21400240/epic-apple-ruling-unreal-engine-fortnite-temporary-restraining-order';
    const mode = 'article';
    const fallback = 'article';
    const fields = ['querystring','links'];
    const discussion = false;
    const timeout = 60000;
    const callback = 'callbackFn';

    let request = await diffbot.analyze({ url, mode, fallback, fields, discussion, timeout, callback });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/analyze?token=${process.env.DIFFBOT_API_TOKEN}&url=${encodeURIComponent(url)}&mode=${mode}&fallback=${fallback}&fields=${fields.join(',')}&discussion=${discussion}&timeout=${timeout}&callback=${callback}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object').that.is.empty;

    return Promise.resolve(true);
  });
});
