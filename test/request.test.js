const { expect } = require('./global');
const request = require('../src/lib/request');

describe('Request Wrapper Tests', function() {

  const url = 'https://example.com';

  it('should generate the HTML POST request', async () => {
    const method = 'POST';
    const body = '<html><body><p>Test</p></body></html>';

    const req = request.generate(url, method, body);

    expect(req.url).to.equal(url);
    expect(req.method).to.equal(method);
    expect(req.body).to.equal(body);
    expect(req.headers).to.be.an('object');
    expect(req.headers['Content-Type']).to.equal('text/html');

    return Promise.resolve(true);
  });

  it('should generate the plaintext POST request', async () => {
    const method = 'POST';
    const body = 'This is a test';

    const req = request.generate(url, method, body);

    expect(req.url).to.equal(url);
    expect(req.method).to.equal(method);
    expect(req.body).to.equal(body);
    expect(req.headers).to.be.an('object');
    expect(req.headers['Content-Type']).to.equal('text/plain');

    return Promise.resolve(true);
  });

  it('should generate the GET request', async () => {
    const req = request.generate(url);

    expect(req.url).to.equal(url);
    expect(req.method).to.equal('GET');
    expect(req.body).to.be.undefined;
    expect(req.headers).to.be.an('object').that.is.empty;

    return Promise.resolve(true);
  });

  // TODO: add one for a POST?
  it('should make the GET request', async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';

    const req = request.generate(url);
    expect(req.url).to.equal(url);
    expect(req.method).to.equal('GET');
    expect(req.body).to.be.undefined;
    expect(req.headers).to.be.an('object').that.is.empty;

    const res = await request.exec(req);
    expect(res).to.be.an('object');
    expect(res.id).to.equal(1);

    return Promise.resolve(true);
  });

  it('should error on non-200 status', async () => {
    const url = 'http://example.com/404';

    const req = request.generate(url);
    expect(req.url).to.equal(url);
    expect(req.method).to.equal('GET');
    expect(req.body).to.be.undefined;
    expect(req.headers).to.be.an('object').that.is.empty;

    expect(request.exec(req)).to.eventually.be.rejectedWith('Request failed with status code 404');

    return Promise.resolve(true);
  });
});
