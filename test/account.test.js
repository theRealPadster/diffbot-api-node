const { diffbot, expect } = require('./global');

describe('Account Tests', function() {

  it('should generate the account GET request', async () => {
    const days = 60;
    const invoices = true;

    let request = await diffbot.account({ days, invoices });

    expect(request.url).to.equal(`https://api.diffbot.com/v4/account?token=${diffbot.token}&days=${days}&invoices=${invoices}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object').that.is.empty;

    return Promise.resolve(true);
  });
});
