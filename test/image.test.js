require('dotenv').config();
const Diffbot = require('../src/diffbot.js');
const diffbot = new Diffbot(process.env.DIFFBOT_API_TOKEN);
const expect = require('chai').expect;

describe('Image Tests', function() {

  this.timeout(15 * 1000);

  it('should find the posted image', async () => {

    const image = await diffbot.image({
      url: 'https://www.google.com/',
      body: '<html><body><h2>This is the Google logo</h2><div><img src="images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"></div></body></html>'
    });

    expect(image.objects).to.be.an('array');
    expect(image.objects.length).to.be.greaterThan(0);
    expect(image.objects[0].url).to.equal('https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png');

    return Promise.resolve(true);
  });
});
