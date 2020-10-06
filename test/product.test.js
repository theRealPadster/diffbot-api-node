const { diffbot, expect } = require('./global');
const target_url = 'https://four-all-ice-creame.myshopify.com/collections/ice-cream-cubes-individual/products/ice-cream-cubes-individual';

describe('Product Tests', function() {

  this.timeout(20 * 1000);

  it('should return data', async () => {
    const product = await diffbot.product({
      url: target_url,
    });

    expect(product.objects).to.be.an('array');
    expect(product.objects.length).to.be.greaterThan(0);

    return Promise.resolve(true);
  });

  it('should return requested fields', async () => {
    const product = await diffbot.product({
      url: target_url,
      fields: ['links', 'meta'],
    });

    // TODO: is it correct to just skip these, since they are covered above?
    // Or does this test make the previous one redundant?
    // expect(product.objects).to.be.an('array');
    // expect(product.objects.length).to.be.greaterThan(0);
    expect(product.objects[0].links).to.be.an('array');
    expect(product.objects[0].meta).to.be.an('object');

    return Promise.resolve(true);
  });
});
