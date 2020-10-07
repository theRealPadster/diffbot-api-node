const { diffbot, expect } = require('./global');

describe('Product Tests', function() {

  const url = 'https://four-all-ice-creame.myshopify.com/collections/ice-cream-cubes-individual/products/ice-cream-cubes-individual';

  it('should generate the product GET request', async () => {
    const fields = ['links','meta'];
    const discussion = false;
    const timeout = 60000;
    const callback = 'callbackFn';
    const request = await diffbot.product({ url, fields, discussion, timeout, callback });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/product?token=${process.env.DIFFBOT_API_TOKEN}&url=${encodeURIComponent(url)}&fields=${fields.join(',')}&discussion=${discussion}&timeout=${timeout}&callback=${callback}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object').that.is.empty;

    return Promise.resolve(true);
  });

  it('should generate the product GET request with the specified fields', async () => {
    const fields = ['links', 'meta'];

    const request = await diffbot.product({ url, fields });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/product?token=${process.env.DIFFBOT_API_TOKEN}&url=${encodeURIComponent(url)}&fields=${fields.join(',')}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object').that.is.empty;

    return Promise.resolve(true);
  });
});
